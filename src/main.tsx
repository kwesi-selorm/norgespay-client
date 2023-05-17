import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { ThemeProvider } from "styled-components"
import theme from "./styles/theme"
import GlobalStyles from "./styles/global-styles"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ModalContextProvider from "./contexts/ModalContext"
import SalaryContextProvider from "./contexts/SalaryContext"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ModalContextProvider>
			<SalaryContextProvider>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider theme={theme}>
						<App />
						<GlobalStyles />
					</ThemeProvider>
				</QueryClientProvider>
			</SalaryContextProvider>
		</ModalContextProvider>
	</React.StrictMode>
)
