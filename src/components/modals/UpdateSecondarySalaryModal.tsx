import { useNavigate, useParams } from "react-router-dom"
import EmptyModal from "./EmptyModal"
import { Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState } from "react"
import FormItem from "../data-entry/FormItem"
import TextInput from "../data-entry/TextInput"
import NumberInput from "../data-entry/NumberInput"
import Button from "../Button"
import CustomForm from "../data-entry/CustomForm"
import { Form } from "antd"
import { SecondarySalary } from "../../@types/types"
import { getZodErrorMessages, validateUpdateSecondarySalaryInput } from "../../helpers/zod-helper"
import useMessage from "../../hooks/useMessage"
import useSalaryAPI from "../../hooks/api/useSalaryAPI"
import parseError from "../../helpers/error-handler"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import useUserAPI from "../../hooks/api/useUserAPI"
import { UserContext } from "../../contexts/UserContext"
import { getUserFromStorage } from "../../util/local-storage"

type Props = {
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	selectedEntry: SecondarySalary | null
	setSelectedEntry: Dispatch<SetStateAction<SecondarySalary | null>>
}

const UpdateSecondarySalaryModal = ({ modalOpen, setModalOpen, selectedEntry, setSelectedEntry }: Props) => {
	const { id } = useParams()
	const [values, setValues] = useState({
		companySpecificJobTitle: selectedEntry?.companySpecificJobTitle ?? "",
		experience: selectedEntry?.experience ?? 1
	})
	const [isLoading, setIsLoading] = useState(false)
	const [form] = Form.useForm()
	const { showMessage, contextHolder } = useMessage()
	const { updateSecondarySalaryEntry } = useSalaryAPI()
	const { getUser } = useUserAPI()
	const { setLoggedInUser } = useContext(UserContext)
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const user = getUserFromStorage()

	const { refetch } = useQuery(
		["user", user?.userId],
		() => {
			if (user?.userId) {
				return getUser(user?.userId)
			}
		},
		{ refetchOnWindowFocus: false, retry: 1 }
	)

	const messageDuration = 10

	useEffect(() => {
		if (selectedEntry !== null) {
			setValues({
				companySpecificJobTitle: selectedEntry.companySpecificJobTitle,
				experience: selectedEntry.experience
			})
		}
		console.log(selectedEntry)
	}, [selectedEntry])

	function handleChange(value: Record<string, string | number>) {
		setValues((prevState) => ({ ...prevState, ...value }))
	}

	async function handleSubmit(e: FormEvent<HTMLButtonElement>) {
		e.preventDefault()

		if (!id) {
			return showMessage({
				type: "error",
				content: "A main salary ID is required",
				duration: messageDuration
			})
		}
		if (!selectedEntry) {
			return showMessage({
				type: "error",
				content: "A company specific salary entry must be selected",
				duration: messageDuration
			})
		}

		const result = validateUpdateSecondarySalaryInput(values)
		if (!result.success) {
			const errorMessages = getZodErrorMessages(result.error)
			return showMessage({
				type: "error",
				content: errorMessages,
				duration: messageDuration
			})
		}

		try {
			setIsLoading(true)
			await updateSecondarySalaryEntry(id, selectedEntry._id, values)
			await queryClient.invalidateQueries({
				queryKey: ["salaries", "single", id]
			})
			refetch({ throwOnError: true }).then(({ data }) => {
				if (data !== undefined && user != null) {
					setLoggedInUser({ ...data, token: user.token })
				}
			})
			return showMessage({
				type: "success",
				content: `Salary entry details updated successfully`,
				duration: messageDuration
			})
		} catch (error) {
			const errorObj = parseError(error)
			if (errorObj === undefined) {
				return showMessage({
					type: "error",
					content: "Something went wrong while updating the company-specific salary entry. Please try again later.",
					duration: messageDuration
				})
			}
			if (errorObj.status === 401) {
				await showMessage({
					type: "error",
					content: "Invalid or expired token. Redirecting to login page...",
					duration: 5
				})
				setTimeout(() => {
					navigate("/login")
					sessionStorage.removeItem("user")
				}, 5000)
			}
			return showMessage({
				type: "error",
				content: errorObj.content,
				duration: messageDuration
			})
		} finally {
			setIsLoading(false)
			setModalOpen(false)
		}
	}

	return (
		<EmptyModal modalOpen={modalOpen} setModalOpen={setModalOpen} title="Update salary entry">
			{contextHolder}
			<CustomForm form={form}>
				<FormItem label="Company-specific job title" name="company-specific-job-title" required={true}>
					<TextInput
						onChange={({ target }) => {
							handleChange({ companySpecificJobTitle: target.value })
						}}
						placeholder="Auditor, Principal Auditor, Associate Account Auditor"
						value={values.companySpecificJobTitle}
					/>
				</FormItem>
				<FormItem label="Experience" name="experience" required={true}>
					<NumberInput
						addonAfter="years"
						onChange={({ target }) => {
							handleChange({ experience: target.valueAsNumber })
						}}
						placeholder="3"
						value={values.experience}
					/>
				</FormItem>

				<div className="buttons-row">
					<Button
						cancelButton
						className="cancel-button"
						innerText="Cancel"
						onClick={() => {
							setModalOpen(false)
							setSelectedEntry(null)
							form.resetFields()
						}}
						size="small"
						type="button"
					/>
					<Button
						addButton
						className="submit-button"
						innerText={isLoading ? "Submitting..." : "Submit"}
						onClick={handleSubmit}
						size="small"
						type="submit"
					/>
				</div>
			</CustomForm>
		</EmptyModal>
	)
}

export default UpdateSecondarySalaryModal
