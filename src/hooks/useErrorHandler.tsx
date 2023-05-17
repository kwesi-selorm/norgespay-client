import useMessage from "./useMessage"

const useErrorHandler = () => {
	const { showMessage, contextHolder } = useMessage()
	function handleError(error: any) {
		if (error.response !== undefined) {
			showMessage({
				type: "error",
				content: error.response.data.message
			})
		} else if (error.request !== undefined) {
			showMessage({
				type: "error",
				content: error.request
			})
		} else {
			showMessage({
				type: "error",
				content: error.message
			})
		}
		showMessage({
			type: "error",
			content: error.toString()
		})
	}

	return {
		handleError,
		contextHolder
	}
}

export default useErrorHandler
