import useMessage from "../../hooks/useMessage"
import useSalaryAPI from "../../hooks/api/useSalaryAPI"
import React, { FormEvent, useContext, useEffect, useState } from "react"
import { UpdateSecondarySalaryAmountInput } from "../../@types/types"
import EmptyModal from "./EmptyModal"
import { Form } from "antd"
import CustomForm from "../data-entry/CustomForm"
import FormItem from "../data-entry/FormItem"
import NumberInput from "../data-entry/NumberInput"
import ButtonsRow from "../ButtonsRow"
import Button from "../Button"
import { getZodErrorMessages, validateUpdateSecondarySalaryAmountInput } from "../../helpers/zod-helper"
import parseError from "../../helpers/error-handler"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserFromStorage } from "../../util/local-storage"
import useUserAPI from "../../hooks/api/useUserAPI"
import { UserContext } from "../../contexts/UserContext"

type Props = {
	modalOpen: boolean
	previousAmount: number
	selectedSecondaryId: string | null
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	setPreviousAmount: React.Dispatch<React.SetStateAction<number>>
}

const UpdateSecondarySalaryAmountModal = ({
	modalOpen,
	previousAmount,
	selectedSecondaryId,
	setModalOpen,
	setPreviousAmount
}: Props) => {
	const { updateSecondarySalaryAmount } = useSalaryAPI()
	const { getUser } = useUserAPI()
	const { showMessage, contextHolder } = useMessage()
	const [values, setValues] = useState<UpdateSecondarySalaryAmountInput>({ previousAmount: 0, currentAmount: 0 })
	const [isLoading, setIsLoading] = useState(false)
	const [form] = Form.useForm()
	const navigate = useNavigate()
	const { id } = useParams()
	const queryClient = useQueryClient()
	const { setLoggedInUser } = useContext(UserContext)

	const user = getUserFromStorage()
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

	useEffect(() => {
		setValues((prev) => ({ ...prev, previousAmount }))
	}, [previousAmount])

	async function handleSubmit(e: FormEvent<HTMLButtonElement>) {
		e.preventDefault()

		if (!selectedSecondaryId) {
			return showMessage({
				type: "error",
				content: "A secondary salary ID is required",
				duration: messageDuration
			})
		}

		if (values.previousAmount === values.currentAmount) {
			return showMessage({
				type: "error",
				content: "The previous and updated amounts cannot be equal"
			})
		}

		const result = validateUpdateSecondarySalaryAmountInput({ ...values, previousAmount })
		if (!result.success) {
			const errorMessages = getZodErrorMessages(result.error)
			return showMessage({
				type: "error",
				content: errorMessages,
				duration: messageDuration
			})
		}

		try {
			console.log(values)
			setIsLoading(true)
			await updateSecondarySalaryAmount(selectedSecondaryId, values)
			await showMessage({
				type: "success",
				content: "Salary amount successfully updated",
				duration: messageDuration
			})
			await queryClient.invalidateQueries(["salaries", "single", id])
			refetch({ throwOnError: true }).then(({ data }) => {
				if (data !== undefined) {
					setLoggedInUser({ ...data, token: user?.token })
				}
			})
		} catch (error) {
			const errorObj = parseError(error)
			if (errorObj === undefined) {
				return showMessage({
					type: "error",
					content: "Something went wrong while updating the salary amount. Please try again later.",
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
			setModalOpen(false)
			setPreviousAmount(0)
		}
	}

	return (
		<EmptyModal modalOpen={modalOpen} setModalOpen={setModalOpen} title="Update salary amount">
			{contextHolder}
			<CustomForm form={form}>
				<p>Previous salary amount: NOK {previousAmount}</p>
				<FormItem label="New salary amount" name="currentAmount">
					<NumberInput
						onChange={({ target }) => setValues({ ...values, currentAmount: target.valueAsNumber })}
						prefix="NOK"
						value={values.currentAmount}
					/>
				</FormItem>
				<ButtonsRow>
					<Button
						cancelButton={true}
						innerText="Cancel"
						onClick={() => {
							setModalOpen(false)
							setPreviousAmount(0)
							form.resetFields()
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

export default UpdateSecondarySalaryAmountModal
