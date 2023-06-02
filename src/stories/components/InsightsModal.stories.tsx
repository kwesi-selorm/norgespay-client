import { Meta, StoryObj } from "@storybook/react"
import InsightsModal from "../../components/modals/InsightsModal"

const meta: Meta<typeof InsightsModal> = {
	title: "Components/Modals/InsightsModal",
	component: InsightsModal
}
export default meta

type Story = StoryObj<typeof InsightsModal>

export const Default: Story = {
	args: {
		modalOpen: true,
		setModalOpen: () => {
			console.log("close")
		},
		selectedSalary: {
			_id: "3",
			jobTitle: "Chemist",
			city: "Oslo",
			sector: "Healthcare",
			salaries: [
				{
					_id: "1",
					companySpecificJobTitle: "Junior Chemist",
					experience: 2,
					salaries: [548000, 438200, 654280],
					lastModified: new Date(),
					__v: 3
				},
				{
					_id: "2",
					companySpecificJobTitle: "Senior Chemist",
					experience: 3,
					salaries: [736000, 658200, 644280],
					lastModified: new Date(),
					__v: 3
				}
			],
			lastModified: new Date(),
			__v: 0
		}
	}
}
