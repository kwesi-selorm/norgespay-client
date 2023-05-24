import styled from "styled-components"
import { MainSalary, SecondarySalary } from "../../@types/types"
import theme from "../../styles/theme"
import { formatNumberToCurrency, parseToLocaleDate } from "../../helpers/type-helper"
import { IoMdAdd } from "react-icons/io"
import Button from "../Button"
import EmptyTable from "./EmptyTable"
import { Dispatch, SetStateAction, useState } from "react"
import addTableARIA from "../../util/table-aria"
import DeleteSalaryAmountModal from "../modals/DeleteSalaryAmountModal"
import { DeleteIcon, EditIcon } from "../../assets/icons"
import UpdateSecondarySalaryAmountModal from "../modals/UpdateSecondarySalaryAmountModal"
import AddSecondarySalaryAmountModal from "../modals/AddSecondarySalaryAmountModal"
import DeleteSecondarySalaryModal from "../modals/DeleteSecondarySalaryModal"

type SalaryTableProps = {
	jobTitle: string
	city: string
	secondarySalaries: MainSalary["salaries"]
}
type ContributedSalariesProps = {
	contributedSalaries: number[]
	setDeleteModalOpen: Dispatch<SetStateAction<boolean>>
	setSelectedSecondaryId: Dispatch<SetStateAction<string | null>>
	secondarySalary: SecondarySalary
	setSalaryAmount: Dispatch<SetStateAction<number>>
	setUpdateModalOpen: Dispatch<SetStateAction<boolean>>
	setDeleteEntryModalOpen: Dispatch<SetStateAction<boolean>>
}

const ContributedSalaries = ({
	contributedSalaries,
	setDeleteModalOpen,
	setSelectedSecondaryId,
	secondarySalary,
	setSalaryAmount,
	setUpdateModalOpen,
	setDeleteEntryModalOpen
}: ContributedSalariesProps) => {
	function handleDeleteButtonClick(salary: number) {
		if (contributedSalaries.length === 1) {
			setDeleteEntryModalOpen(true)
			setSelectedSecondaryId(secondarySalary._id)
		} else {
			setDeleteModalOpen(true)
			setSelectedSecondaryId(secondarySalary._id)
			setSalaryAmount(salary)
		}
	}

	function handleEditButtonClick(salary: number) {
		setUpdateModalOpen(true)
		setSelectedSecondaryId(secondarySalary._id)
		setSalaryAmount(salary)
	}

	return (
		<Wrapper>
			{contributedSalaries.map((salary) => {
				return (
					<div key={salary} className="salary-amount-item">
						<li style={{ listStyle: "none" }}>{formatNumberToCurrency(salary)}</li>
						<div className="icons-row">
							<EditIcon className="edit-button" onClick={() => handleEditButtonClick(salary)} />
							<DeleteIcon className="delete-button" onClick={() => handleDeleteButtonClick(salary)} />
						</div>
					</div>
				)
			})}
		</Wrapper>
	)
}

const Wrapper = styled.ul`
	margin: 0;
	max-height: 5rem;
	padding-left: 0;

	.salary-amount-item {
		align-items: center;
		display: flex;
		gap: 0.8rem;
		padding-bottom: ${theme.spacing.small};
	}

	.edit-button,
	.delete-button {
		display: none;
	}

	.edit-button:hover,
	.delete-button:hover {
		cursor: pointer;
	}

	&:hover {
		.edit-button,
		.delete-button {
			display: inline-block;
		}
	}
`

