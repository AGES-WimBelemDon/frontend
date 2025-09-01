import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import HomeIcon from '@mui/icons-material/Home';

import type { ThemeStyle, TextCard } from "./interface";

const themeStyle: Record<ThemeStyle, object> = {
  light: { backgroundColor: "white", border: "2px solid #0E6872" },
  dark: { backgroundColor: "#0E6872", border: "2px solidrgb(255, 255, 255)" },
};

export function TextCard({ title, theme, onClick }: TextCard) {
  return theme === "light" ? (
    <Card
      sx={{
        ...themeStyle[theme],
        maxWidth: 375,
        borderRadius: 2,
        height: 125,
        flex: 1,
        alignItems: "center",
      }}
    >
      <CardContent onClick={onClick}>
      <HomeIcon sx={{ color: '#0E6872' }} fontSize="large" />
        <Typography
          sx={{ color: "#0E6872", fontWeight: "bold" }}
          variant={"h5"}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  ) : (
    <Card
      sx={{
        ...themeStyle[theme],
        maxWidth: 375,
        borderRadius: 2,
        height: 125,
        flex: 1,
        alignItems: "center",
      }}
    >
      <CardContent onClick={onClick}>
      <HomeIcon sx={{ color: 'white' }} fontSize="large" />
        <Typography
          sx={{ color: "white", fontWeight: "bold" }}
          variant={"h5"}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
