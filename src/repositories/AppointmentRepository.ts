import { Appointment } from './../entities/Appointment.js'

export interface AppointmentsRepository {
	create(appointment: Appointment): Promise<void>
	findOverlappingAppointments(
		startsAt: Date,
		endsAt: Date
	): Promise<Appointment | null>
	save(appointment: Appointment): Promise<void>
	delete(appointment: Appointment): Promise<void>
	find(customer: string): Promise<Appointment | undefined>
	findAll(): Promise<Appointment[] | undefined>
	findByDate(date: Date): Promise<Appointment | undefined>
}
