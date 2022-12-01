import { describe, expect, it } from 'vitest'
import { Appointment } from '../entities/Appointment.js'
import { CreateAppointment } from '../services/createAppointment.js'
import { getFutureDate } from '../utils/getFutureDate.js'
import { InMemoryAppointmentsRepository } from './../repositories/inMemory/inMemoryAppointmentRepository.js'

describe('Create appointment', (): void => {
	it('should be able to create an appointment', (): void => {
		const appointmentsRepository = new InMemoryAppointmentsRepository()
		const systemUnderTest = new CreateAppointment(appointmentsRepository)
		const startsAt = getFutureDate('2021-08-10', 2)
		const endsAt = getFutureDate('2021-08-10', 5)

		endsAt.setDate(endsAt.getDate() + 5)

		expect(
			systemUnderTest.execute({
				customer: 'John Doe',
				startsAt: startsAt,
				endsAt: endsAt
			})
		).resolves.toBeInstanceOf(Appointment)
	})
})
