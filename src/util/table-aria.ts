function addTableARIA() {
	try {
		const allTables = document.querySelectorAll("table")
		for (const element of allTables) {
			element.setAttribute("role", "table")
		}
		const allCaptions = document.querySelectorAll("caption")
		for (const element of allCaptions) {
			element.setAttribute("role", "caption")
		}
		const allRowGroups = document.querySelectorAll("thead, tbody, tfoot")
		for (const element of allRowGroups) {
			element.setAttribute("role", "rowgroup")
		}
		const allRows = document.querySelectorAll("tr")
		for (const element of allRows) {
			element.setAttribute("role", "row")
		}
		const allCells = document.querySelectorAll("td")
		for (const element of allCells) {
			element.setAttribute("role", "cell")
		}
		const allHeaders = document.querySelectorAll("th")
		for (const element of allHeaders) {
			element.setAttribute("role", "columnheader")
		}
		// this accounts for scoped row headers
		const allRowHeaders = document.querySelectorAll("th[scope=row]")
		for (const element of allRowHeaders) {
			element.setAttribute("role", "rowheader")
		}
	} catch (e) {
		console.log("addTableARIA(): " + e)
	}
}

export default addTableARIA
