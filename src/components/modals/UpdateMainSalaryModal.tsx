import EmptyModal from "./EmptyModal"
import CustomForm from "../data-entry/CustomForm"
import { Form } from "antd"
import FormItem from "../data-entry/FormItem"
import TextInput from "../data-entry/TextInput"
import React, { useContext, useEffect } from "react"
import { Sectors, UpdateMainSalaryInput } from "../../@types/types"
import SelectInput from "../data-entry/SelectInput"
import { sectors } from "../../util/constants"
import { useQueryClient } from "@tanstack/react-query"
import { getZodErrorMessages, validateUpdateMainSalaryInput } from "../../helpers/zod-helper"
import useMessage from "../../hooks/useMessage"
import ButtonsRow from "../ButtonsRow"
import Button from "../Button"
import useSalaryAPI from "../../hooks/api/useSalaryAPI"
import { useNavigate } from "react-router-dom"
import parseError from "../../helpers/error-handler"
import { SalaryContext } from "../../contexts/SalaryContext"

type Props = {
	modalOpen: boolean
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const industryOptions = sectors.map((sector) => ({
	label: sector,
	value: sector
}))

const UpdateMainSalaryModal = ({ modalOpen, setModalOpen }: Props) => {
	const { selectedEntry, setSelectedEntry } = useContext(SalaryContext)
	const [form] = Form.useForm()
	const [values, setValues] = React.useState<UpdateMainSalaryInput>({
		city: "",
		jobTitle: "",
		sector: Sectors.None
	})
	const [isLoading, setIsLoading] = React.useState(false)

	const queryClient = useQueryClient()
	const { showMessage, contextHolder } = useMessage()
	const { updateMainSalaryEntry } = useSalaryAPI()
	const navigate = useNavigate()

	const messageDuration = 10

	useEffect(() => {
		if (selectedEntry != null) {
			setValues({
				city: selectedEntry?.city,
				jobTitle: selectedEntry.jobTitle,
				sector: selectedEntry.sector
			})
		}
	}, [selectedEntry])

	function handleChange(value: Record<string, string | number | Sectors>) {
		setValues({ ...values, ...value })
	}

	async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault()

		const result = validateUpdateMainSalaryInput(values)
		if (!result.success) {
			const errorMessages = getZodErrorMessages(result.error)
			return showMessage({
				type: "error",
				content: errorMessages,
				duration: messageDuration
			})
		}
		const id = selectedEntry?._id
		if (!id) {
			return showMessage({
				type: "error",
				content: "A salary ID is required",
				duration: messageDuration
			})
		}

		try {
			setIsLoading(true)
			await updateMainSalaryEntry(id, values)
		} catch (error) {
			const errorObj = parseError(error)
			if (errorObj === undefined) {
				return showMessage({
					type: "error",
					content: "Something went wrong while updating the salary entry. Please try again later.",
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
			return showMessage({
				type: "error",
				content: errorObj.content,
				duration: messageDuration
			})
		} finally {
			setIsLoading(false)
			setModalOpen(false)
			setSelectedEntry(null)
			await queryClient.invalidateQueries(["salaries", "all"])
			form.resetFields()
		}
	}

	return (
		<EmptyModal modalOpen={modalOpen} setModalOpen={setModalOpen} title="Update salary details">
			{contextHolder}
			<CustomForm
				form={form}
				initialValues={{
					city: selectedEntry?.city,
					jobTitle: selectedEntry?.jobTitle,
					sector: selectedEntry?.sector
				}}
			>
				<FormItem label="City" name="city" required={true}>
					<TextInput
						onChange={({ target }) => {
							handleChange({ city: target.value })
						}}
						placeholder="Kristiansand"
						value={values.city}
					/>
				</FormItem>
				<FormItem label="Job title" name="jobTitle" required={true}>
					<TextInput
						onChange={({ target }) => {
							handleChange({ jobTitle: target.value })
						}}
						placeholder="Auditor"
						value={values.jobTitle}
					/>
				</FormItem>
				<FormItem label="Industry" name="sector" required={true}>
					<SelectInput
						onChange={(value) => {
							handleChange({ sector: value })
						}}
						options={industryOptions}
						value={values.sector}
					/>
				</FormItem>
				<ButtonsRow>
					<Button
						cancelButton={true}
						innerText="Cancel"
						onClick={() => {
							setModalOpen(false)
							setSelectedEntry(null)
							form.resetFields()
							// window.location.reload()
						}}
						size="small"
						type="button"
					/>
					<Button
						addButton={true}
						onClick={handleSubmit}
						innerText={isLoading ? "Submitting..." : "Submit"}
						size="small"
						type="button"
						disabled={isLoading}
					/>
				</ButtonsRow>
			</CustomForm>
		</EmptyModal>
	)
}

export default UpdateMainSalaryModal
