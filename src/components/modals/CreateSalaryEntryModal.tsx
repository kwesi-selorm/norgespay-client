import CustomForm from "../data-entry/CustomForm"
import FormItem from "../data-entry/FormItem"
import TextInput from "../data-entry/TextInput"
import EmptyModal from "./EmptyModal"
import SelectInput from "../data-entry/SelectInput"
import { createSalaryInputInitialValues, sectors } from "../../util/constants"
import NumberInput from "../data-entry/NumberInput"
import React, { Dispatch, SetStateAction, useContext, useState } from "react"
import { CreateSalaryInput, Sectors } from "../../@types/types"
import Button from "../Button"
import styled from "styled-components"
import {
	getZodErrorMessages,
	validateCreateSalaryInput
} from "../../helpers/zod-helper"
import useMessage from "../../hooks/useMessage"
import parseError from "../../helpers/error-handler"
import { Form } from "antd"
import { useQueryClient } from "@tanstack/react-query"
import useSalaryAPI from "../../hooks/api/useSalaryAPI"
import { UserContext } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom"

type CreateSalaryModalProps = {
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	title: string
}
type ContentProps = {
	setModalOpen: (modalOpen: boolean) => void
}

const industryOptions = sectors.map((sector) => ({
	label: sector,
	value: sector
}))

const Content = ({ setModalOpen }: ContentProps) => {
	const [values, setValues] = useState<CreateSalaryInput>(
		createSalaryInputInitialValues
	)
	const [isLoading, setIsLoading] = useState(false)
	const { showMessage, contextHolder } = useMessage()
	const messageDuration = 10
	const [form] = Form.useForm()
	const queryClient = useQueryClient()
	const { createSalaryEntry } = useSalaryAPI()
	const { loggedInUser } = useContext(UserContext)
	const navigate = useNavigate()

	function handleChange(value: Record<string, string | number | Sectors>) {
		setValues({ ...values, ...value })
	}

	async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault()

		setIsLoading(true)
		values.experience = Number(values.experience)
		values.salary = Number(values.salary)
		const userId = loggedInUser?.userId
		if (!userId) return
		const result = validateCreateSalaryInput({ ...values, userId })

		if (!result.success) {
			const errorMessages = getZodErrorMessages(result.error)
			return showMessage({
				type: "error",
				content: errorMessages,
				duration: messageDuration
			})
		}
		console.log({ values: result.data })
		try {
			const inputData = result.data
			await createSalaryEntry(inputData)
			await queryClient.invalidateQueries(["salaries", "all"])
			return showMessage({
				type: "success",
				content: `New salary for ${inputData.jobTitle} in ${inputData.city} created successfully`,
				duration: messageDuration
			})
		} catch (error) {
			const errorObj = parseError(error)
			if (errorObj === undefined) {
				return showMessage({
					type: "error",
					content:
						"Something went wrong while creating the salary entry. Please try again later.",
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
			return showMessage({
				type: "error",
				content: errorObj.content,
				duration: messageDuration
			})
		} finally {
			setIsLoading(false)
			setValues(createSalaryInputInitialValues)
			setModalOpen(false)
			form.resetFields()
		}
	}

	return (
		<Wrapper>
			{contextHolder}
			<CustomForm form={form}>
				<FormItem label="City" name="city" required={true}>
					<TextInput
						onChange={({ target }) => {
							handleChange({ city: target.value })
						}}
						placeholder="Kristiansand"
						value={values.city}
					/>
				</FormItem>
				<FormItem label="Job title" name="job-title" required={true}>
					<TextInput
						onChange={({ target }) => {
							handleChange({ jobTitle: target.value })
						}}
						placeholder="Auditor"
						value={values.jobTitle}
					/>
				</FormItem>
				<FormItem
					label="Company-specific job title"
					name="company-specific-job-title"
					required={true}
				>
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
				<FormItem label="Salary" name="salary" required={true}>
					<NumberInput
						addonBefore="NOK"
						onChange={({ target }) => {
							handleChange({ salary: target.valueAsNumber })
						}}
						placeholder="657400"
						value={values.salary}
					/>
				</FormItem>
				<FormItem label="Industry" name="industry" required={true}>
					<SelectInput
						onChange={(value) => {
							handleChange({ sector: value })
						}}
						options={industryOptions}
					/>
				</FormItem>
				<div className="buttons-row">
					<Button
						cancelButton
						className="cancel-button"
						innerText="Cancel"
						onClick={() => {
							setModalOpen(false)
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
		</Wrapper>
	)
}

const CreateSalaryEntryModal = ({
	modalOpen,
	setModalOpen,
	title
}: CreateSalaryModalProps) => {
	return (
		<EmptyModal modalOpen={modalOpen} setModalOpen={setModalOpen} title={title}>
			<Content setModalOpen={setModalOpen} />
		</EmptyModal>
	)
}

const Wrapper = styled.div``

export default CreateSalaryEntryModal
