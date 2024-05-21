import { Contact, Client, Order} from "./"

export type User = {
	id?: string,
	userName: String,
	email: String,
	token?: string,
	password: string,
	firstName: string,
	lastName: string,
	surName?: string,
	roleId?: string,
	orders?: Order[],
	clients?: Client[],
	contacts?: Contact[],
}


