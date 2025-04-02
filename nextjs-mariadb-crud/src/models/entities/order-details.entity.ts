import { SuitStyleEnum, SuitTypeEnum } from "../enum";

export class OrderDetailsEntity {
    orderId: number;
    productId: number;
    price: number;
    quantity: number;
    suitType: SuitTypeEnum;
    tailoredFit: SuitStyleEnum;

    constructor(
        OrderId: number,
        ProductId: number,
        Price: number,
        Quantity: number,
        SuitType: SuitTypeEnum,
        TailoredFit: SuitStyleEnum
    ) {
        this.orderId = OrderId;
        this.productId = ProductId;
        this.price = Price;
        this.quantity = Quantity;
        this.suitType = SuitType;
        this.tailoredFit = TailoredFit;
    }
}
