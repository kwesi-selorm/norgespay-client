import React, { createContext, useMemo, useState } from "react"

interface IModalContext {
	modalOpen: boolean
	setModalOpen: (modalOpen: boolean) => void
}

const InitialModalContextState = {
	modalOpen: false,
	setModalOpen: () => {
		console.log("Setting modal open state")
	}
}

export const ModalContext = createContext<IModalContext>(
	InitialModalContextState
)

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [modalOpen, setModalOpen] = useState(false)

	const value = useMemo(() => ({ modalOpen, setModalOpen }), [modalOpen])

	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export default ModalContextProvider
