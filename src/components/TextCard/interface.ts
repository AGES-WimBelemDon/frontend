
export type TextCard = {
    title: string,
    theme: ThemeStyle,
    onClick?: () => void,
}

export type ThemeStyle = 'light' | 'dark';
