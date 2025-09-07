export interface ButtonCardProps extends ButtonCardStudent {
    onChangePresence: (present:boolean) => void
}

export interface ButtonCardStudent {
    index: number,
    name: string,
    frequencyPercent: number,
    isPresent: boolean,
}