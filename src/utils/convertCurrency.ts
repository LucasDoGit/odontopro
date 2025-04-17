
/**
 * Converte um valor monetário em reais (BRL) para centavos.
 * @param {string} amount O valor monetário em reais (BRL) a ser convertido.
 * @returns {number} O valor convertido em centavos.
 * 
 * @example 
 * convertRealToCents("1.500,90"); Retorna: 1500.90
 */
export function convertRealToCents(amount: string){
    const numericPrice = parseFloat(amount.replace(/\./g, '').replace(',', '.'))
    const priceInCents = Math.round(numericPrice * 100)

    return priceInCents
}