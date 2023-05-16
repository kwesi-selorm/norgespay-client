import CustomForm from "../data-entry/CustomForm.tsx"
import FormItem from "../data-entry/FormItem.tsx"
import EmptyModal from "./EmptyModal.tsx"
import NumberInput from "../data-entry/NumberInput.tsx"
import React, { Dispatch, SetStateAction, useContext, useState } from "react"
import { AddSecondarySalaryAmountInput } from "../../@types/types.ts"
import Button from "../Button.tsx"
import styled from "styled-components"
import {
	getZodErrorMessages,
	validateAddSecondarySalaryAmountInput
} from "../../helpers/zod-helper.ts"
import useMessage from "../../hooks/useMessage.tsx"
import handleError from "../../helpers/error-handler.ts"
import { addSecondarySalaryAmount } from "../../api/salaries-api.ts"
import { SalaryContext } from "../../contexts/SalaryContext.tsx"
import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

type AddSecondarySalaryAmountModalProps = {
	addModalOpen: boolean
	setAddModalOpen: Dispatch<SetStateAction<boolean>>
	title: string
}

const Content = ({
	setAddModalOpen
}: {
	setAddModalOpen: Dispatch<SetStateAction<boolean>>
}) => {
	const { id } = useParams()
	const [values, setValues] = useState<AddSecondarySalaryAmountInput>({
		salary: 0
	})
	const [isLoading, setIsLoading] = useState(false)
	const { secondarySalaryId, setSecondarySalaryId } = useContext(SalaryContext)
	const { showMessage, contextHolder } = useMessage()
	const messageDuration = 10
	const queryClient = useQueryClient()

	async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault()

		values.salary = Number(values.salary)
		const result = validateAddSecondarySalaryAmountInput(values)

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
				content: "A main salary id is required",
				duration: messageDuration
			})
		}
		if (secondarySalaryId == null) {
			return showMessage({
				type: "error",
				content: "A secondary salary id is required",
				duration: messageDuration
			})
		}
		console.log({ values: result.data })
		try {
			setIsLoading(true)
			const inputData = result.data
			await addSecondarySalaryAmount(id, secondarySalaryId, inputData)
			await queryClient.invalidateQueries({
				queryKey: ["salaries", "single", id]
			})
			return showMessage({
				type: "success",
				content: `New salary amount added successfully`,
				duration: messageDuration
			})
		} catch (error) {
			const errorObj = handleError(error)
			if (errorObj === undefined) {
				return showMessage({
					type: "error",
					content:
						"Something went wrong while adding the new salary amount. Please try again later.",
					duration: messageDuration
				})
			} else {
				return showMessage({
					type: "error",
					content: errorObj.content,
					duration: messageDuration
				})
			}
		} finally {
			setIsLoading(false)
			setSecondarySalaryId(null)
			setAddModalOpen(false)
			setValues({ salary: 0 })
		}
	}

	return (
		<Wrapper>
			{contextHolder}
			<CustomForm>
				<FormItem label="Salary amount" name="salary" required={true}>
					<NumberInput
						addonBefore="NOK"
						onChange={({ target }) => {
							setValues({ salary: target.valueAsNumber })
						}}
						placeholder="657400"
						value={values.salary}
					/>
				</FormItem>

				<div className="buttons-row">
					<Button
						className="cancel-button"
						innerText="Cancel"
						onClick={() => {
							setSecondarySalaryId(null)
							setValues({ salary: 0 })
							setAddModalOpen(false)
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

const AddSecondarySalaryAmountModal = ({
	addModalOpen,
	setAddModalOpen,
	title
}: AddSecondarySalaryAmountModalProps) => {
	return (
		<EmptyModal modalOpen={addModalOpen} title={title}>
			<Content setAddModalOpen={setAddModalOpen} />
		</EmptyModal>
	)
}

const Wrapper = styled.div``

export default AddSecondarySalaryAmountModal
