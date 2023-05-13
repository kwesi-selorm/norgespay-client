import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home.tsx"
import Salaries from "./pages/Salaries.tsx"
import SalaryInfo from "./pages/SalaryInfo.tsx"
import ErrorPage from "./pages/ErrorPage.tsx"

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/salaries" element={<Salaries />}>
						<Route path="/salaries/:id" element={<SalaryInfo />} />
					</Route>
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
