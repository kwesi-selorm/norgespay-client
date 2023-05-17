import React from "react"
import styled from "styled-components"
import BackButtonBar from "./BackButtonBar"

const Layout = ({ children }: { children?: React.ReactNode }) => {
	return (
		<Wrapper>
			<BackButtonBar />
			{children}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	margin-top: 2rem;
`

export default Layout
