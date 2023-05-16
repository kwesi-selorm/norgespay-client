import CustomForm from "../data-entry/CustomForm.tsx"
import FormItem from "../data-entry/FormItem.tsx"
import TextInput from "../data-entry/TextInput.tsx"
import EmptyModal from "./EmptyModal.tsx"
import SelectInput from "../data-entry/SelectInput.tsx"
import { createSalaryInputInitialValues, sectors } from "../../util/constants"
import NumberInput from "../data-entry/NumberInput.tsx"
import React, { useState } from "react"
import { CreateSalaryInput, Sectors } from "../../@types/types.ts"
import Button from "../Button.tsx"
import styled from "styled-components"
import {
	getZodErrorMessages,
	validateCreateSalaryInput
} from "../../helpers/zod-helper.ts"
import useMessage from "../../hooks/useMessage.tsx"
import handleError from "../../helpers/error-handler.ts"
import { createSalaryEntry } from "../../api/salaries-api.ts"
import { Form } from "antd"

type CreateSalaryModalProps = {
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

	function handleChange(value: Record<string, string | number | Sectors>) {
		setValues({ ...values, ...value })
	}

	async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault()

		setIsLoading(true)
		values.experience = Number(values.experience)
		values.salary = Number(values.salary)
		const result = validateCreateSalaryInput(values)

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
			return showMessage({
				type: "success",
				content: `New salary for ${inputData.jobTitle} in ${inputData.city} created successfully`,
				duration: messageDuration
			})
		} catch (error) {
			const errorObj = handleError(error)
			if (errorObj === undefined) {
				return showMessage({
					type: "error",
					content:
						"Something went wrong while creating the salary entry. Please try again later.",
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
						className="cancel-button"
						innerText="Cancel"
						onClick={() => {
							setModalOpen(false)
						}}
						size="small"
						type="button"
					/>
					<Button
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

const CreateSalaryEntryModal = ({ title }: CreateSalaryModalProps) => {
	const [modalOpen, setModalOpen] = useState(false)

	return (
		<EmptyModal modalOpen={modalOpen} title={title}>
			<Content setModalOpen={setModalOpen} />
		</EmptyModal>
	)
}

const Wrapper = styled.div``

export default CreateSalaryEntryModal
