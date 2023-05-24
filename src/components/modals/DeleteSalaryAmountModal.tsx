import EmptyModal from "./EmptyModal"
import { Dispatch, FormEvent, SetStateAction } from "react"
import CustomForm from "../data-entry/CustomForm"
import { Form } from "antd"
import Button from "../Button"
import ButtonsRow from "../ButtonsRow"
import useMessage from "../../hooks/useMessage"
import parseError from "../../helpers/error-handler"
import { useNavigate, useParams } from "react-router-dom"
import useSalaryAPI from "../../hooks/api/useSalaryAPI"
import { useQueryClient } from "@tanstack/react-query"

type Props = {
	modalOpen: boolean
	salaryAmount: number
	setSalaryAmount: Dispatch<SetStateAction<number>>
	setModalOpen: Dispatch<SetStateAction<boolean>>
	selectedSecondaryId: string | null
	setSelectedSecondaryId: Dispatch<SetStateAction<string | null>>
}

const DeleteSalaryAmountModal = ({
	modalOpen,
	salaryAmount,
	setSalaryAmount,
	setModalOpen,
	selectedSecondaryId,
	setSelectedSecondaryId
}: Props) => {
	const [form] = Form.useForm()
	const { showMessage, contextHolder } = useMessage()
	const messageDuration = 10
	const navigate = useNavigate()
	const { deleteSecondarySalaryAmount } = useSalaryAPI()
	const { id } = useParams()
	const queryClient = useQueryClient()

	async function handleDelete(e: FormEvent<HTMLButtonElement>) {
		e.preventDefault()

		if (!selectedSecondaryId) {
			return showMessage({
				type: "error",
				content: "Please select the salary entry whose contributed amount you want to delete",
				duration: messageDuration
			})
		}

		try {
			await deleteSecondarySalaryAmount(selectedSecondaryId, { salaryAmount })
			await queryClient.invalidateQueries(["salaries", "single", id])
		} catch (error) {
			const errorObj = parseError(error)
			if (errorObj === undefined) {
				return showMessage({
					type: "error",
					content: "Something went wrong while deleting the salary amount. Please try again later.",
					duration: messageDuration
				})
			} else if (errorObj.status === 401) {
				await showMessage({
					type: "error",
					content: "Invalid or expired token. Redirecting to login page...",
					duration: 5
				})
				setTimeout(() => {
					navigate("/login")
					localStorage.removeItem("user")
				}, 5000)
			} else {
				return showMessage({
					type: "error",
					content: errorObj.content,
					duration: messageDuration
				})
			}
		} finally {
			setSelectedSecondaryId(null)
			setSalaryAmount(0)
			setModalOpen(false)
			form.resetFields()
		}
	}

	return (
		<EmptyModal modalOpen={modalOpen} setModalOpen={setModalOpen} title="">
			{contextHolder}
			<CustomForm form={form}>
				<p style={{ fontSize: "1rem" }}>Confirm deletion of salary amount</p>
				<ButtonsRow>
					<Button
						cancelButton={true}
						innerText="Cancel"
						onClick={() => setModalOpen(false)}
						size="small"
						type="button"
					/>
					<Button innerText="Delete" onClick={handleDelete} size="small" type="submit" />
				</ButtonsRow>
			</CustomForm>
		</EmptyModal>
	)
}

export default DeleteSalaryAmountModal
