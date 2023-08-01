import React, { Dispatch, SetStateAction } from "react"
import { CollapseIcon, ExpandIcon } from "../assets/icons"
import styled from "styled-components"

type Props = {
	expanded: boolean
	setExpanded: Dispatch<SetStateAction<boolean>>
	headerText?: string | number
	children: React.ReactNode
}

const ExpandableList = ({ expanded, setExpanded, headerText, children }: Props) => {
	function toggleExpanded() {
		setExpanded((prevState) => !prevState)
	}

	function renderIcon() {
		if (expanded) {
			return <CollapseIcon />
		} else {
			return <ExpandIcon />
		}
	}

	return (
		<>
			<Header onClick={toggleExpanded}>
				<h5>{headerText ?? "Click to expand"}</h5>
				{renderIcon()}
			</Header>
			{expanded && children}
		</>
	)
}

const Header = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;

	h5 {
		margin: 0;
	}
`

export default ExpandableList
