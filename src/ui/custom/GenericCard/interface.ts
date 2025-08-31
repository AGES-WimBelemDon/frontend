import type React from 'react';

import type { SxProps, Theme, TypographyProps } from '@mui/material';

export type TypeCard = {
    title: string,
    description?: string,
    type: CardType,
    icon?: React.ReactNode | undefined,
    children?: React.ReactNode | undefined,
    theme: ThemeStyle,
    cardProps?: SxProps<Theme>,
    titleProps: SxProps<Theme>,
    descriptionProps?: SxProps<Theme>
    titleVariant?: TypographyProps['variant'],
    onClick?: () => void,

}

export type CardType = 'default' | 'list';

export type ThemeStyle = 'light' | 'dark';