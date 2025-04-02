/**
 * Formats a date to the specified format: yyyy-MM-dd HH:mm:ss
 * @param date The date to format
 * @returns Formatted date string
 */
export function formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Calculates the total amount with currency rate
 * @param amount The original amount
 * @param currencyRate The currency conversion rate
 * @returns The calculated total amount
 */
export function calculateTotalWithCurrency(amount: number, currencyRate: number): number {
    return Number((amount * currencyRate).toFixed(2));
} 