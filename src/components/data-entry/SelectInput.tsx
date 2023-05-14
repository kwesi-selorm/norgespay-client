import { Select } from "antd"
import styled from "styled-components"
import { sectors } from "../../util/constants"

type Props = {
	onChange: VoidFunction
}

const SelectInput = ({ onChange }: Props) => {
	const selectionOptions = sectors.map((sector) => ({
		label: sector,
		value: sector
	}))

	return (
		<Wrapper>
			<Select
				onChange={onChange}
				options={selectionOptions}
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
