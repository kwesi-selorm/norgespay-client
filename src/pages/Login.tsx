import CustomForm from "../components/data-entry/CustomForm"
import { Form, Input } from "antd"
import TextInput from "../components/data-entry/TextInput"
import FormItem from "../components/data-entry/FormItem"
import { FormEvent, useContext, useEffect, useState } from "react"
import Button from "../components/Button"
import { SlLogin } from "react-icons/sl"
import styled from "styled-components"
import { UserContext } from "../contexts/UserContext"
import useUserAPI from "../hooks/api/useUserAPI"
import useMessage from "../hooks/useMessage"
import { useNavigate } from "react-router-dom"
import { AxiosError } from "axios"
import { logInSchema } from "../@types/schemas"
import { getZodErrorMessages } from "../helpers/zod-helper"

const Login = () => {
	const [form] = Form.useForm()
	const [values, setValues] = useState({
		username: "",
		password: ""
	})
	const { setLoggedInUser } = useContext(UserContext)
	const { logIn } = useUserAPI()
	const { showMessage, contextHolder } = useMessage()
	const navigate = useNavigate()

	async function handleLogin(e: FormEvent<HTMLButtonElement>) {
		e.preventDefault()

		const storedUser = localStorage.getItem("user")
		if (storedUser) {
			navigate("/salaries")
			return
		}
		const result = logInSchema.safeParse(values)
		if (!result.success) {
			const errorMessages = getZodErrorMessages(result.error)
			return showMessage({
				type: "error",
				content: errorMessages,
				duration: 10
			})
		}

		try {
			const authenticatedUser = await logIn(values.username, values.password)
			if (authenticatedUser === undefined) {
				return showMessage({
					type: "error",
					content:
						"No authenticated user returned from database. Please try again with different credentials.",
					duration: 10
				})
			}
			setLoggedInUser(authenticatedUser)
			localStorage.setItem("user", JSON.stringify(authenticatedUser))
			navigate("/salaries")
			return showMessage({
				type: "success",
				content: "Successfully logged in.",
				duration: 5
			})
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
				<Button
					className="login-button"
					icon={<SlLogin />}
					innerText="Log in"
					onClick={handleLogin}
					size="small"
					type="submit"
				/>
				<h3>
					Not registered? <SignUpLink href="/sign-up">Sign up</SignUpLink>{" "}
				</h3>
			</CustomForm>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	margin-inline: auto;
	margin-top: 20%;
	width: 30%;

	.login-button {
		transition: transform 0.2s ease-out;
	}

	.login-button:hover {
		transform: scale(1.05);
	}
`

const SignUpLink = styled.a`
	text-decoration: underline;
`

export default Login
