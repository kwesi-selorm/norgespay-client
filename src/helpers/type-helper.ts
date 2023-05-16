function formatNumberToCurrency(value: number) {
	return Intl.NumberFormat("en-US").format(value)
}

export { formatNumberToCurrency }
