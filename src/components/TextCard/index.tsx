import { Book as BookIcon } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  type SxProps,
  type Theme
} from "@mui/material";
  
import type { ThemeStyle, TextCardProps } from "./interface";
import { strings } from "../../constants";

const themeStyle: Record<ThemeStyle, SxProps<Theme>> = {
  light: { backgroundColor: "background.default", color: "primary.main" },
  dark: { backgroundColor: "primary.main", color: "primary.contrastText" },
};

export function TextCard({
  title,
  theme,
  onClick,
  disabled,
  icon: Icon = BookIcon,
}: TextCardProps) {
  return (
    <Card
      sx={{
        ...themeStyle[theme],
        borderWidth: 2,
        borderRadius: 2,
        borderStyle: "solid",
        borderColor: "primary.main",
        height: "auto",
        minHeight: 125,
        minWidth: 125,
        width: "100%",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <CardActionArea
        sx={{ height: "100%" }}
        onClick={onClick}
        disabled={disabled}
        aria-label={strings.textCard.exploreHome}
        data-cy="text-card-button"
      >
        <CardContent>
          <Icon fontSize="large" />
          <Typography
            sx={{ fontWeight: "bold" }}
            fontSize={20}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
