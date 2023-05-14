import { message } from "antd"
import { FiCheckCircle, FiAlertCircle, FiXCircle } from "react-icons/fi"

export type MessageType = "success" | "info" | "error"

const useMessage = () => {
	const [messageApi, contextHolder] = message.useMessage()

	function selectClassNameOnMessageType(type: MessageType) {
		switch (type) {
			case "success":
				return "success-message"
			case "info":
				return "info-message"
			case "error":
				return "error-message"
		}
	}

	function selectIconBasedOnMessageType(type: MessageType) {
		switch (type) {
			case "success":
				return <FiCheckCircle />
			case "info":
				return <FiAlertCircle />
			case "error":
				return <FiXCircle />
		}
	}

	async function showMessage({
		type,
		content,
		duration = 5
	}: {
		type: MessageType
		content: string
		duration?: number
	}) {
		messageApi.open({
			content,
			duration,
			icon: selectIconBasedOnMessageType(type),
			type,
			className: selectClassNameOnMessageType(type)
		})
	}

	return {
		showMessage,
		contextHolder
	}
}

export default useMessage
