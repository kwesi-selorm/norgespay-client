import CustomForm from "../data-entry/CustomForm.tsx"
import FormItem from "../data-entry/FormItem.tsx"
import TextInput from "../data-entry/TextInput.tsx"
import EmptyModal from "./EmptyModal.tsx"
import SelectInput from "../data-entry/SelectInput.tsx"
import { createSalaryInputInitialValues, sectors } from "../../util/constants"
import NumberInput from "../data-entry/NumberInput.tsx"
import React, { useContext, useState } from "react"
import { CreateSalaryInput, Sectors } from "../../@types/types.ts"
import Button from "../Button.tsx"
import styled from "styled-components"
import {
	getZodErrorMessages,
	validateCreateSalaryInput
} from "../../helpers/zod-helper.ts"
import useMessage from "../../hooks/useMessage.tsx"
import { ModalContext } from "../../contexts/ModalContext.tsx"

type NewSalaryModalProps = {
	title: string
}

const industryOptions = sectors.map((sector) => ({
	label: sector,
	value: sector
}))

const Content = () => {
	const [values, setValues] = useState<CreateSalaryInput>(
		createSalaryInputInitialValues
	)
	const { setModalOpen } = useContext(ModalContext)
	const { showMessage, contextHolder } = useMessage()

	function handleChange(value: Record<string, string | number | Sectors>) {
		setValues({ ...values, ...value })
	}

	async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault()
		const result = validateCreateSalaryInput(values)
		if (!result.success) {
			const errorMessages = getZodErrorMessages(result.error)
			return showMessage({
				type: "error",
				content: errorMessages,
				duration: 10
			})
		}
		console.log({ values: result.data })
	}

	return (
		<Wrapper>
			{contextHolder}
			<CustomForm>
				<FormItem label="City" name="city" required={true}>
					<TextInput
						onChange={({ target }) => {
							handleChange({ city: target.value })
						}}
						placeholder="Kristiansand"
					/>
				</FormItem>
				<FormItem label="Job title" name="job-title" required={true}>
					<TextInput
						onChange={({ target }) => {
							handleChange({ jobTitle: target.value })
						}}
						placeholder="Auditor"
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
					/>
				</FormItem>
				<FormItem label="Experience" name="experience" required={true}>
					<NumberInput
						addonAfter="years"
						onChange={({ target }) => {
							handleChange({ experience: target.value })
						}}
						placeholder="3"
					/>
				</FormItem>
				<FormItem label="Salary" name="salary" required={true}>
					<NumberInput
						addonBefore="NOK"
						onChange={({ target }) => {
							handleChange({ salary: target.value })
						}}
						placeholder="657400"
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
						innerText="Submit"
						onClick={handleSubmit}
						size="small"
						type="submit"
					/>
				</div>
			</CustomForm>
		</Wrapper>
	)
}

const NewSalaryModal = ({ title }: NewSalaryModalProps) => {
	return (
		<EmptyModal title={title}>
			<Content />
		</EmptyModal>
	)
}

const Wrapper = styled.div``

export default NewSalaryModal
