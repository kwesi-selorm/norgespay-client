import { Link } from "react-router-dom"
import BackLink from "./BackLink.tsx"
const BackButton = () => {
	return (
		<Link to="/">
			<BackLink />
		</Link>
	)
}

export default BackButton
