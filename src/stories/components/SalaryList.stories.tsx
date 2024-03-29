import type { Meta, StoryObj } from "@storybook/react"
import { MainSalary } from "../../@types/types"
import SalaryList from "../../components/salary/SalaryList"

const meta: Meta<typeof SalaryList> = {
	title: "Components/SalaryList",
	component: SalaryList
}

const salaries = [
	{
		city: "Stavanger",
		jobTitle: "Software Engineer",
		lastModified: new Date(2019, 1, 1)
	},
	{
		city: "Oslo",
		jobTitle: "Teacher",
		lastModified: "2020-01-01T00:00:00"
	},
	{
		city: "Bergen",
		jobTitle: "Professor",
		lastModified: "2020-01-01T00:00:00"
	},
	{
		city: "Trondheim",
		jobTitle: "Data Analyst",
		lastModified: "2020-01-01T00:00:00"
	}
] as MainSalary[]

export default meta
type Story = StoryObj<typeof SalaryList>

export const Default: Story = {
	args: { salaries, displayFormat: "grid" }
}

export const List: Story = {
	args: { salaries, displayFormat: "list" }
}
