
export type Contact = {
	id?: string,
	finished: boolean,
	finishedAt?: Date,
	rescheduled: boolean
	rescheduledAt?: Date,
	scheduled?: Date,
	response?: string,
	lastResponse?: string,
	observation?: string
	userId?: string,
	clientId?: string
}