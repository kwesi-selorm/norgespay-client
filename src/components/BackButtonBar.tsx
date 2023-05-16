import styled from "styled-components"
import BackButton from "./BackButton.tsx"

const BackButtonBar = () => {
	return (
		<Wrapper>
			<BackButton />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	margin-bottom: 2rem;
	text-align: left;
`

export default BackButtonBar
