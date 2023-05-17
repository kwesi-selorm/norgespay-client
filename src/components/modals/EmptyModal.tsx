import styled from "styled-components"
import { Modal } from "antd"
import React from "react"
import theme from "../../styles/theme"

type Props = {
	children?: React.ReactNode
	modalOpen: boolean
	title: string
}

const EmptyModal = ({ children, modalOpen, title }: Props) => {
	return (
		<CustomModal
			centered={true}
			closable={false}
			footer={null}
			keyboard={true}
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
