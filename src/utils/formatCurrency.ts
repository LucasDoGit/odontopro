
const CURRENCY_FORMATTER = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
    minimumFractionDigits: 0
})

/**
 * função para formatar valor número na formatação de moeda BRL
 * @param {number} number Valor número a ser formatado para BRL
 * @returns {number} Valor número formatado em BRL
 * @example formatCurrency(1200); retorna: R$1200,00
 */
export function formatCurrency(number: number){
    return CURRENCY_FORMATTER.format(number)
}