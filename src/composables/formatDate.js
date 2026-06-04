export function formatDate(dateString) {

	const date = new Date(dateString)
	console.log(date)

	const options = { 
		month: 'short', 
		day: '2-digit', 
		year: 'numeric',
		timeZone: 'UTC' 
	}

	const formatedDate = new Intl.DateTimeFormat('en-us', options).format(date)

	return formatedDate
}