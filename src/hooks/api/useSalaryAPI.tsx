import useAPIConfig from "./useAPIConfig"
import {
	AddSecondarySalaryAmountInput,
	CreateSalaryInput,
	CreateSecondarySalaryInput,
	UpdateMainSalaryInput
} from "../../@types/types"

const useSalaryAPI = () => {
	const { apiWithToken } = useAPIConfig()

	async function getSalaries() {
		const response = await apiWithToken.get("/salaries/all")
		return response.data
	}

	async function getSalary(id: string) {
		const response = await apiWithToken.get(`/salaries/${id}`)
		return response.data
	}

	async function createSalaryEntry(data: CreateSalaryInput) {
		const response = await apiWithToken.post("/salaries", data)
		return response.data
	}

	async function createSecondarySalaryEntry(
		id: string,
		data: CreateSecondarySalaryInput
	) {
		const response = await apiWithToken.post(`/salaries/${id}/secondary`, data)
		return response.data
	}

	async function addSecondarySalaryAmount(
		id: string,
		secondaryId: string,
		data: AddSecondarySalaryAmountInput
	) {
		const response = await apiWithToken.post(
			`/salaries/${id}/secondary/${secondaryId}`,
			data
		)
		return response.data
	}

	async function deleteSalaryEntry(
		entryId: string,
		type: "main" | "secondary"
	) {
		const response = await apiWithToken.delete(
			`/salaries/${entryId}?type=${type}`
		)
		return response.data
	}

	async function updateMainSalaryEntry(
		id: string,
		data: UpdateMainSalaryInput
	) {
		const response = await apiWithToken.put(`/salaries/${id}`, data)
		return response.data
	}

	return {
		getSalaries,
		getSalary,
		createSalaryEntry,
		createSecondarySalaryEntry,
		addSecondarySalaryAmount,
		deleteSalaryEntry,
		updateMainSalaryEntry
	}
}

export default useSalaryAPI
