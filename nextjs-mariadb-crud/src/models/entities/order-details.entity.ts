import { SuitStyle, SuitType } from "../enum";

export class OrderDetailsEntity {
    OrderId: number;
    ProductId: number;
    Price: number;
    Quantity: number;
    SuitType: SuitType;
    TailoredFit: SuitStyle;
    TrouserId: number;
    FabridId: number;
    LiningId: string;
    ButtonId: number;

    constructor(
        OrderId: number,
        ProductId: number,
        Price: number,
        Quantity: number,
        SuitType: SuitType,
        TailoredFit: SuitStyle,
        TrouserId: number,
        FabridId: number,
        LiningId: string,
        ButtonId: number
    ) {
        this.OrderId = OrderId;
        this.ProductId = ProductId;
        this.Price = Price;
        this.Quantity = Quantity;
        this.SuitType = SuitType;
        this.TailoredFit = TailoredFit;
        this.TrouserId = TrouserId;
        this.FabridId = FabridId;
        this.LiningId = LiningId;
        this.ButtonId = ButtonId;
    }
}
