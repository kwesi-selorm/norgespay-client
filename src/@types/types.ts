import { z } from "zod"
import {
	mainSalarySchema,
	secondarySalarySchema,
	createSalaryInputSchema,
	createSecondarySalaryInputSchema,
	addSecondarySalaryAmountInputSchema,
	signUpSchema,
	updateMainSalaryInputSchema,
	deleteSecondarySalaryAmountSchema,
	updateSecondarySalaryAmountInputSchema
} from "./schemas"
import { sectors } from "../util/constants"

type CreateSalaryInput = z.infer<typeof createSalaryInputSchema>

type CreateSecondarySalaryInput = z.infer<typeof createSecondarySalaryInputSchema>

type AddSecondarySalaryAmountInput = z.infer<typeof addSecondarySalaryAmountInputSchema>

type MainSalary = z.infer<typeof mainSalarySchema>

type SecondarySalary = z.infer<typeof secondarySalarySchema>

type UpdateMainSalaryInput = z.infer<typeof updateMainSalaryInputSchema>

type UpdateSecondarySalaryAmountInput = z.infer<typeof updateSecondarySalaryAmountInputSchema>

type DeleteSecondarySalaryAmountInput = z.infer<typeof deleteSecondarySalaryAmountSchema>

type LoggedInUser = {
	userId: string
	username: string
	contributedSalaries: {
		main: MainSalary[]
		secondary: Array<{ salaryEntryId: string; amount: number; _id: string }>
	}
	token: string
}

type SignUpInput = z.infer<typeof signUpSchema>

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
	Others = "Others",
	None = "Select Industry"
}

type SectorsUnion = (typeof sectors)[number]

export {
	type MainSalary,
	type SecondarySalary,
	type CreateSalaryInput,
	type CreateSecondarySalaryInput,
	type AddSecondarySalaryAmountInput,
	type UpdateMainSalaryInput,
	type UpdateSecondarySalaryAmountInput,
	type DeleteSecondarySalaryAmountInput,
	type LoggedInUser,
	type SignUpInput,
	Sectors,
	type SectorsUnion
}
