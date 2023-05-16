import { z } from "zod"
import {
	mainSalarySchema,
	secondarySalarySchema,
	createSalaryInputSchema,
	createSecondarySalaryInputSchema,
	addSecondarySalaryAmountInputSchema
} from "./schemas.ts"

type CreateSalaryInput = z.infer<typeof createSalaryInputSchema>

type CreateSecondarySalaryInput = z.infer<
	typeof createSecondarySalaryInputSchema
>

type AddSecondarySalaryAmountInput = z.infer<
	typeof addSecondarySalaryAmountInputSchema
>

type MainSalary = z.infer<typeof mainSalarySchema>

type SecondarySalary = z.infer<typeof secondarySalarySchema>

enum Sectors {
	Agriculture = "Agriculture",
	Business = "Business",
	"Communication Services" = "Communication Services",
	Construction = "Construction",
	Consulting = "Consulting",
	"Consumer Staples and Discretionary" = "Consumer Staples and Discretionary",
	"Education and Research" = "Education and Research",
	"Energy (Oil & Gas, Renewables, etc.)" = "Energy (Oil & Gas, Renewables, etc.)",
	Entertainment = "Entertainment",
	"Financials (Banking, Insurance, Microfinance, etc.)" = "Financials (Banking, Insurance, Microfinance, etc.)",
	"General Engineering" = "General Engineering",
	Government = "Government",
	Healthcare = "Healthcare",
	Industrials = "Industrials",
	"Information Technology" = "Information Technology",
	"Legal and Consulting Services" = "Legal and Consulting Services",
	Materials = "Materials",
	Municipal = "Municipal",
	"Real Estate" = "Real Estate",
	Utilities = "Utilities",
	"Waste Management" = "Waste Management",
	Others = "Others"
}

export {
	type MainSalary,
	type SecondarySalary,
	type CreateSalaryInput,
	type CreateSecondarySalaryInput,
	type AddSecondarySalaryAmountInput,
	Sectors
}
