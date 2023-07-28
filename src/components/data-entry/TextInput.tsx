import { Input } from "antd"
import { ChangeEventHandler } from "react"
import styled from "styled-components"

type Props = {
	onChange: ChangeEventHandler<HTMLInputElement>
	hasError?: boolean
	placeholder?: string
	size?: "small" | "middle" | "large"
	value: string
	defaultValue?: string
}

const TextInput = ({ onChange, hasError, placeholder, size = "large", value, defaultValue }: Props) => {
	return (
		<Wrapper>
			<StyledInput
				allowClear={true}
				defaultValue={defaultValue}
				onChange={onChange}
				placeholder={placeholder}
				size={size}
				status={hasError ? "error" : ""}
				value={value}
			/>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	margin-inline: auto;
`

const StyledInput = styled(Input)`
	font-family: ${({ theme }) => theme.fonts.family.body};
`

export default TextInput
