import { Select } from "antd"
import styled from "styled-components"
import { ChangeEventHandler } from "react"

type Props = {
	onChange: ChangeEventHandler<HTMLSelectElement>
	options: Array<{ label: string; value: string | number }>
}

const SelectInput = ({ onChange, options }: Props) => {
	return (
		<Wrapper>
			<Select
				onChange={onChange}
				options={options}
				placeholder="Industry"
				showSearch
			/>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	justify-content: center;
	display: flex;
	margin-inline: auto;

	.ant-select {
		margin-inline: auto;
		width: 100%;
	}
`

export default SelectInput
