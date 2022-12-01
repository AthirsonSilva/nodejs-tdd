import { AppointmentProps } from '../interfaces/Appointment.js'

export class Appointment implements AppointmentProps {
	customer: string
	startsAt: Date
	endsAt: Date
	private props: AppointmentProps

	get getCustomer(): string {
		return this.props.customer
	}

	set setCustomer(customer: string) {
		if (customer.length > 3) {
			this.props.customer = customer
		} else
			throw new Error('Customer name must be at least 3 characters long')
	}

	get getStartsAt(): Date {
		return this.props.startsAt
	}

	set setStartsAt(startsAt: Date) {
		if (startsAt.getTime() > Date.now()) {
			this.props.startsAt = startsAt
		} else throw new Error('Start date must be in the future')
	}

	get getEndsAt(): Date {
		if (this.props.endsAt.getTime() > this.props.startsAt.getTime()) {
			return this.props.endsAt
		} else throw new Error('End date must be after start date')
	}

	set setEndsAt(endsAt: Date) {
		if (endsAt.getTime() > this.props.startsAt.getTime()) {
			this.props.endsAt = endsAt
		} else throw new Error('End date must be after start date')
	}

	constructor(props: AppointmentProps) {
		const { customer, startsAt, endsAt } = props

		if (endsAt <= startsAt) {
			throw new Error('End date must be after start date')
		} else if (startsAt <= new Date()) {
			throw new Error('Start date must be in the future')
		} else if (customer.length <= 3) {
			throw new Error('Customer name must be at least 3 characters long')
		}

		this.props = props
	}
}
