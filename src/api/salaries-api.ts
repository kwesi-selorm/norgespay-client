import api from "./config.ts"
import {
	AddSecondarySalaryAmountInput,
	CreateSalaryInput,
	CreateSecondarySalaryInput
} from "../@types/types.ts"

async function getSalaries() {
	const response = await api.get("/salaries/all")
	return response.data
}

async function createSalaryEntry(data: CreateSalaryInput) {
	const response = await api.post("/salaries", data)
	return response.data
}

async function createSecondarySalaryEntry(
	id: string,
	secondaryId: string,
	data: CreateSecondarySalaryInput
) {
	const response = await api.post(
		`/salaries/${id}/secondary/${secondaryId}`,
		data
	)
	return response.data
}

async function addSecondarySalaryAmount(
	id: string,
	secondaryId: string,
	data: AddSecondarySalaryAmountInput
) {
	const response = await api.post(
		`/salaries/${id}/secondary/${secondaryId}`,
		data
	)
	return response.data
}

export {
	getSalaries,
	createSalaryEntry,
	createSecondarySalaryEntry,
	addSecondarySalaryAmount
}
