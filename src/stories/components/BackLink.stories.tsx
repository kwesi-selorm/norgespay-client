import { Meta, StoryObj } from "@storybook/react"
import BackLink from "../../components/BackLink.tsx"

const meta: Meta<typeof BackLink> = {
	title: "Components/BackLink",
	component: BackLink
}

export default meta

type Story = StoryObj<typeof BackLink>

export const Default: Story = {}
