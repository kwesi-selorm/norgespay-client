import { Sectors } from "../@types/types"

const createSecondarySalaryInputInitialValues = {
	companySpecificJobTitle: "",
	experience: 0,
	salary: 0,
	userId: ""
}

const createSalaryInputInitialValues = {
	...createSecondarySalaryInputInitialValues,
	city: "",
	jobTitle: "",
	sector: Sectors.Others
}

const sectors = [
	"Agriculture",
	"Business",
	"Communication Services",
	"Construction",
	"Consulting",
	"Consumer Staples and Discretionary",
	"Education and Research",
	"Energy (Oil & Gas, Renewables, etc.)",
	"Entertainment",
	"Financials (Banking, Insurance, Microfinance, etc.)",
	"General Engineering",
	"Government",
	"Healthcare",
	"Industrials",
	"Information Technology",
	"Legal and Consulting Services",
	"Maritime",
	"Materials",
	"Municipal",
	"Real Estate",
	"Utilities",
	"Waste Management",
	"Others",
	"Select Industry"
] as const

const passwordRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export {
	createSecondarySalaryInputInitialValues,
	createSalaryInputInitialValues,
	sectors,
	passwordRegex
}
