import { execute } from "@/lib/mariadb.ado";

export async function createCustomer(customer: {
    firstName: string;
    lastName: string;
    email: string;
    companyName?: string;
}): Promise<number> {
    const sql = `
      INSERT INTO Customer (FirstName, LastName, Email, CompanyName)
      VALUES (?, ?, ?, ?)
    `;
    const params = [
        customer.firstName,
        customer.lastName,
        customer.email,
        customer.companyName ?? null,
    ];
    const result: any = await execute(sql, params);
    return result.insertId;
}
