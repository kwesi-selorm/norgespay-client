import { Dispatch, SetStateAction } from "react"
import styled from "styled-components"
import { MainSalary } from "../../@types/types"
import Button from "../Button"
import EmptyModal from "./EmptyModal"
import SelectInput from "../data-entry/SelectInput"
import theme from "../../styles/theme"

type Props = {
	selectedSalary: MainSalary | null
	setSelectedSalary: Dispatch<SetStateAction<MainSalary | null>>
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
}

const InsightsModal = ({ selectedSalary, setSelectedSalary, modalOpen, setModalOpen }: Props) => {
	let experienceOptions: Array<{ label: string; value: number }> = []

	if (selectedSalary !== null) {
		const experiences = selectedSalary?.salaries.map((s) => s.experience)
		experienceOptions = experiences.map((e) => ({ label: e.toString(), value: e }))
	}

	function handleClose() {
		setSelectedSalary(null)
		setModalOpen(false)
	}

	function handleChange(value: string) {
		console.log(value)
	}

	return (
		<EmptyModal modalOpen={modalOpen} setModalOpen={setModalOpen} title="Insights">
			<InsightsArticle>
				<h3>{selectedSalary?.jobTitle}</h3>
				<SelectInput onChange={handleChange} options={experienceOptions} placeholder="Experience" />
			</InsightsArticle>
			<Button
				cancelButton={true}
				className="close-button"
				innerText="Close"
				type="button"
				onClick={handleClose}
				size="small"
			/>
		</EmptyModal>
	)
}

const InsightsArticle = styled.article`
	margin-bottom: ${theme.spacing.medium};
`

export default InsightsModal
