import {
	addSecondarySalaryAmountInputSchema,
	createSalaryInputSchema,
	createSecondarySalaryInputSchema,
	updateMainSalaryInputSchema,
	updateSecondarySalaryInputSchema
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

function validateUpdateMainSalaryInput(values: unknown) {
	return updateMainSalaryInputSchema.safeParse(values)
}

function validateUpdateSecondarySalaryInput(values: unknown) {
	return updateSecondarySalaryInputSchema.safeParse(values)
}

export {
	getZodErrorMessages,
	validateCreateSalaryInput,
	validateCreateSecondarySalaryInput,
	validateAddSecondarySalaryAmountInput,
	validateUpdateMainSalaryInput,
	validateUpdateSecondarySalaryInput
}
