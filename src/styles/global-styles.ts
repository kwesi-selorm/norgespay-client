import { createGlobalStyle } from "styled-components"
import AgrandirRegular from "../assets/fonts/Agrandir/PPAgrandir-Regular.otf"

const GlobalStyles = createGlobalStyle`
	@font-face {
		font-family: "Agrandir";
		src: url(${AgrandirRegular}) format("opentype");
	}
	
	html{
		font-family: "Agrandir",sans-serif;
	}
`

export default GlobalStyles
