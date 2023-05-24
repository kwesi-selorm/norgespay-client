import { Form } from "antd"
import React from "react"

type Props = {
	children?: React.ReactNode
	label: string
	name: string
	required?: boolean
}

const FormItem = ({ children, label, name, required }: Props) => {
	return (
		<Form.Item
			colon={false}
			label={label}
			name={name}
			required={required}
			rules={required ? [{ required: true, message: `Please provide a ${name}` }] : []}
		>
			{children}
		</Form.Item>
	)
}

export default FormItem
