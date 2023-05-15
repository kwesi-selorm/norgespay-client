import styled from "styled-components"
import { AiOutlineSearch, FiMenu, FiGrid } from "react-icons/all"
import { Input } from "antd"
import theme from "../styles/theme.ts"
import { ChangeEvent } from "react"

type Props = {
	filter: string
	setDisplayFormat: (displayFormat: string) => void
	setFilter: (filter: string) => void
}

const ControlsBar = ({ filter, setDisplayFormat, setFilter }: Props) => {
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setFilter(e.target.value)
	}

	return (
		<Wrapper>
			<Input
				allowClear
				className="search-input"
				onChange={handleChange}
				prefix={<AiOutlineSearch />}
				placeholder="Search by job title"
				size="large"
				type="search"
				value={filter}
			/>
			<IconsWrapper>
				<FiMenu
					onClick={() => {
						setDisplayFormat("list")
					}}
				/>
				<FiGrid
					onClick={() => {
						setDisplayFormat("grid")
					}}
				/>
			</IconsWrapper>
		</Wrapper>
	)
}

const IconsWrapper = styled.div`
	display: flex;
	gap: 0.8rem;

	svg {
		color: ${theme.appColors.blue};
		fill: ${theme.appColors.blue};
		height: 1.5rem;
		transition: transform 0.2s ease-in-out;
		width: 1.5rem;
	}

	svg:hover {
		cursor: pointer;
		transform: scale(1.2);
	}
`

const Wrapper = styled.div`
	* {
		font-family: Agrandir, sans-serif;
	}

	align-items: center;
	border: 2px solid ${({ theme }) => theme.appColors.red};
	border-radius: ${({ theme }) => theme.borderRadius.large};
	display: flex;
	justify-content: space-between;
	margin-bottom: 2rem;
	margin-inline: auto;
	padding: 1rem;
	width: 50%;

	.search-input {
		font-family: Agrandir, sans-serif;
		width: 50%;
	}
`

export default ControlsBar
