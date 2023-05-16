import { AxiosError } from "axios"

function handleError(error: unknown) {
	if (error instanceof AxiosError) {
		if (error.response && error.response.data && error.response.data.message) {
			return {
				type: "error",
				content: error.response?.data?.message,
				status: error.response?.status
			}
		}
	} else {
		return {
			type: "error",
			content: JSON.stringify(error),
			duration: 15,
			status: 500
		}
	}
}

export default handleError
