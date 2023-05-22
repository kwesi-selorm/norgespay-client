import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Salaries from "./pages/Salaries"
import SalaryInfo from "./pages/SalaryInfo"
import ErrorPage from "./pages/ErrorPage"
import Login from "./pages/Login"

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/salaries" element={<Salaries />} />
					<Route path="/salaries/:id" element={<SalaryInfo />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
