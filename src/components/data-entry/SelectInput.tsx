import { Select } from "antd"
import styled from "styled-components"
import { SectorsUnion } from "../../@types/types"

type Props = {
	onChange: (value: string) => void
	options: Array<{ label: string; value: string | number }>
	value?: SectorsUnion
	defaultValue?: SectorsUnion
}

const SelectInput = ({ onChange, options, value, defaultValue }: Props) => {
	return (
		<Wrapper>
			<Select
				onChange={onChange}
				options={options}
				placeholder="Industry"
				showSearch
				value={value}
				defaultValue={defaultValue}
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
