import { z } from "zod"
import { sectors } from "../util/constants.ts"

const secondarySalarySchema = z.object({
	_id: z.string(),
	companySpecificJobTitle: z.string(),
	experience: z.number(),
	salaries: z.array(z.number()),
	lastModified: z.string(),
	__v: z.number()
})

const mainSalarySchema = z.object({
	_id: z.string(),
	city: z.string(),
	jobTitle: z.string(),
	salaries: z.array(secondarySalarySchema),
	sector: z.enum(sectors),
	__v: z.number(),
	lastModified: z.string()
})

export { secondarySalarySchema, mainSalarySchema }
