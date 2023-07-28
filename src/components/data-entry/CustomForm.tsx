import { Form } from "antd"
import React, { FormHTMLAttributes } from "react"
import styled from "styled-components"
import { FormInstance } from "antd/es/form"
import { SizeType } from "antd/es/config-provider/SizeContext"

type Props = FormHTMLAttributes<HTMLFormElement> & {
	children?: React.ReactNode
	form: FormInstance
	initialValues?: object
	size?: "small" | "default" | "large"
}

const CustomForm = ({ children, form, initialValues, size = "default" }: Props) => {
	return (
		<StyledForm
			initialValues={initialValues}
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
			size={size as SizeType}
		>
			{children}
		</StyledForm>
	)
}

const StyledForm = styled(Form)`
	.ant-form-item-label {
	}
`
export default CustomForm
