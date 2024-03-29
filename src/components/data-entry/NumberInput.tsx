import { Input } from "antd"
import styled from "styled-components"
import { ChangeEventHandler } from "react"

type Props = {
	addonAfter?: string
	addonBefore?: string
	onChange: ChangeEventHandler<HTMLInputElement>
	hasError?: boolean
	isSalary?: number
	placeholder?: string
	prefix?: string
	size?: "small" | "middle" | "large"
	suffix?: string
	value?: number
}

const NumberInput = ({
	addonAfter,
	addonBefore,
	onChange,
	hasError,
	placeholder,
	prefix,
	size = "middle",
	value
}: Props) => {
	return (
		<Wrapper>
			<Input
				addonAfter={addonAfter}
				addonBefore={addonBefore}
				// formatter={(value) => {
				// 	if (value === undefined) return ""
				// 	return new Intl.NumberFormat("nor-NO").format(Number(value))
				// }}
				onChange={onChange}
				placeholder={placeholder}
				prefix={prefix}
				type="number"
				size={size}
				status={hasError ? "error" : ""}
				value={value}
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
		width: 100%;
	}
`

export default NumberInput
