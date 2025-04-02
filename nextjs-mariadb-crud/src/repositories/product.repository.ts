import mariadbHelper from "@/lib/mariadb.ado";
import { ProductInfo } from "@/models/product.model";

export interface IProductRepository {}
export class ProductRepository implements IProductRepository {
    async getProductInfoAsync(productIds: number[]): Promise<ProductInfo[]> {
        if (productIds.length === 0) {
            return [];
        }

        // Create placeholders dynamically based on the number of product IDs
        const placeholders = productIds.map(() => "?").join(", ");

        // Define the SQL query
        const query = `SELECT id, name, productType, price, s3url FROM Product WHERE id IN (${placeholders})`;

        // Call executeQuery with the query and productIds as parameters
        const result = (await mariadbHelper.executeQuery(
            query,
            productIds
        )) as ProductInfo[];

        return result;
    }

    calculateTotal(products: ProductInfo[]): number {
        if (!products || products.length === 0) {
            return 0;
        }

        const total = products.reduce(
            (total, product) => total + (product.price || 0),
            0
        );
        return Number(total.toFixed(2));
    }
}
