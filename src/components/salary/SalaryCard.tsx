import styled from "styled-components"
import EmptyTable from "../data-display/EmptyTable"
import theme from "../../styles/theme"
import { useNavigate } from "react-router-dom"
import { MainSalary } from "../../@types/types"
import { parseToLocaleDate } from "../../helpers/type-helper"
import { Tooltip } from "antd"
import { EditIcon, MoreArrow } from "../../assets/icons"
import { useContext, useState } from "react"
import { SalaryContext } from "../../contexts/SalaryContext"
import UpdateMainSalaryModal from "../modals/UpdateMainSalaryModal"

type Props = {
	displayFormat: string
	salary: MainSalary
}

const SalaryCard = ({ displayFormat, salary }: Props) => {
	const navigate = useNavigate()
	const { setSelectedEntry } = useContext(SalaryContext)
	const [updateModalOpen, setUpdateModalOpen] = useState(false)

	function navigateToSalaryInfo() {
		navigate(`/salaries/${salary._id}`)
	}

	function handleEditButtonClick() {
		setSelectedEntry(salary)
		setUpdateModalOpen(true)
	}

	return displayFormat === "grid" ? (
		<Wrapper title="Select for more info" displayFormat={displayFormat}>
			<UpdateMainSalaryModal
				modalOpen={updateModalOpen}
				setModalOpen={setUpdateModalOpen}
			/>

			<h2>{salary.jobTitle}</h2>
			<h4>{salary.city}</h4>
			<p>Last updated: {parseToLocaleDate(salary.lastModified)}</p>
			<div className="icons-row">
				<Tooltip title="Edit salary entry">
					<EditIcon className="edit-icon" onClick={handleEditButtonClick} />
				</Tooltip>
				<Tooltip title="More salary information">
					<MoreArrow className="more-icon" onClick={navigateToSalaryInfo} />
				</Tooltip>
			</div>
		</Wrapper>
	) : (
		<TableWrapper>
			<UpdateMainSalaryModal
				modalOpen={updateModalOpen}
				setModalOpen={setUpdateModalOpen}
			/>
			<EmptyTable className="salary-card-item">
				<StyledTbody>
					<StyledTr>
						<StyledTd className="job-title-cell">
							{salary.jobTitle}{" "}
							<div className="icons-row">
								<Tooltip title="Edit salary entry">
									<EditIcon
										className="edit-icon"
										onClick={handleEditButtonClick}
									/>
								</Tooltip>
								<Tooltip title="More salary information">
									<MoreArrow
										className="more-icon"
										onClick={navigateToSalaryInfo}
									/>
								</Tooltip>
							</div>
						</StyledTd>
						<StyledTd>{salary.city}</StyledTd>
						<StyledTd className="last-updated">{`Last updated: ${parseToLocaleDate(
							salary.lastModified
						)}`}</StyledTd>
					</StyledTr>
				</StyledTbody>
			</EmptyTable>
		</TableWrapper>
	)
}

export default SalaryCard

const Wrapper = styled.article<{ displayFormat: string }>`
	background: ${({ theme }) => theme.appColors.blue};
	border-radius: ${({ theme }) => theme.borderRadius.extraLarge};
	box-shadow: rgba(0, 0, 0, 0.3) 0 19px 38px, rgba(0, 0, 0, 0.22) 0 15px 12px;
	color: ${({ theme }) => theme.appColors.white};
	font-family: "Agrandir", sans-serif;
	margin-inline: auto;
	min-width: min(350px, fit-content);
	padding: 1rem 3.5rem 0.5rem;
	text-align: center;
	transition: transform 0.3s ease-in-out;

	.job-title-cell {
		font-family: "Agrandir Heavy", sans-serif;
	}

	.icons-row {
		align-items: center;
		display: flex;
		gap: 0.8rem;
		justify-content: center;

		.edit-icon,
		.more-icon {
			display: none;
			font-size: 25px;
		}

		.edit-icon {
			transition: transform 0.3ms ease-out;
		}

		.more-icon {
			fill: ${({ theme }) => theme.appColors.white};
			path {
				fill: ${({ theme }) => theme.appColors.white};
			}
		}
	}

	h2,
	h4,
	p {
		margin: 0.5rem;
	}

	h2 {
		font-family: "Agrandir Heavy", sans-serif;
		font-size: 1.3rem;
	}
	h4 {
		font-family: "Agrandir Bold", sans-serif;
		font-size: 1.1rem;
	}
	p {
		font-size: 0.8rem;
	}

	&:hover {
		background: ${theme.appColors.hoverBlue};
		cursor: pointer;
		transform: scale(1.05);

		.edit-icon,
		.more-icon {
			display: inline-block;
		}
	}

	@media (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		padding: 0.5rem 0.7rem 0.5rem;
		width: 100%;

		h2 {
			font-size: 0.8rem;
		}
		h4 {
			font-size: 0.6rem;
		}
		p {
			font-size: 0.5rem;
		}
		h2,
		h4,
		p {
			margin: 0.2rem;
		}
	}
`

const TableWrapper = styled.div`
	gap: 1rem;

	.salary-card-item {
		margin-bottom: 0.5rem;
	}

	@media (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		* {
			font-size: 1rem;
		}
		margin-inline: auto;
		.salary-card-item {
			width: 100%;

			.last-updated {
				display: none;
			}
		}
	}
`

const StyledTr = styled.tr`
	padding: ${theme.spacing.medium};
	transition: transform 0.3s ease-out;

	&:hover {
		background: ${theme.appColors.hoverBlue};
		transform: scale(1.05);

		.job-title-cell {
			.icons-row {
				.edit-icon,
				.more-icon {
					display: inline-block;
				}
			}
		}
	}
`
const StyledTd = styled.td`
	&.job-title-cell {
		align-items: center;
		display: flex;
		font-family: "Agrandir Heavy", sans-serif;
		gap: 1rem;

		.icons-row {
			display: flex;
			gap: 0.6rem;

			.edit-icon,
			.more-icon {
				display: none;
			}
			.edit-icon:hover,
			.more-icon:hover {
				cursor: pointer;
			}
		}
	}
`

const StyledTbody = styled.tbody``
