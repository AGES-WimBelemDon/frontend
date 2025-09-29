import {
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SxProps,
  type SelectChangeEvent,
} from "@mui/material";

import { CardList } from "../../components/CardList";
import { useScreenSize } from "../../hooks/useScreenSize";

interface ActivityFilterProps {
  name: string;
  area: string;
  frequency: string;
  onNameChange: (name: string) => void;
  onAreaChange: (area: string) => void;
  onFrequencyChange: (frequency: string) => void;
}

export function ActivityFilter({
  name,
  area,
  frequency,
  onNameChange,
  onAreaChange,
  onFrequencyChange,
}: ActivityFilterProps) {
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
        sx={filterBoxStyle}
        gridColumn={!isMobile && !isDesktop ? "span 2" : 1}
      >
        <Typography>Nome</Typography>
        <TextField
          variant="outlined"
          placeholder="Nome da Atividade"
          fullWidth
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </Box>
      <Box sx={filterBoxStyle}>
        <Typography>Área</Typography>
        <Select
          fullWidth
          value={area}
          onChange={(e: SelectChangeEvent) => onAreaChange(e.target.value)}
          displayEmpty
        >
          <MenuItem value="all">Selecione uma Área</MenuItem>
          <MenuItem value="esportes">Esportes</MenuItem>
          <MenuItem value="academia">Academia</MenuItem>
          <MenuItem value="aquáticos">Aquáticos</MenuItem>
        </Select>
      </Box>
      <Box sx={filterBoxStyle}>
        <Typography>Frequência</Typography>
        <Select
          fullWidth
          value={frequency}
          onChange={(e: SelectChangeEvent) => onFrequencyChange(e.target.value)}
          displayEmpty
        >
          <MenuItem value="all">Selecione uma Frequência</MenuItem>
          <MenuItem value="diária">Diária</MenuItem>
          <MenuItem value="semanal">Semanal</MenuItem>
          <MenuItem value="mensal">Mensal</MenuItem>
        </Select>
      </Box>
    </CardList>
  );
}
