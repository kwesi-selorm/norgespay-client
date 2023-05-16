import CustomForm from "../data-entry/CustomForm.tsx"
import FormItem from "../data-entry/FormItem.tsx"
import TextInput from "../data-entry/TextInput.tsx"
import EmptyModal from "./EmptyModal.tsx"
import { createSecondarySalaryInputInitialValues } from "../../util/constants"
import NumberInput from "../data-entry/NumberInput.tsx"
import React, { Dispatch, SetStateAction, useState } from "react"
import { CreateSecondarySalaryInput } from "../../@types/types.ts"
import Button from "../Button.tsx"
import styled from "styled-components"
import {
	getZodErrorMessages,
	validateCreateSecondarySalaryInput
} from "../../helpers/zod-helper.ts"
import useMessage from "../../hooks/useMessage.tsx"
import handleError from "../../helpers/error-handler.ts"
import { createSecondarySalaryEntry } from "../../api/salaries-api.ts"
import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

type CreateSecondarySalaryModalProps = {
	createModalOpen: boolean
	setCreateModalOpen: Dispatch<SetStateAction<boolean>>
	title: string
}

const Content = ({
	setCreateModalOpen
}: {
	setCreateModalOpen: Dispatch<SetStateAction<boolean>>
}) => {
	const { id } = useParams()
	const [values, setValues] = useState<CreateSecondarySalaryInput>(
		createSecondarySalaryInputInitialValues
	)
	const [isLoading, setIsLoading] = useState(false)
	const { showMessage, contextHolder } = useMessage()
	const messageDuration = 10
	const queryClient = useQueryClient()

	function handleChange(value: Record<string, string | number>) {
		setValues({ ...values, ...value })
	}

	async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault()

		values.experience = Number(values.experience)
		values.salary = Number(values.salary)
		const result = validateCreateSecondarySalaryInput(values)

		if (!result.success) {
			const errorMessages = getZodErrorMessages(result.error)
			return showMessage({
				type: "error",
				content: errorMessages,
				duration: messageDuration
			})
		}
		if (id === undefined) {
			return showMessage({
				type: "error",
				content: "Main salary id is required",
				duration: messageDuration
			})
		}

		try {
			setIsLoading(true)
			const inputData = result.data
			await createSecondarySalaryEntry(id, inputData)
			await queryClient.invalidateQueries({
				queryKey: ["salaries", "single", id]
			})
			return showMessage({
				type: "success",
				content: `New salary added for ${inputData.companySpecificJobTitle} successfully`,
				duration: messageDuration
			})
		} catch (error) {
			const errorObj = handleError(error)
			if (errorObj === undefined) {
				return showMessage({
					type: "error",
					content:
						"Something went wrong while adding the salary. Please try again later.",
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
			setValues(createSecondarySalaryInputInitialValues)
			setCreateModalOpen(false)
		}
	}

	return (
		<Wrapper>
			{contextHolder}
			<CustomForm>
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
							handleChange({ experience: target.valueAsNumber })
						}}
						placeholder="3"
					/>
				</FormItem>
				<FormItem label="Salary" name="salary" required={true}>
					<NumberInput
						addonBefore="NOK"
						onChange={({ target }) => {
							handleChange({ salary: target.valueAsNumber })
						}}
						placeholder="657400"
					/>
				</FormItem>

				<div className="buttons-row">
					<Button
						className="cancel-button"
						innerText="Cancel"
						onClick={() => {
							setCreateModalOpen(false)
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

const CreateSecondarySalaryEntryModal = ({
	createModalOpen,
	setCreateModalOpen,
	title
}: CreateSecondarySalaryModalProps) => {
	return (
		<EmptyModal modalOpen={createModalOpen} title={title}>
			<Content setCreateModalOpen={setCreateModalOpen} />
		</EmptyModal>
	)
}

const Wrapper = styled.div``

export default CreateSecondarySalaryEntryModal
