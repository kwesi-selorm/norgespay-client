import type { Meta, StoryObj } from "@storybook/react"
import SalaryList from "../../pages/SalaryList.tsx"
import { MainSalary } from "../../@types/types.ts"

const meta: Meta<typeof SalaryList> = {
	title: "Pages/SalaryList",
	component: SalaryList
}

const salaries = [
	{
		city: "Stavanger",
		jobTitle: "Software Engineer",
		lastModified: "2020-01-01T00:00:00"
	},
	{
		city: "Oslo",
		jobTitle: "Teacher",
		lastModified: "2020-01-01T00:00:00"
	}
] as MainSalary[]

export default meta
type Story = StoryObj<typeof SalaryList>

export const Default: Story = {
	args: { salaries }
}
