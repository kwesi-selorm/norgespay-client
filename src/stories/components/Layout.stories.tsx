import { Meta, StoryObj } from "@storybook/react"
import Layout, { UserStatus } from "../../components/layout/Layout"
import { LoggedInUser } from "../../@types/types"

const meta: Meta<typeof Layout> = {
	title: "Layout/Layout",
	component: Layout
}
export default meta

type Story = StoryObj<typeof Layout>

export const Default: Story = {
	args: {
		children: (
			<UserStatus
				loggedInUser={{ username: "John Doe" } as LoggedInUser}
				setLoggedInUser={() => {
					console.log("setLoggedInUser")
				}}
			/>
		)
	}
}
