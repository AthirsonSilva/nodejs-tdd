import { Appointment } from '../entities/Appointment.js'
import { AppointmentsRepository } from './../repositories/AppointmentRepository.js'

interface CreateAppointmentRequest {
	customer: string
	startsAt: Date
	endsAt: Date
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment {
	constructor(private appointmentsRepository: AppointmentsRepository) {}

	async execute({
		customer,
		startsAt,
		endsAt
	}: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
		const overlappingAppointment =
			await this.appointmentsRepository.findOverlappingAppointments(
				startsAt,
				endsAt
			)

		if (overlappingAppointment) {
			throw new Error('This appointment date is already booked')
		}

		const appointment = new Appointment({
			customer,
			startsAt,
			endsAt
		})

		await this.appointmentsRepository.create(appointment)

		return appointment
	}
}
