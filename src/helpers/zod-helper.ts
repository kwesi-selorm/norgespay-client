import { createSalaryInputSchema } from "../@types/schemas.ts"
import { ZodError } from "zod"

function getZodErrorMessages(error: ZodError): string {
	const errorMessages = error.errors.map((error) => error.message)
	return errorMessages.join(" | ")
}

function validateCreateSalaryInput(values: unknown) {
	return createSalaryInputSchema.safeParse(values)
}

export { getZodErrorMessages, validateCreateSalaryInput }
