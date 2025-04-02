import mariadbHelper from "@/lib/mariadb.ado";
import { CustomerEntity } from "@/models/entities/customer.entity";

export interface ICustomerRepository {
    createCustomerAsync(entity: CustomerEntity): Promise<number>;
}

export class CustomerRepository implements ICustomerRepository {
    async createCustomerAsync(entity: CustomerEntity): Promise<number> {
        return await mariadbHelper.insert("customer", entity);
    }
}
