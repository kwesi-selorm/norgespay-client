import { createGlobalStyle } from "styled-components"
import theme from "./theme"

const GlobalStyles = createGlobalStyle`
	* {
		//font-family: Commissioner, sans-serif;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif;
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
	.ant-input {
		*{
			font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif;;
		}
	}
`

export default GlobalStyles
