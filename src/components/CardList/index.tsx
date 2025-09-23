import type { PropsWithChildren } from "react";

import { Grid } from "@mui/material";

import { useScreenSize } from "../../hooks/useScreenSize";

export function CardList({ children }: PropsWithChildren) {
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
      spacing={{ xs: 1 }}
      gridTemplateColumns={`repeat(${gridColumnsCountMapper}, 1fr)`}
    >
      {children}
    </Grid>
  );
}
