// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseError(error: any) {
	if (error.response) {
		if (error.response && error.response.data && error.response.data.message) {
			return {
				type: "error",
				content: error.response?.data?.message,
				status: error.response?.status
			}
		}
	} else if (error.message) {
		return {
			type: "error",
			content: error.message,
			status: error.status ?? 500
		}
	} else {
		return {
			type: "error",
			content: JSON.stringify(error),
			status: 500
		}
	}
}

export default parseError
