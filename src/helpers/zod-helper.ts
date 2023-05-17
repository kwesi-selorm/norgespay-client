import {
	addSecondarySalaryAmountInputSchema,
	createSalaryInputSchema,
	createSecondarySalaryInputSchema
} from "../@types/schemas"
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

function validateAddSecondarySalaryAmountInput(values: unknown) {
	return addSecondarySalaryAmountInputSchema.safeParse(values)
}

export {
	getZodErrorMessages,
	validateCreateSalaryInput,
	validateCreateSecondarySalaryInput,
	validateAddSecondarySalaryAmountInput
}
