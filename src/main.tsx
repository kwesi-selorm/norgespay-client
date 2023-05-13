import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { ThemeProvider } from "styled-components"
import theme from "./styles/theme"
import GlobalStyles from "./styles/global-styles.ts"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home.tsx"
import Salaries from "./pages/Salaries.tsx"
import SalaryInfo from "./pages/SalaryInfo.tsx"
import ErrorPage from "./pages/ErrorPage.tsx"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		children: [
			{
				path: "/salaries",
				element: <Salaries />,
				children: [
					{
						path: "/:id",
						element: <SalaryInfo />
					}
				]
			}
		]
	},
	{
		path: "/*",
		element: <ErrorPage />
	}
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<RouterProvider router={router} />
			<App />
			<GlobalStyles />
		</ThemeProvider>
	</React.StrictMode>
)
