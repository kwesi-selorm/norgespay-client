import api from "./config"
import {
	AddSecondarySalaryAmountInput,
	CreateSalaryInput,
	CreateSecondarySalaryInput
} from "../@types/types"

async function getSalaries() {
	const response = await api.get("/salaries/all")
	return response.data
}

async function getSalary(id: string) {
	const response = await api.get(`/salaries/${id}`)
	return response.data
}

async function createSalaryEntry(data: CreateSalaryInput) {
	const response = await api.post("/salaries", data)
	return response.data
}

async function createSecondarySalaryEntry(
	id: string,
	data: CreateSecondarySalaryInput
) {
	const response = await api.post(`/salaries/${id}/secondary`, data)
	return response.data
}

async function addSecondarySalaryAmount(
	id: string,
	secondaryId: string,
	data: AddSecondarySalaryAmountInput
) {
	const response = await api.put(
		`/salaries/${id}/secondary/${secondaryId}`,
		data
	)
	return response.data
}

export {
	getSalaries,
	getSalary,
	createSalaryEntry,
	createSecondarySalaryEntry,
	addSecondarySalaryAmount
}
