import { CardHeader, Typography, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import type { CardType, ThemeStyle, TypeCard } from "./interface";

const cardStyle: Record<CardType, object> = {
  default: { maxWidth: 375,  borderRadius: 2 },
  list: { borderRadius: 2 },
};

const themeStyle: Record<ThemeStyle,object> = {
  light: { backgroundColor: "white",border: "2px solid #0E6872"},
  dark: { backgroundColor: "#0E6872", border: "2px solidrgb(255, 255, 255)" },
}

export function GenericCard({
  title,
  description,
  type,
  icon,
  children,
  theme,
  cardProps,
  titleProps,
  descriptionProps,
  titleVariant,
}: TypeCard) {
  return (
    <Card
      sx={{
        ...cardStyle[type],
        ...(themeStyle[theme]),
        ...cardProps,
      }}
    >
      <CardContent>
        {icon}
        <Typography sx={titleProps} variant={titleVariant}>
          {title}
        </Typography>
        <>
          {children}
          <Typography sx={descriptionProps}>{description}</Typography>
        </>
      </CardContent>
    </Card>
  );
}
