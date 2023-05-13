import { Meta, StoryObj } from "@storybook/react"
import Button from "../../components/Button.tsx"

const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button
}

export default meta

type Story = StoryObj<typeof Button>

export const SmallButton: Story = {
	args: { innerText: "Small button", size: "small" }
}

export const LargeButton: Story = {
	args: { innerText: "Large button", size: "large" }
}
