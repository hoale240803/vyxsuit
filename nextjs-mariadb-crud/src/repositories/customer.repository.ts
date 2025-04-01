import { execute } from "@/lib/mariadb.ado";
import { CustomerEntity } from "@/models/entities/customer.entity";

export interface ICustomerRepository {
    createCustomerAsync(entity: CustomerEntity): Promise<number>;
}
export class CustomerRepository implements ICustomerRepository {
    async createCustomerAsync(entity: CustomerEntity): Promise<number> {
        const sql = `INSERT INTO Customer(firstName, lastName, email, companyName) VALUES
        (?, ?, ?, ?);`;

        const params = [
            entity.firstName,
            entity.lastName,
            entity.email,
            entity.companyName,
        ];

        debugger;
        const c: any = await execute(sql, params);

        return c.insertId;
    }
}
