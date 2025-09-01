import type React from 'react';

import type {TypographyProps } from '@mui/material';

export type TextCard = {
    title: string,
    icon: React.ReactNode,
    theme: ThemeStyle,
    titleVariant?: TypographyProps['variant'],
    onClick?: () => void,

}

export type ThemeStyle = 'light' | 'dark';