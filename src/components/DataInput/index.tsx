import { Box, TextField, Typography } from "@mui/material";
import { useDataInput } from "./hook/useDataInput";

export function DataInput() {

  const {setDate, searchParams} = useDataInput()

  const data = searchParams.get('data')

  return (
    <Box pb={2}>
      <Typography fontSize={16} fontWeight={"bold"}>
        Data da aula
      </Typography>
      <TextField
        id="date"
        type="date"
        slotProps={{
          inputLabel: {
            shrink: true, // mantém o label acima
          },
        }}
        value={data}
        onChange={(date) => setDate(date.target.value)}
      />
    </Box>
  );
}
