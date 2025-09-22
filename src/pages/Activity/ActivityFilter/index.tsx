import {
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SxProps,
} from "@mui/material";

import { CardList } from "../../../components/CardList";
import { useScreenSize } from "../../../hooks/useScreenSize";

export function ActivityFilter() {
  const { isDesktop, isMobile } = useScreenSize();

  const filterBoxStyle: SxProps = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 0.5,
  };

  return (
    <CardList>
      <Box
        sx={
          filterBoxStyle && {
            gridColumn: ` ${!isMobile && !isDesktop ? "span 2" : 1}`,
          }
        }
      >
        <Typography>Nome</Typography>
        <TextField
          variant="outlined"
          placeholder="Nome da Atividade"
          fullWidth
        />
      </Box>
      <Box sx={filterBoxStyle}>
        <Typography>Área</Typography>
        <Select fullWidth defaultValue="none">
          <MenuItem value="none">Selecione uma Área</MenuItem>
          <MenuItem value="esporte">Esporte</MenuItem>
          <MenuItem value="culinaria">Culinária</MenuItem>
        </Select>
      </Box>
      <Box sx={filterBoxStyle}>
        <Typography>Frequência</Typography>
        <Select fullWidth></Select>
      </Box>
    </CardList>
  );
}
