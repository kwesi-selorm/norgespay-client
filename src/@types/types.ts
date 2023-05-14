import { z } from "zod"
import {
	mainSalarySchema,
	secondarySalarySchema,
	createSalaryInputSchema
} from "./schemas.ts"

type CreateSalaryInput = z.infer<typeof createSalaryInputSchema>

type MainSalary = z.infer<typeof mainSalarySchema>

type SecondarySalary = z.infer<typeof secondarySalarySchema>

export { type MainSalary, type SecondarySalary, type CreateSalaryInput }
