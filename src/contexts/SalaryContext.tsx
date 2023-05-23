import React, { createContext, useMemo, useState } from "react"
import { MainSalary } from "../@types/types"

interface ISalaryContext {
	secondarySalaryId: string | null
	setSecondarySalaryId: (id: string | null) => void
	selectedEntry: MainSalary | null
	setSelectedEntry: (entry: MainSalary | null) => void
}

const InitialSalaryContextState = {
	secondarySalaryId: null,
	setSecondarySalaryId: (id: string | null) => {
		console.log(id)
	},
	selectedEntry: null,
	setSelectedEntry: (entry: MainSalary | null) => {
		console.log(entry)
	}
}

export const SalaryContext = createContext<ISalaryContext>(
	InitialSalaryContextState
)

const SalaryContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [secondarySalaryId, setSecondarySalaryId] = useState<string | null>(
		null
	)
	const [selectedEntry, setSelectedEntry] = useState<MainSalary | null>(null)

	const value = useMemo(
		() => ({
			secondarySalaryId,
			setSecondarySalaryId,
			selectedEntry,
			setSelectedEntry
		}),
		[secondarySalaryId, selectedEntry]
	)

	return (
		<SalaryContext.Provider value={value}>{children}</SalaryContext.Provider>
	)
}

export default SalaryContextProvider
