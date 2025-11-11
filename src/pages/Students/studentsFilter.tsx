import { Box, TextField, Typography, MenuItem } from "@mui/material";
import { strings } from "../../constants";

export interface StudentFilterProps {
  name: string;
  onNameChange: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  onStatusChange: React.Dispatch<React.SetStateAction<string>>;
}

export function StudentFilter({ name, onNameChange, status, onStatusChange }: StudentFilterProps) {

  return (
    <Box
      gap={2}
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      mb={2}
    >
      <Box display="flex" flexDirection="column" gap={0.5} flex={1}>
        <Typography>{strings.students.filter.title}</Typography>
        <TextField
          variant="outlined"
          placeholder={strings.students.filter.search}
          fullWidth
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </Box>
      <Box display="flex" flexDirection="column" gap={0.5} sx={{ minWidth: { xs: "100%", sm: "20%" } }}>
        <Typography>Status</Typography>
        <TextField
          select
          variant="outlined"
          fullWidth
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="ATIVO">Ativo</MenuItem>
          <MenuItem value="INATIVO">Inativo</MenuItem>
        </TextField>
      </Box>
    </Box>
  );
}
