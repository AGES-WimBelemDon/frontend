export interface FrequencyCardProps extends FrequencyCardStudent {
    onChangePresence: (present:boolean) => void
}

export interface FrequencyCardStudent {
    id: number,
    name: string,
    frequencyPercent: number,
    isPresent: boolean,
}