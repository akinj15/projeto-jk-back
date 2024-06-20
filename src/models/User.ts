import { Contact, Client, Order} from "./"

export type User = {
	id?: string,
	userName: string,
	email: string,
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

export type UserUpdateInput = {
	id: string,
	userName?: string,
	email?: string,
	token?: string,
	firstName?: string,
	lastName?: string,
	password?: string,
	surName?: string,
	roleId?: string,
	orders?: Order[],
	clients?: Client[],
	contacts?: Contact[],
}


