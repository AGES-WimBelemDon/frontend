export interface FrequencyCardProps extends FrequencyCardStudent {
    onChangePresence: (present:boolean) => void
}

export interface FrequencyCardStudent {
    index: number,
    name: string,
    frequencyPercent: number,
    isPresent: boolean,
}