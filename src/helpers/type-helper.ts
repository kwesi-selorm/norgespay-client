import { DateTime } from "luxon"

function formatNumberToCurrency(value: number) {
	return Intl.NumberFormat("en-US").format(value)
}

function parseToLocaleDate(date: Date) {
	const dateString = date.toString()
	return DateTime.fromISO(dateString).toLocaleString(DateTime.DATE_SHORT)
}

export { formatNumberToCurrency, parseToLocaleDate }
