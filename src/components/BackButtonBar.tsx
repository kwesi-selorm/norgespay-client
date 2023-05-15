import styled from "styled-components"
import BackLink from "./BackLink.tsx"

const BackButtonBar = () => {
	return (
		<Wrapper>
			<BackLink />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	margin-bottom: 2rem;
	text-align: left;
`

export default BackButtonBar
