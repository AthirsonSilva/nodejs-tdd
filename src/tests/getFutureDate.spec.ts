import { expect, test } from 'vitest'
import { getFutureDate } from '../utils/getFutureDate.js'

test('increases date by one year', (): void => {
	const year = new Date().getFullYear()
	const days = 2

	expect(getFutureDate(`${year}-08-10`, days).getFullYear()).toEqual(
		new Date().getFullYear() + days
	)
})
