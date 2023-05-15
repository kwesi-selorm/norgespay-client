import type { Meta, StoryObj } from "@storybook/react"
import SalaryCard from "../../components/salary/SalaryCard.tsx"

const meta: Meta<typeof SalaryCard> = {
	title: "Components/SalaryCard",
	component: SalaryCard
}

export default meta
type Story = StoryObj<typeof SalaryCard>

export const Default: Story = {
	args: {
		jobTitle: "Software Engineer",
		city: "Telemark",
		lastModified: "2023-05-09T22:46:04.963Z",
		displayFormat: "grid"
	}
}

export const ListCard: Story = {
	args: {
		jobTitle: "Software Engineer",
		city: "Telemark",
		lastModified: "2023-05-09T22:46:04.963Z",
		displayFormat: "list"
	}
}
