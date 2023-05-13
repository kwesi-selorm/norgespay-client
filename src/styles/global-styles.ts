import { createGlobalStyle } from "styled-components"
import AgrandirRegular from "../assets/fonts/Agrandir/PPAgrandir-Regular.otf"
import AgrandirBold from "../assets/fonts/Agrandir/PPAgrandirText-Bold.otf"
import AgrandirHeavy from "../assets/fonts/Agrandir/PPAgrandir-GrandHeavy.otf"

const GlobalStyles = createGlobalStyle`
	@font-face {
		font-family: "Agrandir";
		src: url(${AgrandirRegular}) format("opentype");
	}
	@font-face {
		font-family: "Agrandir Bold";
  src: url(${AgrandirBold}) format("opentype")
	}
	@font-face {
		font-family: "Agrandir Heavy";
		src: url(${AgrandirHeavy}) format("opentype")
	}
	
	html{
		font-family: "Agrandir",sans-serif;
	}
`

export default GlobalStyles
