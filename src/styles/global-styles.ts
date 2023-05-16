import { createGlobalStyle } from "styled-components"
import AgrandirRegular from "../assets/fonts/Agrandir/Agrandir-Regular.otf"
import AgrandirBold from "../assets/fonts/Agrandir/Agrandir-TextBold.otf"
import AgrandirHeavy from "../assets/fonts/Agrandir/Agrandir-GrandHeavy.otf"
import theme from "./theme.ts"

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

	.success-message .ant-message-notice-content {
    border: 1px solid #28a745;
	}
  .success-message .ant-message-custom-content {
    align-items: center;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }
  .success-message .ant-message-custom-content svg {
    stroke: #28a745;
		stroke-width: 3px;
  }

  .info-message .ant-message-notice-content {
    border: 1px solid #17a2b8;
  }
  .info-message .ant-message-custom-content {
    align-items: center;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }
  .info-message .ant-message-custom-content svg {
    stroke: #17a2b8;
    stroke-width: 3px;
  }

	.error-message .ant-message-notice-content {
    border: 1px solid #dc3545;
  }
  .error-message .ant-message-custom-content {
    align-items: center;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }
	.error-message .ant-message-custom-content svg {
    stroke: #dc3545;
    stroke-width: 3px;
  }
	
	//MODAL BUTTONS
	.buttons-row {
		display: flex;
		gap: 0.5rem;
		justify-content: right;
		align-items: center;
		margin-bottom: 20px;
	}

	.submit-button,
	.cancel-button {
		font-family: Agrandir, sans-serif;
	}

	.submit-button {
		background-color: ${theme.appColors.green};
		color: ${theme.appColors.white};
	}
	.submit-button:hover {
		background-color: ${theme.appColors.hoverGreen};
		color: ${theme.appColors.white};
	}
	.submit-button:disabled {
		background-color: ${theme.colors.secondary};
		color: ${theme.appColors.white};
	}

	.cancel-button {
		background-color: ${theme.appColors.red};
		color: ${theme.appColors.white};
	}
	.cancel-button:hover {
		background-color: ${theme.appColors.hoverRed};
		border-color: ${theme.appColors.hoverRed};
		color: ${theme.appColors.white};
	}
`

export default GlobalStyles
