
export type TextCard = {
    title: string,
    theme: ThemeStyle,
    onClick?: () => void,
    disabled?: boolean,
}

export type ThemeStyle = "light" | "dark";
