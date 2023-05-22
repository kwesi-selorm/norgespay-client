import CustomForm from "../components/data-entry/CustomForm"
import { Form, Input } from "antd"
import TextInput from "../components/data-entry/TextInput"
import FormItem from "../components/data-entry/FormItem"
import { FormEvent, useEffect, useState } from "react"
import Button from "../components/Button"
import { FiUserPlus } from "react-icons/fi"
import styled from "styled-components"
import useUserAPI from "../hooks/api/useUserAPI"
import useMessage from "../hooks/useMessage"
import { useNavigate } from "react-router-dom"
import { AxiosError } from "axios"
import { signUpSchema } from "../@types/schemas"
import { getZodErrorMessages } from "../helpers/zod-helper"

const Signup = () => {
	const [form] = Form.useForm()
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: ""
	})
	const { signUp } = useUserAPI()
	const { showMessage, contextHolder } = useMessage()
	const navigate = useNavigate()

	async function handleSignup(e: FormEvent<HTMLButtonElement>) {
		e.preventDefault()

		const result = signUpSchema.safeParse(values)
		if (!result.success) {
			const errorMessages = getZodErrorMessages(result.error)
			return showMessage({
				type: "error",
				content: errorMessages,
				duration: 10
			})
		}

		try {
			const registeredUser = await signUp(values)
			if (registeredUser === undefined) {
				return showMessage({
					type: "error",
					content:
						"Error creating user. Please try again with different credentials.",
					duration: 10
				})
			}
			await showMessage({
				type: "success",
				content: "User created successfully. Redirecting to login page.",
				duration: 5
			})
			setTimeout(() => {
				navigate("/login")
			}, 5000)
		} catch (error) {
			if (error instanceof AxiosError) {
				return showMessage({
					type: "error",
					content: error.response?.data.message,
					duration: 10
				})
			}
			return showMessage({
				type: "error",
				content: JSON.stringify(error),
				duration: 10
			})
		}
	}

	useEffect(() => {
		form.resetFields()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Wrapper>
			{contextHolder}
			<CustomForm form={form}>
				<FormItem label="Email" name="email">
					<TextInput
						onChange={({ target }) =>
							setValues((prev) => ({ ...prev, email: target.value }))
						}
						value={values.email}
					/>
				</FormItem>
				<FormItem label="Username" name="username">
					<TextInput
						onChange={({ target }) =>
							setValues((prev) => ({ ...prev, username: target.value }))
						}
						value={values.username}
					/>
				</FormItem>
				<FormItem label="Password" name="password">
					<Input.Password
						onChange={({ target }) =>
							setValues((prev) => ({ ...prev, password: target.value }))
						}
						value={values.password}
					/>
				</FormItem>
				<FormItem label="Confirm password" name="confirmPassword">
					<Input.Password
						onChange={({ target }) =>
							setValues((prev) => ({ ...prev, confirmPassword: target.value }))
						}
						value={values.confirmPassword}
					/>
				</FormItem>
				<Button
					className="signup-button"
					icon={<FiUserPlus />}
					innerText="Sign up"
					onClick={handleSignup}
					size="small"
					type="submit"
				/>
				<h3>
					Already have an account? <LoginLink href="/login">Log in</LoginLink>{" "}
				</h3>
			</CustomForm>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	margin-inline: auto;
	margin-top: 20%;
	width: 30%;

	.signup-button {
		transition: transform 0.2s ease-out;
	}

	.signup-button:hover {
		transform: scale(1.05);
	}
`

const LoginLink = styled.a`
	text-decoration: underline;
`

export default Signup
