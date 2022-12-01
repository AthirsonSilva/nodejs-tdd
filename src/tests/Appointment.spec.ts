import { expect, test } from 'vitest'
import { CreateAppointment } from '../services/createAppointment.js'
import { getFutureDate } from '../utils/getFutureDate.js'
import { Appointment } from './../entities/Appointment.js'
import { InMemoryAppointmentsRepository } from './../repositories/inMemory/inMemoryAppointmentRepository'

test('create an appointment', (): void => {
	const startsAt = getFutureDate('2021-08-10', 2)
	const endsAt = getFutureDate('2021-08-10', 5)

	startsAt.setDate(startsAt.getDate() + 5)
	endsAt.setDate(startsAt.getDate() + 2)

	const appointment = new Appointment({
		customer: 'John Doe',
		startsAt: startsAt,
		endsAt: endsAt
	})

	expect(appointment).toBeInstanceOf(Appointment)
	expect(appointment.getCustomer).toBe('John Doe')
})

test('cannot create an appointment with end date before start date', (): void => {
	const startDate = getFutureDate(`${new Date().getFullYear()}-08-10`, 2)
	const endDate = getFutureDate(`${new Date().getFullYear()}-08-10`, 1)

	startDate.setDate(startDate.getDate() + 1)
	endDate.setDate(endDate.getDate() - 1)

	expect((): Appointment => {
		return new Appointment({
			customer: 'John Doe',
			startsAt: startDate,
			endsAt: endDate
		})
	}).toThrow()
})

test('cannot create an appointment with end date equals start date', (): void => {
	const startDate = getFutureDate(`${new Date().getFullYear()}-08-10`, 2)
	const endDate = getFutureDate(`${new Date().getFullYear()}-08-10`, 1)

	startDate.setDate(startDate.getDate() + 1)
	endDate.setDate(endDate.getDate() + 1)

	expect((): Appointment => {
		return new Appointment({
			customer: 'John Doe',
			startsAt: startDate,
			endsAt: endDate
		})
	}).toThrow()
})

test('cannot create an appointment with end date before today', (): void => {
	const startDate = getFutureDate(`${new Date().getFullYear()}-08-10`, 2)
	const endDate = getFutureDate(`${new Date().getFullYear()}-08-10`, 1)

	startDate.setDate(startDate.getDate() - 1)
	endDate.setDate(endDate.getDate() - 1)

	expect((): Appointment => {
		return new Appointment({
			customer: 'John Doe',
			startsAt: startDate,
			endsAt: endDate
		})
	}).toThrow()
})

test('cannot create an appointment with start date before today', (): void => {
	const startDate = getFutureDate(`${new Date().getFullYear()}-08-10`, 2)
	const endDate = getFutureDate(`${new Date().getFullYear()}-08-10`, 1)

	startDate.setDate(startDate.getDate() - 1)
	endDate.setDate(endDate.getDate() + 1)

	expect((): Appointment => {
		return new Appointment({
			customer: 'John Doe',
			startsAt: startDate,
			endsAt: endDate
		})
	}).toThrow()
})

test('cannot create an appointment with overlapping dates', async (): Promise<void> => {
	const startDate = getFutureDate(`${new Date().getFullYear()}-08-10`, 2)
	const endDate = getFutureDate(`${new Date().getFullYear()}-08-10`, 5)

	const createAppointment = new CreateAppointment(
		new InMemoryAppointmentsRepository()
	)

	await createAppointment.execute({
		customer: 'John Doe',
		startsAt: startDate,
		endsAt: endDate
	})

	// Starts and ends in the middle of the first appointment
	expect(
		createAppointment.execute({
			customer: 'John Doe',
			startsAt: getFutureDate(`${new Date().getFullYear()}-08-10`, 3),
			endsAt: getFutureDate(`${new Date().getFullYear()}-08-10`, 4)
		})
	).rejects.toBeInstanceOf(Error)

	// Starts before and ends in the middle of the first appointment
	expect(
		createAppointment.execute({
			customer: 'John Doe',
			startsAt: getFutureDate(`${new Date().getFullYear()}-08-10`, 1),
			endsAt: getFutureDate(`${new Date().getFullYear()}-08-10`, 3)
		})
	).rejects.toBeInstanceOf(Error)

	// Starts before and ends after the first appointment
	expect(
		createAppointment.execute({
			customer: 'John Doe',
			startsAt: getFutureDate(`${new Date().getFullYear()}-08-10`, 1),
			endsAt: getFutureDate(`${new Date().getFullYear()}-08-10`, 6)
		})
	).rejects.toBeInstanceOf(Error)
})
