// import "source-map-support/register"
import styled from "styled-components"
import React, { useEffect, useMemo, useState } from "react"
import LoadingIcon from "../components/LoadingIcon"
import Button from "../components/Button"
import { IoMdAdd } from "react-icons/io"
import { useQuery } from "@tanstack/react-query"
import { MainSalary } from "../@types/types"
import SalaryList from "../components/salary/SalaryList"
import CreateSalaryEntryModal from "../components/modals/CreateSalaryEntryModal"
import ControlsBar from "../components/ControlsBar"
import Layout from "../components/layout/Layout"
import ErrorPage from "./ErrorPage"
import useSalaryAPI from "../hooks/api/useSalaryAPI"

const Salaries = () => {
	const [displayFormat, setDisplayFormat] = useState("grid")
	const [filter, setFilter] = React.useState("")
	const [filteredSalaries, setFilteredSalaries] = useState<MainSalary[]>([])
	const [modalOpen, setModalOpen] = useState(false)
	const [sort, setSort] = React.useState("")
	const [displayData, setDisplayData] = useState<MainSalary[]>([])
	const { getSalaries } = useSalaryAPI()

	const { data, error, isLoading, isError } = useQuery<
		MainSalary[] | undefined
	>(["salaries", "all"], getSalaries, {
		refetchOnWindowFocus: false,
		retry: 2
	})

	const salaries = useMemo(() => (data !== undefined ? data : []), [data])

	useEffect(() => {
		if (filter === "") {
			setDisplayData(salaries)
		} else {
			setDisplayData(filteredSalaries)
		}
	}, [filter, filteredSalaries, salaries])

	// Filtering effect
	useEffect(() => {
		setFilteredSalaries(
			salaries.filter((salary) =>
				salary.jobTitle.toLowerCase().includes(filter.toLowerCase())
			)
		)
	}, [filter, salaries])

	// Sorting effect
	function sortSalaries() {
		return [...displayData].sort((a, b) => {
			if (sort === "asc") {
				return a.jobTitle < b.jobTitle ? -1 : 1
			}
			if (sort === "desc") {
				return a.jobTitle < b.jobTitle ? 1 : -1
			}
			return 0
		})
	}

	useEffect(() => {
		setDisplayData(sortSalaries())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sort])

	if (isLoading) {
		return <LoadingIcon />
	}
	if (isError) {
		return <ErrorPage error={error} />
	}

	return (
		<Layout>
			<Wrapper>
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
				<SalaryList salaries={displayData} displayFormat={displayFormat} />
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
