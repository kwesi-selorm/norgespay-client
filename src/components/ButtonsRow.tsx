import styled from "styled-components"
import React from "react"

const ButtonsRow = ({ children }: { children: React.ReactNode }) => {
	return <StyledDiv>{children}</StyledDiv>
}

const StyledDiv = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
	justify-content: flex-end;
`

export default ButtonsRow
