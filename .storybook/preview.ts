import { withThemeFromJSXProvider } from "@storybook/addon-styling"
import { ThemeProvider } from "styled-components"
import theme from "../src/styles/theme"
import GlobalStyles from "../src/styles/global-styles.js"
// import GlobalStyles from "../src/styles/global-styles.js"

export const decorators = [
	withThemeFromJSXProvider({
		themes: { theme },
		Provider: ThemeProvider,
		GlobalStyles
	})
]

const preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		},
		decorators
	}
}

export default preview
