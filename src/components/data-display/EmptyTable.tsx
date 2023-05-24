import styled from "styled-components"
import theme from "../../styles/theme"
import React from "react"

const EmptyTable = ({ className, children }: { className?: string; children: React.ReactNode }) => {
	return <StyledTable className={className}>{children}</StyledTable>
}

const StyledTable = styled.table`
	* {
		font-family: Agrandir, sans-serif;
	}
	background: ${theme.appColors.blue};
	border-collapse: collapse;
	color: ${theme.appColors.white};
	margin-inline: auto;
	overflow-x: auto;
	padding: 0 0 2rem;
	table-layout: fixed;
	text-align: left;
	width: 85%;

	td {
		line-height: 1.5rem;
		padding: ${`${theme.spacing.small} ${theme.spacing.medium}`};
	}
	th {
		padding: ${theme.spacing.medium};
	}
`

export default EmptyTable
