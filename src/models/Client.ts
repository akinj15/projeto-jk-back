import { Products, Order, Contact} from "./"

export type Client = {
	id?: string,
	createdAt?: Date,
	updatedAt?: Date,
	published: boolean,
	authorId: string,
	observation: string,
	interest: Products[],
	orders: Order[],
	contacts: Contact[],
	name: String,
	fone: String,
	realtorId: String
}