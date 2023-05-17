import useMessage from "./useMessage"

const useErrorHandler = () => {
	const { showMessage, contextHolder } = useMessage()
	function handleError(error: any) {
		if (error.response !== undefined) {
			return showMessage({
				type: "error",
				content: error.response.data.message
			})
		} else if (error.request !== undefined) {
			return showMessage({
				type: "error",
				content: error.request
			})
		} else {
			return showMessage({
				type: "error",
				content: error.message
			})
		}
	}

	return {
		handleError,
		contextHolder
	}
}

export default useErrorHandler
