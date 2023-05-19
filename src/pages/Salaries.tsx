// import "source-map-support/register"
import styled from "styled-components"
import React, { useEffect, useMemo, useState } from "react"
import LoadingIcon from "../components/LoadingIcon"
import Button from "../components/Button"
import { IoMdAdd } from "react-icons/io"
import { useQuery } from "@tanstack/react-query"
import { getSalaries } from "../api/salaries-api"
import useErrorHandler from "../hooks/useErrorHandler"
import { MainSalary } from "../@types/types"
import SalaryList from "../components/salary/SalaryList"
import CreateSalaryEntryModal from "../components/modals/CreateSalaryEntryModal"
import ControlsBar from "../components/ControlsBar"
import Layout from "../components/layout/Layout"

const Salaries = () => {
	const [displayFormat, setDisplayFormat] = useState("grid")
	const [filter, setFilter] = React.useState("")
	const [filteredSalaries, setFilteredSalaries] = useState<MainSalary[]>([])
	const [modalOpen, setModalOpen] = useState(false)
	const [sort, setSort] = React.useState("")

	const { data, error, isLoading, isError } = useQuery<
		MainSalary[] | undefined
	>(["salaries", "all"], getSalaries, {
		refetchOnWindowFocus: false,
		retry: 2
	})
	const { handleError, contextHolder } = useErrorHandler()

	const salaries = useMemo(() => (data !== undefined ? data : []), [data])

	useEffect(() => {
		setFilteredSalaries(
			salaries.filter((salary) =>
				salary.jobTitle.toLowerCase().includes(filter.toLowerCase())
			)
		)
	}, [filter, salaries])

	useEffect(() => {
		setFilteredSalaries(
			salaries.sort((a, b) => {
				if (sort === "asc") {
					return a.jobTitle.localeCompare(b.jobTitle)
				} else {
					return b.jobTitle.localeCompare(a.jobTitle)
				}
			})
		)
	}, [sort])

	if (isLoading) {
		return <LoadingIcon />
	}
	if (isError) {
		handleError(error)
		return null
	}

	return (
		<Layout>
			<Wrapper>
				{contextHolder}
				<CreateSalaryEntryModal
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					title="Add new salary entry"
				/>
				<ControlsBar
					filter={filter}
					setDisplayFormat={setDisplayFormat}
					setFilter={setFilter}
					setSort={setSort}
				/>
				<SalaryList
					salaries={filter === "" ? salaries : filteredSalaries}
					displayFormat={displayFormat}
				/>
				<Button
					addButton={true}
					className="add-button"
					icon={<IoMdAdd />}
					innerText="Add new"
					onClick={() => setModalOpen(true)}
					type="button"
				/>
			</Wrapper>
		</Layout>
	)
}

const Wrapper = styled.div`
	margin-inline: 20px;
	margin-top: 5%;
	padding-bottom: 10%;
	text-align: left;

	.add-button {
		border-radius: ${({ theme }) => theme.borderRadius.large};
		margin-inline: auto;
		margin-top: 3%;
	}
`

export default Salaries
