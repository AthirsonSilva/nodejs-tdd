import { parseISO, setYear } from 'date-fns'

/*
 * Get a future date from a given date
 * @param {string} date - The date to get the future date from
 * @param {number} days - The number of days to add to the date
 * @returns {string} - The future date
 * @example
 * getFutureDate('2021-01-01', 5) // '2021-01-06'
 */

export const getFutureDate = (date: string, days: number): Date => {
	return setYear(parseISO(date), new Date().getFullYear() + days)
}
