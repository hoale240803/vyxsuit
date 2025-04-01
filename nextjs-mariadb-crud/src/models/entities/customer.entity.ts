export class CustomerEntity {
    Id!: number;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        companyName: string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.companyName = companyName;
    }
}