const SalaryTable = ({ jobTitle, city, secondarySalaries }: SalaryTableProps) => {
	const [addModalOpen, setAddModalOpen] = useState(false)
	const [deleteModalOpen, setDeleteModalOpen] = useState(false)
	const [deleteEntryModalOpen, setDeleteEntryModalOpen] = useState(false)
	const [selectedSecondaryId, setSelectedSecondaryId] = useState<string | null>(null)
	const [salaryAmount, setSalaryAmount] = useState(0)
	const [updateModalOpen, setUpdateModalOpen] = useState(false)

	addTableARIA()

	return (
		<Container>
			<AddSecondarySalaryAmountModal
				addModalOpen={addModalOpen}
				setAddModalOpen={setAddModalOpen}
				title="Add salary amount"
				selectedSecondaryId={selectedSecondaryId}
				setSelectedSecondaryId={setSelectedSecondaryId}
			/>
			<DeleteSalaryAmountModal
				modalOpen={deleteModalOpen}
				salaryAmount={salaryAmount}
				setSalaryAmount={setSalaryAmount}
				setModalOpen={setDeleteModalOpen}
				selectedSecondaryId={selectedSecondaryId}
				setSelectedSecondaryId={setSelectedSecondaryId}
			/>
			<UpdateSecondarySalaryAmountModal
				modalOpen={updateModalOpen}
				previousAmount={salaryAmount}
				selectedSecondaryId={selectedSecondaryId}
				setPreviousAmount={setSalaryAmount}
				setModalOpen={setUpdateModalOpen}
			/>
			<DeleteSecondarySalaryModal
				modalOpen={deleteEntryModalOpen}
				setModalOpen={setDeleteEntryModalOpen}
				selectedSecondaryId={selectedSecondaryId}
				setSelectedSecondaryId={setSelectedSecondaryId}
			/>
			<StyledEmptyTable>
				<StyledCaption>
					<h3 className="content">{`${jobTitle}, ${city}`}</h3>
				</StyledCaption>
				<StyledThead>
					<StyledTr>
						<StyledTh scope="col">Position</StyledTh>
						<StyledTh scope="col">Experience (yrs)</StyledTh>
						<StyledTh scope="col">Salaries (NOK)</StyledTh>
						<StyledTh scope="col">Last Updated</StyledTh>
					</StyledTr>
				</StyledThead>
				<StyledTbody>
					{secondarySalaries.map((salary) => (
						<StyledTr className="body-row" key={salary._id}>
							<StyledTh data-cell="Position" className="position-cell">
								{salary.companySpecificJobTitle}
							</StyledTh>
							<StyledTd data-cell="Experience (yrs)" className="experience-cell">
								{salary.experience}
							</StyledTd>
							<StyledTd data-cell="Salaries (NOK)" className="salaries-cell">
								<ContributedSalaries
									contributedSalaries={salary.salaries}
									setDeleteModalOpen={setDeleteModalOpen}
									setSelectedSecondaryId={setSelectedSecondaryId}
									secondarySalary={salary}
									setSalaryAmount={setSalaryAmount}
									setUpdateModalOpen={setUpdateModalOpen}
									setDeleteEntryModalOpen={setDeleteEntryModalOpen}
								/>
							</StyledTd>
							<StyledTd data-cell="Last Updated" className="last-updated-cell">
								{parseToLocaleDate(salary.lastModified)}
								<Button
									addButton={true}
									className="add-button"
									icon={<IoMdAdd />}
									innerText=""
									onClick={() => {
										setSelectedSecondaryId(salary._id)
										setAddModalOpen(true)
									}}
									size="small"
									type="button"
								></Button>
							</StyledTd>
						</StyledTr>
					))}
				</StyledTbody>
			</StyledEmptyTable>
		</Container>
	)
}

const Container = styled.div``

const StyledEmptyTable = styled(EmptyTable)`
	@media screen and (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		width: 100%;
		td {
			padding-block: ${({ theme }) => theme.spacing.extraSmall};
			font-size: 1rem;
		}
	}
`

const StyledCaption = styled.caption`
	color: ${theme.appColors.hoverBlue};

	.content {
		font-family: "Agrandir Heavy", sans-serif;
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}

	@media screen and (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		font-size: 0.8rem;
		text-align: left;
	}
`

const StyledThead = styled.thead`
	background: ${theme.appColors.darkBlue};

	@media screen and (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		display: none;
	}
`

const StyledTh = styled.th`
	@media screen and (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		&.position-cell {
			display: block;
			font-family: Agrandir Heavy, sans-serif;
			font-size: 0.9rem;
			padding-block: ${({ theme }) => theme.spacing.extraSmall};
		}
	}
`

const StyledTbody = styled.tbody``

const StyledTr = styled.tr`
	transition: transform 0.3s ease-out;

	&.body-row:hover {
		background: ${theme.appColors.hoverBlue};
		transform: scale(1.05);

		.add-button {
			display: flex;
		}
	}

	@media screen and (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		td:last-child {
			padding-bottom: 2rem;
		}
	}
`

const StyledTd = styled.td`
	&.salaries-cell {
		overflow-y: auto;

		::-webkit-scrollbar {
			-webkit-appearance: none;
			width: 7px;
		}

		::-webkit-scrollbar-thumb {
			border-radius: 4px;
			background-color: rgba(0, 0, 0, 0.5);
		}

		::-webkit-scrollbar-track {
			margin: ${({ theme }) => `
				${theme.spacing.small} 0
				${theme.spacing.medium}
			`};
		}
	}

	&.last-updated-cell {
		align-items: center;
		display: flex;
		gap: 0.5rem;
		//flex-direction: column;

		.add-button {
			align-items: center;
			display: none;
			margin: 0;
			svg {
				margin: 0;
			}
		}
	}

	&.last-updated-cell:hover {
		.add-button {
			display: flex;
			svg {
				margin: 0;
			}
		}
	}

	@media screen and (max-width: ${({ theme }) => theme.screenWidth.laptopAndDesktop}) {
		&.last-updated-cell {
			display: block;
		}
	}

	@media screen and (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		display: block;

		&::before {
			content: attr(data-cell) ": ";
		}

		&.last-updated-cell {
			align-items: flex-start;
		}
	}
`

export default SalaryTable
