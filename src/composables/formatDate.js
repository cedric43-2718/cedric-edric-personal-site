export function formatDate(dateString) {
	if (!dateString) {
		return 'Date unavailable'
	}

	const date = new Date(dateString)

	if (Number.isNaN(date.getTime())) {
		return 'Date unavailable'
	}

	const options = {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
		timeZone: 'UTC'
	}

	return new Intl.DateTimeFormat('en-us', options).format(date)
}