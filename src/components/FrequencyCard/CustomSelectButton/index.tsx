import AddIcon from "@mui/icons-material/Add";
import { Button, MenuItem, Select, Box, Typography, type SelectChangeEvent } from "@mui/material";

import type { CustomSelectButtonProps, NoteOption } from "./interface";
import { strings } from "../../../constants";
import { useScreenSize } from "../../../hooks/useScreenSize";
import type { NoteTypes } from "../../../types/filters";

export function CustomSelectButton({
  note,
  options,
  onChange,
}: CustomSelectButtonProps) {
  const handleChange = (event: SelectChangeEvent<NoteTypes>) => {
    onChange(event.target.value as NoteTypes);
  };

  const { isDesktop } = useScreenSize();

  const displayLabel = note
    ? (options.find((o) => o.value === note)?.label ?? note)
    : isDesktop
      ? strings.frequencyCard.absentDetails
      : "";

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <Button
        sx={{
          backgroundColor: "grey.500",
          color: "white",
          borderRadius: 1.5,
          textTransform: "none",
          fontWeight: "bold",
          width: 200,
          display: "flex",
          justifyContent: "center",
          paddingRight: 2,
        }}
      >
        <Typography style={{ fontSize: 14, fontWeight: "bold" }}>
          {displayLabel}
        </Typography>
        {!note && <AddIcon />}{" "}
      </Button>

      <Select
        value={note ?? ""}
        onChange={handleChange}
        open={undefined}
        displayEmpty
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "grey.500",  
              color: "white",
            },
          },
        }}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
      >
        {options.map((opt: NoteOption) => (
          <MenuItem key={opt.value} value={opt.value ?? ""}  sx={{ minHeight: 40 }}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
