import { Input } from "antd"
import styled from "styled-components"
import { ChangeEventHandler } from "react"

type Props = {
	onChange: ChangeEventHandler<HTMLInputElement>
	hasError?: boolean
	placeholder?: string
	size?: "small" | "middle" | "large"
	value: string
}

const TextInput = ({ onChange, hasError, placeholder, size, value }: Props) => {
	return (
		<Wrapper>
			<Input
				allowClear={true}
				onChange={onChange}
				placeholder={placeholder}
				size={size && size}
				status={hasError ? "error" : ""}
				value={value}
			/>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	margin-inline: auto;
	//width: 80%;
`

export default TextInput
