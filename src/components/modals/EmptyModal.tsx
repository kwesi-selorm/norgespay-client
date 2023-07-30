import styled from "styled-components"
import { Modal } from "antd"
import React, { Dispatch, SetStateAction } from "react"
import theme from "../../styles/theme"
import { CloseIcon } from "../../assets/icons"

type Props = {
	children?: React.ReactNode
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	title: string
}

const EmptyModal = ({ children, modalOpen, setModalOpen, title }: Props) => {
	return (
		<CustomModal
			centered={true}
			footer={null}
			keyboard={true}
			maskClosable={true}
			onCancel={() => setModalOpen(false)}
			open={modalOpen}
			style={{ borderRadius: theme.borderRadius.large }}
			title={title}
			closeIcon={<CloseIcon width="1rem" />}
		>
			{children}
		</CustomModal>
	)
}

const CustomModal = styled(Modal)`
	width: 45%;

	.ant-modal-title {
		color: ${({ theme }) => theme.appColors.blue};
		font-size: 1.3rem;
		margin-bottom: 2rem;
	}

	@media (max-width: ${({ theme }) => theme.screenWidth.small}) {
		width: 100%;
	}
`

export default EmptyModal
