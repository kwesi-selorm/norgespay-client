import { Meta, StoryObj } from "@storybook/react"
import Home from "../../pages/Home"

const meta: Meta<typeof Home> = {
	title: "Pages/Home",
	component: Home
}

export default meta

type Story = StoryObj<typeof Home>

export const Default: Story = {}
