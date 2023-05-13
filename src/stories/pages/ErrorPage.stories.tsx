import type { Meta, StoryObj } from "@storybook/react"
import SalaryCard from "../../components/SalaryCard.tsx"
import ErrorPage from "../../pages/ErrorPage.tsx"

const meta: Meta<typeof SalaryCard> = {
	title: "Pages/ErrorPage",
	component: ErrorPage
}

export default meta
type Story = StoryObj<typeof ErrorPage>

export const Default: Story = {}
