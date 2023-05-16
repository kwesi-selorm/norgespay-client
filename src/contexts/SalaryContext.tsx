import React, { createContext, useMemo, useState } from "react"

interface ISalaryContext {
	secondarySalaryId: string | null
	setSecondarySalaryId: (id: string | null) => void
}

const InitialSalaryContextState = {
	secondarySalaryId: null,
	setSecondarySalaryId: (id: string | null) => {
		console.log("Setting secondary salary id to", id)
	}
}

export const SalaryContext = createContext<ISalaryContext>(
	InitialSalaryContextState
)

const SalaryContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [secondarySalaryId, setSecondarySalaryId] = useState<string | null>(
		null
	)

	const value = useMemo(
		() => ({ secondarySalaryId, setSecondarySalaryId }),
		[secondarySalaryId]
	)

	return (
		<SalaryContext.Provider value={value}>{children}</SalaryContext.Provider>
	)
}

export default SalaryContextProvider
