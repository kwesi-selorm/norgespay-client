import CustomForm from "../data-entry/CustomForm"
import FormItem from "../data-entry/FormItem"
import EmptyModal from "./EmptyModal"
import NumberInput from "../data-entry/NumberInput"
import React, { Dispatch, SetStateAction, useContext, useState } from "react"
import { AddSecondarySalaryAmountInput } from "../../@types/types"
import Button from "../Button"
import styled from "styled-components"
import { getZodErrorMessages, validateAddSecondarySalaryAmountInput } from "../../helpers/zod-helper"
import useMessage from "../../hooks/useMessage"
import parseError from "../../helpers/error-handler"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Form } from "antd"
import useSalaryAPI from "../../hooks/api/useSalaryAPI"
import { UserContext } from "../../contexts/UserContext"
import useUserAPI from "../../hooks/api/useUserAPI"
import { getUserFromStorage } from "../../util/local-storage"

type AddSecondarySalaryAmountModalProps = {
	addModalOpen: boolean
	setAddModalOpen: Dispatch<SetStateAction<boolean>>
	title: string
	selectedSecondaryId: string | null
	setSelectedSecondaryId: Dispatch<SetStateAction<string | null>>
}
type ContentProps = Pick<
	AddSecondarySalaryAmountModalProps,
	"setAddModalOpen" | "selectedSecondaryId" | "setSelectedSecondaryId"
>

const Content = ({ setAddModalOpen, selectedSecondaryId, setSelectedSecondaryId }: ContentProps) => {
	const { id } = useParams()
	const [values, setValues] = useState<AddSecondarySalaryAmountInput>({
		salary: 0,
		userId: ""
	})
	const [isLoading, setIsLoading] = useState(false)
	const { showMessage, contextHolder } = useMessage()
	const messageDuration = 10
	const queryClient = useQueryClient()
	const [form] = Form.useForm()
	const { addSecondarySalaryAmount } = useSalaryAPI()
	const { setLoggedInUser } = useContext(UserContext)
	const navigate = useNavigate()

	const { getUser } = useUserAPI()
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

	async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault()

		const userId = user?.userId
		if (userId === undefined) {
			return showMessage({
				type: "error",
				content: "A user ID is required to add a secondary salary amount.",
				duration: messageDuration
			})
		}
		values.salary = Number(values.salary)
		const result = validateAddSecondarySalaryAmountInput({ ...values, userId })

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
		if (selectedSecondaryId == null) {
			return showMessage({
				type: "error",
				content: "A secondary salary id is required",
				duration: messageDuration
			})
		}
		try {
			setIsLoading(true)
			const inputData = result.data
			await addSecondarySalaryAmount(id, selectedSecondaryId, inputData)
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
				content: `New salary amount added successfully`,
				duration: messageDuration
			})
		} catch (error) {
			const errorObj = parseError(error)
			if (errorObj === undefined) {
				return showMessage({
					type: "error",
					content: "Something went wrong while adding the new salary amount. Please try again later.",
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
			setIsLoading(false)
			setSelectedSecondaryId(null)
			setAddModalOpen(false)
			setValues({ salary: 0, userId: "" })
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
							setValues({ ...values, salary: target.valueAsNumber })
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
							setSelectedSecondaryId(null)
							setValues({ salary: 0, userId: "" })
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
	title,
	selectedSecondaryId,
	setSelectedSecondaryId
}: AddSecondarySalaryAmountModalProps) => {
	return (
		<EmptyModal modalOpen={addModalOpen} setModalOpen={setAddModalOpen} title={title}>
			<Content
				setAddModalOpen={setAddModalOpen}
				selectedSecondaryId={selectedSecondaryId}
				setSelectedSecondaryId={setSelectedSecondaryId}
			/>
		</EmptyModal>
	)
}

const Wrapper = styled.div``

export default AddSecondarySalaryAmountModal
