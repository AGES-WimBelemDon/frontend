import type React from 'react';

export type TextCard = {
    title: string,
    icon: React.ReactNode,
    theme: ThemeStyle,
    onClick?: () => void,
}

export type ThemeStyle = 'light' | 'dark';