import CustomForm from "../data-entry/CustomForm"
import FormItem from "../data-entry/FormItem"
import EmptyModal from "./EmptyModal"
import NumberInput from "../data-entry/NumberInput"
import React, { Dispatch, SetStateAction, useContext, useState } from "react"
import { AddSecondarySalaryAmountInput } from "../../@types/types"
import Button from "../Button"
import styled from "styled-components"
import {
	getZodErrorMessages,
	validateAddSecondarySalaryAmountInput
} from "../../helpers/zod-helper"
import useMessage from "../../hooks/useMessage"
import parseError from "../../helpers/error-handler"
import { SalaryContext } from "../../contexts/SalaryContext"
import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { Form } from "antd"
import useSalaryAPI from "../../hooks/api/useSalaryAPI"

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
	const [form] = Form.useForm()
	const { addSecondarySalaryAmount } = useSalaryAPI()

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
			const errorObj = parseError(error)
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
			form.resetFields()
		}
	}

	return (
		<Wrapper>
			{contextHolder}
			<CustomForm form={form}>
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
						cancelButton
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

const AddSecondarySalaryAmountModal = ({
	addModalOpen,
	setAddModalOpen,
	title
}: AddSecondarySalaryAmountModalProps) => {
	return (
		<EmptyModal
			modalOpen={addModalOpen}
			setModalOpen={setAddModalOpen}
			title={title}
		>
			<Content setAddModalOpen={setAddModalOpen} />
		</EmptyModal>
	)
}

const Wrapper = styled.div``

export default AddSecondarySalaryAmountModal
