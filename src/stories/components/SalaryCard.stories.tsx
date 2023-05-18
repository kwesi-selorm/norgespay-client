import type { Meta, StoryObj } from "@storybook/react"
import SalaryCard from "../../components/salary/SalaryCard"

const meta: Meta<typeof SalaryCard> = {
	title: "Components/SalaryCard",
	component: SalaryCard
}

export default meta
type Story = StoryObj<typeof SalaryCard>

export const Default: Story = {
	args: {
		displayFormat: "grid",
		salary: {
			_id: "123",
			jobTitle: "Software Engineer",
			city: "Telemark",
			lastModified: new Date(2019, 0, 1),
			salaries: [
				{
					_id: "123",
					companySpecificJobTitle: "Software Engineer",
					salaries: [230000, 540000],
					experience: 3,
					__v: 0,
					lastModified: new Date("2023-05-09T22:46")
				}
			],
			__v: 0,
			sector: "Healthcare"
		}
	}
}

export const ListCard: Story = {
	args: {
		displayFormat: "list",
		salary: {
			_id: "123",
			jobTitle: "Software Engineer",
			city: "Telemark",
			lastModified: new Date(),
			salaries: [
				{
					_id: "123",
					companySpecificJobTitle: "Software Engineer",
					salaries: [230000, 540000],
					experience: 3,
					__v: 0,
					lastModified: new Date()
				}
			],
			__v: 0,
			sector: "Healthcare"
		}
	}
}
