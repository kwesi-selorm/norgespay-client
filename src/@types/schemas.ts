import { z } from "zod"
import { sectors } from "../util/constants"

const secondarySalarySchema = z.object({
	_id: z.string(),
	companySpecificJobTitle: z.string(),
	experience: z.number(),
	salaries: z.array(z.number()),
	lastModified: z.date(),
	__v: z.number()
})

const mainSalarySchema = z.object({
	_id: z.string(),
	city: z.string(),
	jobTitle: z.string(),
	salaries: z.array(secondarySalarySchema),
	sector: z.enum(sectors),
	__v: z.number(),
	lastModified: z.date()
})

const createSalaryInputSchema = z.object({
	city: z.string().nonempty("City is required"),
	jobTitle: z.string().nonempty("Job title is required"),
	companySpecificJobTitle: z
		.string()
		.nonempty(
			"Company specific job title is required. You can repeat the job title if same"
		),
	experience: z.number().min(1, "Experience must be at least 1 year"),
	salary: z.number().min(100000, "Salary must be at least 100000"),
	sector: z.enum(sectors)
})

const createSecondarySalaryInputSchema = z.object({
	companySpecificJobTitle: z
		.string()
		.nonempty(
			"Company specific job title is required. You can repeat the job title if same"
		),
	experience: z.number().min(1, "Experience must be at least 1 year"),
	salary: z.number().min(100000, "Salary must be at least 100000")
})

const addSecondarySalaryAmountInputSchema = z.object({
	salary: z.number().min(100000, "Salary must be at least 100000").nonnegative()
})

export {
	secondarySalarySchema,
	mainSalarySchema,
	createSalaryInputSchema,
	createSecondarySalaryInputSchema,
	addSecondarySalaryAmountInputSchema
}
