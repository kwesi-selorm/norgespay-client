import { Meta, StoryObj } from "@storybook/react"
import Login from "../../pages/Login"

const meta: Meta<typeof Login> = {
	title: "Pages/Login",
	component: Login
}

export default meta

type Story = StoryObj<typeof Login>

export const Default: Story = {}
