import { z } from "zod"
import { mainSalarySchema, secondarySalarySchema } from "./schemas.ts"

type MainSalary = z.infer<typeof mainSalarySchema>

type SecondarySalary = z.infer<typeof secondarySalarySchema>

export { type MainSalary, type SecondarySalary }
