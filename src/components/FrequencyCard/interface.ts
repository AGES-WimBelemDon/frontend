export interface FrequencyCardProps extends FrequencyCardStudent {
    onChangePresence: (present:boolean) => void
}

export interface FrequencyCardStudent {
    id: string,
    name: string,
    frequencyPercent: number,
    isPresent: boolean,
}
