import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Salaries from "./pages/Salaries"
import SalaryInfo from "./pages/SalaryInfo"
import ErrorPage from "./pages/ErrorPage"

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/salaries" element={<Salaries />} />
					<Route path="/salaries/:id" element={<SalaryInfo />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
