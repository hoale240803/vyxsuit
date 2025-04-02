import mariadbHelper from "@/lib/mariadb.ado";
import { ProductInfo } from "@/models/product.model";

export interface IProductRepository {}
export class ProductRepository implements IProductRepository {
    async getProductInfoAsync(productIds: {
        suitId: number;
        suitTypeId: number;
        trouserId: number;
        jacketId: number;
        fabricId: number;
        liningId: number;
        buttonId: number;
    }): Promise<ProductInfo[]> {
        const sql = `
            SELECT id, name, price
            FROM Product
            WHERE id IN (?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            productIds.suitId,
            productIds.suitTypeId,
            productIds.trouserId,
            productIds.jacketId,
            productIds.fabricId,
            productIds.liningId,
            productIds.buttonId,
        ];
        const result: any = await mariadbHelper.executeQueryWithAny(
            sql,
            params
        );
        return result;
    }
}
