import {
	createSalaryInputSchema,
	createSecondarySalaryInputSchema
} from "../@types/schemas.ts"
import { ZodError } from "zod"

function getZodErrorMessages(error: ZodError): string {
	const errorMessages = error.errors.map(
		(error) => `${error.message} at [${error.path[0]}]`
	)
	return errorMessages.join(" | ")
}

function validateCreateSalaryInput(values: unknown) {
	return createSalaryInputSchema.safeParse(values)
}

function validateCreateSecondarySalaryInput(values: unknown) {
	return createSecondarySalaryInputSchema.safeParse(values)
}

export {
	getZodErrorMessages,
	validateCreateSalaryInput,
	validateCreateSecondarySalaryInput
}
