import EmptyModal from "./EmptyModal"
import { Dispatch, FormEvent, SetStateAction } from "react"
import CustomForm from "../data-entry/CustomForm"
import { Form } from "antd"
import Button from "../Button"
import ButtonsRow from "../ButtonsRow"
import useMessage from "../../hooks/useMessage"
import parseError from "../../helpers/error-handler"
import { useNavigate } from "react-router-dom"
import useSalaryAPI from "../../hooks/api/useSalaryAPI"

type Props = {
	modalOpen: boolean
	salaryEntryType: "main" | "secondary"
	selectedEntryToDeleteId: string | null
	setModalOpen: Dispatch<SetStateAction<boolean>>
	setSelectedEntryToDeleteId: Dispatch<SetStateAction<string | null>>
	title: string
}

const DeleteSalaryEntryModal = ({
	modalOpen,
	salaryEntryType,
	selectedEntryToDeleteId,
	setModalOpen,
	setSelectedEntryToDeleteId,
	title
}: Props) => {
	const [form] = Form.useForm()
	const { showMessage, contextHolder } = useMessage()
	const messageDuration = 10
	const navigate = useNavigate()
	const { deleteSalaryEntry } = useSalaryAPI()
	async function handleDelete(e: FormEvent<HTMLButtonElement>) {
		e.preventDefault()

		if (!selectedEntryToDeleteId) {
			return showMessage({
				type: "error",
				content: "Please select a salary entry to delete",
				duration: messageDuration
			})
		}

		try {
			await deleteSalaryEntry(selectedEntryToDeleteId, salaryEntryType)
		} catch (error) {
			const errorObj = parseError(error)
			if (errorObj === undefined) {
				return showMessage({
					type: "error",
					content:
						"Something went wrong while deleting the salary. Please try again later.",
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
					sessionStorage.removeItem("user")
				}, 5000)
			} else {
				return showMessage({
					type: "error",
					content: errorObj.content,
					duration: messageDuration
				})
			}
		} finally {
			setSelectedEntryToDeleteId(null)
			setModalOpen(false)
			form.resetFields()
		}
	}

	return (
		<EmptyModal modalOpen={modalOpen} setModalOpen={setModalOpen} title={title}>
			{contextHolder}
			<CustomForm form={form}>
				Confirm deletion of salary entry
				<br />
				<ButtonsRow>
					<Button
						addButton={true}
						type="submit"
						innerText="Delete"
						onClick={handleDelete}
					/>
					<Button
						cancelButton={true}
						innerText="Cancel"
						onClick={() => setModalOpen(false)}
						type="button"
					/>
				</ButtonsRow>
			</CustomForm>
		</EmptyModal>
	)
}

export default DeleteSalaryEntryModal
