
export function isToday(date: Date){
    const now = new Date()

    return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
    )
}

/**
 * Verifica se determinado horário do slot já passou
 */
export function isSlotInThePast(slotTime: string){
    const [slotHour, slotMinute] = slotTime.split(":").map(Number)
    
    const now = new Date()
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if(slotHour < currentHour){
        return true;
    } else if(slotHour === currentHour && slotMinute <= currentMinute){
        return true;
    }

    return false;
}

/**
 * Verifica se, a partir de um slot inicial, existe uma sequencia de 'slots' disponíveis
 * Exemplo: se um serviço tem 2 required slot e começa as 15:00, precisa que 15:00 e 15:30 estejam disponíveis.
 */
export function isSlotSequenceAvailable(
    startSlot: string,
    requiredSlots: number,
    allSlots: string[],
    blockedSlots: string[]
){
    
    const startIndex = allSlots.indexOf(startSlot)

    if(startIndex === -1 || startIndex + requiredSlots > allSlots.length){
        return false;
    }

    for(let i = startIndex; i < startIndex + requiredSlots; i++){
        const slotTime = allSlots[i]

        if(blockedSlots.includes(slotTime)){
            return false;
        }
    }

    return true;
}