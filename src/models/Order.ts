import { Products } from "./";

export type Order = {
	id?: string,
	createdAt?: Date,
	updatedAt?: Date,
	published: boolean,
	authorId: string,
	products: Products[]
}
