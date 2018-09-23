import format from 'date-fns/format';

export function getDayfromDate(date) {
	return date.getDay();
}

export function getTimeFromDate(date) {
	const result = format(new Date(date), 'hh:mm A');
	return result;
}

export function getDateMonthYear(date) {
	const result = format(new Date(date), 'D MMM YYYY');
	return result;
}
