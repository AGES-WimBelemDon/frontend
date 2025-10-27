import { Grid } from "@mui/material";

import type { CardListProps } from "./interface";
import { useScreenSize } from "../../hooks/useScreenSize";

export function CardList({
  rowGap = 1,
  columnGap = 1,
  children,
}: CardListProps) {
  const { isMobile, isDesktop } = useScreenSize();

  const gridColumnsCountMapper = (() => {
    switch (true) {
    case isMobile:
      return 1;
    case isDesktop:
      return 3;
    default:
      return 2;
    }
  })();
  
  return (
    <Grid
      container
      display="grid"
      rowGap={rowGap}
      columnGap={columnGap}
      spacing={{ xs: 1 }}
      gridTemplateColumns={`repeat(${gridColumnsCountMapper}, 1fr)`}
    >
      {children}
    </Grid>
  );
}
