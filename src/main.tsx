import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { ThemeProvider } from "styled-components"
import theme from "./styles/theme"
import GlobalStyles from "./styles/global-styles.ts"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home.tsx"
import SalaryList from "./pages/SalaryList.tsx"
import SalaryCardDetails from "./pages/SalaryCardDetails.tsx"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		children: [
			{
				path: "/salaries",
				element: <SalaryList />,
				children: [
					{
						path: "/:id",
						element: <SalaryCardDetails />
					}
				]
			}
		]
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
