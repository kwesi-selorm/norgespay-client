import type { Meta, StoryObj } from "@storybook/react"
import SalaryCard from "../../components/SalaryCard.tsx"

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
		lastModified: "16/03/2020"
	}
}
