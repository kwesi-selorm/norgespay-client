import { Sectors } from "../@types/types.ts"

const createSalaryInputInitialValues = {
	city: "",
	companySpecificJobTitle: "",
	experience: 0,
	jobTitle: "",
	salary: 0,
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
	"Materials",
	"Municipal",
	"Real Estate",
	"Utilities",
	"Waste Management",
	"Others"
] as const

export { createSalaryInputInitialValues, sectors }
