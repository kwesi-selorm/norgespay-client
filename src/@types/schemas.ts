import { z } from "zod"
import { passwordRegex, sectors } from "../util/constants"

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
		.nonempty("Company specific job title is required. You can repeat the job title if same"),
	experience: z.number().min(1, "Experience must be at least 1 year"),
	salary: z.number().min(100000, "Salary must be at least 100000"),
	sector: z.enum(sectors),
	userId: z.string().nonempty("User ID is required")
})

const createSecondarySalaryInputSchema = z.object({
	companySpecificJobTitle: z
		.string()
		.nonempty("Company specific job title is required. You can repeat the job title if same"),
	experience: z.number().min(1, "Experience must be at least 1 year"),
	salary: z.number().min(100000, "Salary must be at least 100000"),
	userId: z.string().nonempty("User ID is required")
})

const addSecondarySalaryAmountInputSchema = z.object({
	salary: z.number().min(100000, "Salary must be at least 100000").nonnegative(),
	userId: z.string().nonempty("User ID is required")
})

const updateMainSalaryInputSchema = z.object({
	city: z.string().nonempty("City is required"),
	jobTitle: z.string().nonempty("Job title is required"),
	sector: z.enum(sectors)
})

const updateSecondarySalaryInputSchema = z.object({
	companySpecificJobTitle: z.string().nonempty("Job title is required"),
	experience: z.number().min(1, "Experience must be at least 1 year")
})
const updateSecondarySalaryAmountInputSchema = z.object({
	previousAmount: z.number().min(100000, "Salary must be at least 100000").nonnegative(),
	currentAmount: z.number().min(100000, "Salary must be at least 100000").nonnegative()
})

const deleteSecondarySalaryAmountSchema = z.object({
	salaryAmount: z.number().min(100000, "Salary must be at least 100000").nonnegative(),
	userId: z.string().nonempty("User ID is required")
})

const deleteSecondarySalaryEntryInputSchema = z.object({
	userId: z.string().nonempty("User ID is required")
})

const logInSchema = z.object({
	username: z.string().min(3, "Username must be at least 3 characters").nonempty("Username is required"),
	password: z
		.string()
		.nonempty("Password is required")
		.regex(
			passwordRegex,
			"Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
		)
})

const signUpSchema = z
	.object({
		username: z.string().nonempty("Username is required").min(3, "Username must be at least 3 characters"),
		email: z.string().email(),
		password: z
			.string()
			.nonempty("Password is required")
			.regex(
				passwordRegex,
				"Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
			),
		confirmPassword: z
			.string()
			.nonempty("Confirm password is required")
			.regex(
				passwordRegex,
				"Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
			)
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match"
	})

export {
	secondarySalarySchema,
	mainSalarySchema,
	createSalaryInputSchema,
	createSecondarySalaryInputSchema,
	addSecondarySalaryAmountInputSchema,
	updateMainSalaryInputSchema,
	updateSecondarySalaryInputSchema,
	updateSecondarySalaryAmountInputSchema,
	deleteSecondarySalaryAmountSchema,
	deleteSecondarySalaryEntryInputSchema,
	logInSchema,
	signUpSchema
}
