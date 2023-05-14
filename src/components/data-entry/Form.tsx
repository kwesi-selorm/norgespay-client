import { Form } from "antd"
import React from "react"
import styled from "styled-components"

type Props = {
	children: React.ReactNode
}

const CustomForm = ({ children }: Props) => {
	return (
		<Wrapper>
			<Form colon={false} name="custom-form" scrollToFirstError={true}>
				{children}
			</Form>
		</Wrapper>
	)
}

const Wrapper = styled.div``
export default CustomForm
