import useAPIConfig from "./useAPIConfig"
import {
	AddSecondarySalaryAmountInput,
	CreateSalaryInput,
	CreateSecondarySalaryInput,
	DeleteSecondarySalaryAmountInput,
	UpdateMainSalaryInput,
	UpdateSecondarySalaryAmountInput
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

	async function createSecondarySalaryEntry(id: string, data: CreateSecondarySalaryInput) {
		const response = await apiWithToken.post(`/salaries/${id}/secondary`, data)
		return response.data
	}

	async function addSecondarySalaryAmount(id: string, secondaryId: string, data: AddSecondarySalaryAmountInput) {
		const response = await apiWithToken.post(`/salaries/${id}/secondary/${secondaryId}`, data)
		return response.data
	}

	async function deleteSecondarySalaryAmount(secondarySalaryId: string, data: DeleteSecondarySalaryAmountInput) {
		const response = await apiWithToken.delete(`/salaries/${secondarySalaryId}/secondary-amount`, { data })
		return response.data
	}

	async function updateMainSalaryEntry(id: string, data: UpdateMainSalaryInput) {
		const response = await apiWithToken.put(`/salaries/${id}`, data)
		return response.data
	}

	async function updateSecondarySalaryAmount(secondaryId: string, data: UpdateSecondarySalaryAmountInput) {
		const response = await apiWithToken.put(`/salaries/${secondaryId}/secondary`, data)
		return response.data
	}

	async function deleteSecondarySalaryEntry(secondaryId: string) {
		const response = await apiWithToken.delete(`/salaries/${secondaryId}/secondary`)
		return response.data
	}

	async function deleteMainSalaryEntry(id: string) {
		const response = await apiWithToken.delete(`/salaries/${id}`)
		return response.data
	}

	return {
		getSalaries,
		getSalary,
		createSalaryEntry,
		createSecondarySalaryEntry,
		addSecondarySalaryAmount,
		deleteSecondarySalaryAmount,
		updateMainSalaryEntry,
		updateSecondarySalaryAmount,
		deleteSecondarySalaryEntry,
		deleteMainSalaryEntry
	}
}

export default useSalaryAPI
