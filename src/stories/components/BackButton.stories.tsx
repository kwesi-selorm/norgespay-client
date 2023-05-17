import { Meta, StoryObj } from "@storybook/react"
import BackButton from "../../components/BackButton"

const meta: Meta<typeof BackButton> = {
	title: "Components/BackButton",
	component: BackButton
}

export default meta

type Story = StoryObj<typeof BackButton>

export const Default: Story = {}
