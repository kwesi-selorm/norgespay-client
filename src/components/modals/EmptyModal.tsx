import styled from "styled-components"
import { Modal } from "antd"
import React, { useContext } from "react"
import theme from "../../styles/theme.ts"
import { ModalContext } from "../../contexts/ModalContext.tsx"

type Props = {
	children?: React.ReactNode
	title: string
}

const EmptyModal = ({ children, title }: Props) => {
	const { modalOpen } = useContext(ModalContext)

	return (
		<CustomModal
			centered={true}
			footer={null}
			open={modalOpen}
			style={{ borderRadius: theme.borderRadius.large }}
			title={title}
			width="45%"
		>
			{children}
		</CustomModal>
	)
}

const CustomModal = styled(Modal)`
	.ant-modal-title {
		color: ${({ theme }) => theme.appColors.blue};
		font-family: "Agrandir Heavy", sans-serif;
		font-size: 1.3rem;
		margin-bottom: 2rem;
	}
`

export default EmptyModal
