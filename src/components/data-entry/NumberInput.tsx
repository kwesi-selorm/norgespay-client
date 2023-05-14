import { InputNumber } from "antd"
import styled from "styled-components"

type Props = {
	onChange: VoidFunction
	hasError: boolean
	isSalary?: number
	size?: "small" | "middle" | "large"
}

const NumberInput = ({
	onChange,
	hasError,
	isSalary,
	size = "middle"
}: Props) => {
	return (
		<Wrapper>
			<InputNumber
				decimalSeparator=","
				formatter={(value) => {
					if (value === undefined) return ""
					return new Intl.NumberFormat("nor-NO").format(Number(value))
				}}
				onChange={onChange}
				prefix={isSalary && "NOK"}
				size={size}
				status={hasError ? "error" : ""}
			/>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	justify-content: center;
	display: flex;
	width: 100%;

	.ant-input-number,
	.ant-input-number-affix-wrapper {
		width: 60%;
	}
`

export default NumberInput
