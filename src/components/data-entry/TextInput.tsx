import { Input } from "antd"
import styled from "styled-components"
import { ChangeEventHandler } from "react"

type Props = {
	onChange: ChangeEventHandler<HTMLInputElement>
	hasError?: boolean
	placeholder?: string
	size?: "small" | "middle" | "large"
}

const TextInput = ({ onChange, hasError, placeholder, size }: Props) => {
	return (
		<Wrapper>
			<Input
				allowClear={true}
				onChange={onChange}
				placeholder={placeholder}
				size={size && size}
				status={hasError ? "error" : ""}
			/>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	margin-inline: auto;
	//width: 80%;
`

export default TextInput
