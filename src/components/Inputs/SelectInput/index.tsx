import { Box, Select, Typography } from "@mui/material";
import { useSelectInput } from "./hook";

export function SelectInput({
  label,
  options,
  id,
}: {
  label: string;
  options: string[];
  id: string;
}) {
  const { setSelectInput, searchParams } = useSelectInput(id);

  const select = searchParams.get(`select${id}`);

  return (
    <Box>
      <Typography fontSize={16} fontWeight="bold">
        {label}
      </Typography>
      <Select
        native
        id="select"
        variant="standard"
        fullWidth
        defaultValue=""
        sx={{
          width: "150px",
          marginTop: "1px",
        }}
        value={select ?? ""}
        onChange={(select) => setSelectInput(String(select.target.value))}
      >
        <option value=""></option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </Box>
  );
}
