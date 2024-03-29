import { Form } from "antd"
import React from "react"
import styled from "styled-components"
import { FormInstance } from "antd/es/form"

type Props = {
	children?: React.ReactNode
	form: FormInstance
}

const CustomForm = ({ children, form }: Props) => {
	return (
		<StyledForm
			labelWrap={true}
			colon={false}
			labelAlign="left"
			labelCol={{ span: 6 }}
			name="custom-form"
			preserve={false}
			form={form}
			requiredMark={true}
			scrollToFirstError={true}
			style={{ width: "100%" }}
			wrapperCol={{ span: 20 }}
		>
			{children}
		</StyledForm>
	)
}

const StyledForm = styled(Form)`
	.ant-form-item-label {
	}

	* {
		font-family: "Agrandir", sans-serif;
	}
`
export default CustomForm
