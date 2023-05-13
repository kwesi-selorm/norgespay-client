import "./App.css"
import SalaryCard from "./components/SalaryCard.tsx"

function App() {
	return (
		<>
			<h1>App</h1>
			<SalaryCard jobTitle={"Seller"} city={"Oslo"} lastModified={"Today"} />
		</>
	)
}

export default App
