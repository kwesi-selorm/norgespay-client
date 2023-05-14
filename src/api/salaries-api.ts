import api from "./config.ts"
// import { MainSalary } from "../@types/types.ts"

async function getSalaries() {
	const response = await api.get("/salaries/all")
	return response.data
}

export { getSalaries }
