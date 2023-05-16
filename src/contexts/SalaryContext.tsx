import React, { createContext, useMemo, useState } from "react"
import { MainSalary } from "../@types/types.ts"

interface ISalaryContext {
	selectedMainSalary: MainSalary | null
	setSelectedMainSalary: (salary: MainSalary | null) => void
	secondarySalaryId: string | null
	setSecondarySalaryId: (id: string | null) => void
}

const InitialSalaryContextState = {
	selectedMainSalary: null,
	setSelectedMainSalary: (salary: MainSalary | null) => {
		console.log(salary)
	},
	secondarySalaryId: null,
	setSecondarySalaryId: (id: string | null) => {
		console.log(id)
	}
}

export const SalaryContext = createContext<ISalaryContext>(
	InitialSalaryContextState
)

const SalaryContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [selectedMainSalary, setSelectedMainSalary] =
		useState<MainSalary | null>(null)
	const [secondarySalaryId, setSecondarySalaryId] = useState<string | null>(
		null
	)

	const value = useMemo(
		() => ({
			selectedMainSalary,
			setSelectedMainSalary,
			secondarySalaryId,
			setSecondarySalaryId
		}),
		[selectedMainSalary, secondarySalaryId]
	)

	return (
		<SalaryContext.Provider value={value}>{children}</SalaryContext.Provider>
	)
}

export default SalaryContextProvider
