import { Meta, StoryObj } from "@storybook/react"
import ExpandableList from "../../components/ExpandableList"

const meta: Meta<typeof ExpandableList> = {
	title: "Components/ExpandableList",
	component: ExpandableList
}
export default meta

type Story = StoryObj<typeof ExpandableList>

export const Default: Story = {
	args: {
		headerText: "Header Text",
		children: (
			<ul>
				<li>Item 1</li>
				<li>Item 2</li>
				<li>Item 3</li>
			</ul>
		)
	}
}

export const WithoutHeader: Story = {
	args: {
		children: (
			<ul>
				<li>Item 1</li>
				<li>Item 2</li>
				<li>Item 3</li>
			</ul>
		)
	}
}
