// import { MainSalary } from "../@types/types.ts"
import styled from "styled-components"
import React, { useContext, useEffect, useState } from "react"
import LoadingIcon from "../components/LoadingIcon.tsx"
import Button from "../components/Button.tsx"
import { IoMdAdd } from "react-icons/io"
import { useQuery } from "@tanstack/react-query"
import { getSalaries } from "../api/salaries-api.ts"
import useErrorHandler from "../hooks/useErrorHandler.tsx"
import { MainSalary } from "../@types/types.ts"
import SalaryList from "../components/salary/SalaryList.tsx"
import NewSalaryModal from "../components/modals/NewSalaryModal.tsx"
import { ModalContext } from "../contexts/ModalContext.tsx"
import ControlsBar from "../components/ControlsBar.tsx"
import BackButtonBar from "../components/BackButtonBar.tsx"

const Salaries = () => {
	const [displayFormat, setDisplayFormat] = useState("grid")
	const [filter, setFilter] = React.useState("")
	const [filteredSalaries, setFilteredSalaries] = useState<MainSalary[]>([])
	const { setModalOpen } = useContext(ModalContext)

	const { data, error, isLoading, isError } = useQuery<
		MainSalary[] | undefined
	>(["salaries, all"], getSalaries, {
		refetchOnWindowFocus: false,
		retry: 2
	})
	const { handleError, contextHolder } = useErrorHandler()

	const salaries = data !== undefined ? data : []
	useEffect(() => {
		setFilteredSalaries(
			salaries.filter((salary) =>
				salary.jobTitle.toLowerCase().includes(filter.toLowerCase())
			)
		)
	}, [filter])

	if (isLoading) {
		return <LoadingIcon />
	}
	if (isError) {
		handleError(error)
		return
	}

	return (
		<Wrapper>
			{contextHolder}
			<NewSalaryModal title="Add new salary entry" />
			<BackButtonBar />
			<ControlsBar
				filter={filter}
				setDisplayFormat={setDisplayFormat}
				setFilter={setFilter}
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
	)
}

const Wrapper = styled.div`
	margin-inline: 20px;
	margin-top: 5%;
	text-align: left;

	.add-button {
		border-radius: 50px;
		margin-inline: auto;
		margin-top: 10%;
	}
`

export default Salaries
