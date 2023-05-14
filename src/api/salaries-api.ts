import api from "./config.ts"
import { CreateSalaryInput } from "../@types/types.ts"

async function getSalaries() {
	const response = await api.get("/salaries/all")
	return response.data
}

async function createSalary(data: CreateSalaryInput) {
	const response = await api.post("/salaries", data)
	return response.data
}

export { getSalaries, createSalary }
