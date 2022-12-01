import { areIntervalsOverlapping } from 'date-fns'
import { Appointment } from '../../entities/Appointment.js'
import { AppointmentsRepository } from './../AppointmentRepository.js'

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
	public items: Appointment[] = new Array()

	create(appointment: Appointment): Promise<void> {
		this.items.push(appointment)

		return new Promise((resolve) => resolve())
	}

	save(appointment: Appointment): Promise<void> {
		throw new Error('Method not implemented.')
	}
	delete(appointment: Appointment): Promise<void> {
		throw new Error('Method not implemented.')
	}
	find(customer: string): Promise<Appointment> {
		throw new Error('Method not implemented.')
	}
	findAll(): Promise<Appointment[]> {
		throw new Error('Method not implemented.')
	}
	findByDate(date: Date): Promise<Appointment> {
		throw new Error('Method not implemented.')
	}

	findOverlappingAppointments(
		startsAt: Date,
		endsAt: Date
	): Promise<Appointment | null> {
		const overlappingAppointment = this.items.find(
			(appointment: Appointment) => {
				return areIntervalsOverlapping(
					{ start: startsAt, end: endsAt },
					{ start: appointment.startsAt, end: appointment.endsAt },
					{ inclusive: true }
				)
			}
		)

		if (!overlappingAppointment) return null

		return new Promise((resolve) => resolve(overlappingAppointment))
	}
}
