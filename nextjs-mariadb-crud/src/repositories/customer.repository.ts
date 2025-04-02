import mariadbHelper from "@/lib/mariadb.ado";
import { CustomerEntity } from "@/models/entities/customer.entity";

export interface ICustomerRepository {
    createCustomerAsync(entity: CustomerEntity): Promise<number>;
}
export class CustomerRepository implements ICustomerRepository {
    async createCustomerAsync(entity: CustomerEntity): Promise<number> {
        const params = [
            entity.firstName,
            entity.lastName,
            entity.email,
            entity.companyName,
        ];

        const c: any = await mariadbHelper.insert("customer", params);

        return c.insertId;
    }
}
