import { Meta, StoryObj } from "@storybook/react"
import SalaryTable from "../../components/data-display/SalaryTable"

const meta: Meta<typeof SalaryTable> = {
	title: "DataDisplay/SalaryTable",
	component: SalaryTable
}
export default meta

type Story = StoryObj<typeof SalaryTable>

export const Default: Story = {
	args: {
		jobTitle: "Data Analyst",
		city: "Bergen",
		secondarySalaries: [
			{
				_id: "_id",
				companySpecificJobTitle: "Associate Data Analyst",
				experience: 3,
				salaries: [243000, 432000],
				__v: 0,
				lastModified: "2023-05-16T08:21:12.241Z"
			},
			{
				_id: "_id",
				companySpecificJobTitle: "Senior Analyst",
				experience: 6,
				salaries: [894200],
				__v: 0,
				lastModified: "2023-05-16T08:21:12.241Z"
			}
		]
	}
}
