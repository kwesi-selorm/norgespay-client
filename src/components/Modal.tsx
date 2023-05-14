import styled from "styled-components"
import { Modal } from "antd"
import React from "react"

type Props = {
	children: React.ReactNode
	title: string
	modalOpen: boolean
	onCancel: () => void
	onSubmit: () => void
}

const CustomModal = ({
	children,
	title,
	modalOpen,
	onCancel,
	onSubmit
}: Props) => {
	return (
		<Wrapper>
			<Modal
				centered={true}
				onCancel={onCancel}
				onOk={onSubmit}
				open={modalOpen}
				title={title}
			>
				{children}
				<h1>Hello</h1>
			</Modal>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	background: blue;

	& .ant-modal-content {
		background-color: red;
	}
`

export default CustomModal
