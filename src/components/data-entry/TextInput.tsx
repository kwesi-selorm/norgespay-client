import { Input } from "antd"
import styled from "styled-components"

type Props = {
	onChange: VoidFunction
	hasError?: boolean
	size?: "small" | "middle" | "large"
}

const TextInput = ({ onChange, hasError, size }: Props) => {
	return (
		<Wrapper>
			<Input
				allowClear={true}
				onChange={onChange}
				size={size && size}
				status={hasError ? "error" : ""}
			/>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	margin-inline: auto;
	width: 80%;
`

export default TextInput
