import EmptyModal from "./EmptyModal"
import CustomForm from "../data-entry/CustomForm"
import ButtonsRow from "../ButtonsRow"
import Button from "../Button"
import useMessage from "../../hooks/useMessage"
import { Dispatch, FormEvent, SetStateAction, useContext } from "react"
import { Form } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import useSalaryAPI from "../../hooks/api/useSalaryAPI"
import parseError from "../../helpers/error-handler"
import { getUserFromStorage } from "../../util/local-storage"
import useUserAPI from "../../hooks/api/useUserAPI"
import { UserContext } from "../../contexts/UserContext"

type Props = {
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	selectedSecondaryId: string | null
	setSelectedSecondaryId: Dispatch<SetStateAction<string | null>>
}

const DeleteSecondarySalaryModal = ({
	modalOpen,
	setModalOpen,
	selectedSecondaryId,
	setSelectedSecondaryId
}: Props) => {
	const { showMessage, contextHolder } = useMessage()
	const { deleteSecondarySalaryEntry } = useSalaryAPI()
	const [form] = Form.useForm()
	const { id } = useParams()
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const { getUser } = useUserAPI()
	const { setLoggedInUser } = useContext(UserContext)

	const user = getUserFromStorage()
	const userId = user?.userId
	const messageDuration = 10

	const { refetch } = useQuery(
		["user", user?.userId],
		() => {
			if (user?.userId) {
				return getUser(user?.userId)
			}
		},
		{ refetchOnWindowFocus: false, retry: 1 }
	)

	async function handleDelete(e: FormEvent<HTMLButtonElement>) {
		e.preventDefault()

		if (!userId) {
			return showMessage({
				type: "error",
				content: "A user ID is required to perform this action"
			})
		}

		if (!selectedSecondaryId) {
			return showMessage({
				type: "error",
				content: "Please select the salary entry whose contributed amount you want to delete",
				duration: messageDuration
			})
		}

		try {
			await deleteSecondarySalaryEntry(selectedSecondaryId, { userId })
			await queryClient.invalidateQueries(["salaries", "single", id])
			refetch({ throwOnError: true }).then(({ data }) => {
				if (data !== undefined) {
					setLoggedInUser({ ...data, token: user?.token })
				}
			})
			return showMessage({
				type: "success",
				content: "Salary entry deleted successfully",
				duration: messageDuration
			})
		} catch (error) {
			const errorObj = parseError(error)
			if (errorObj === undefined) {
				return showMessage({
					type: "error",
					content: "Something went wrong while deleting the salary entry. Please try again later.",
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
			setSelectedSecondaryId(null)
			setModalOpen(false)
			form.resetFields()
		}
	}

	return (
		<EmptyModal modalOpen={modalOpen} setModalOpen={setModalOpen} title="">
			{contextHolder}
			<CustomForm form={form}>
				<p style={{ fontSize: "1rem" }}>Confirm deletion of salary entry</p>
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

export default DeleteSecondarySalaryModal
