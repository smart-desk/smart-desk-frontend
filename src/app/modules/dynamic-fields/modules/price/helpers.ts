import { CURRENCIES } from './constants';

export function getCurrencySymbolByCode(code: string): string {
    const currency = CURRENCIES.find(c => c.code === code);
    return currency ? currency.symbol : '';
}

export function roundPrice(value: number | string): string {
    const result = typeof value === 'string' ? parseInt(value, 10) : value;
    return result.toFixed(0);
}
