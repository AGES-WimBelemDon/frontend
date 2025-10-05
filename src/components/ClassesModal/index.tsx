import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, ListItemText, MenuItem, Select, Switch, type SelectChangeEvent } from "@mui/material";

import { useClassesModal } from "./hook";
import { TextInput } from "../Inputs/TextInput";
export function ClassesModal() {
  const { isOpen, closeModal, createClass } = useClassesModal();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const data = ["segunda", "terça", "quarta", "quinta", "sexta"];

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 2,
          padding: 2,
          backgroundColor: "grey.50",
          width: "100%"
        }
      }}
    >
      <DialogTitle
        fontWeight="bold"
        fontSize={24}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        sx={{
          fontWeight: "bold",
          fontSize: 24
        }}
      >
        {"Cadastrar Turma"}
        <IconButton
          onClick={closeModal}
          sx={{
            position: "absolute",
            right: 2,
            top: "50%",
            transform: "translateY(-90%)"
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          gap={2}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          borderColor="primary.main"
          borderRadius={0}
          width="100%"
          padding={2}
        >
          <Box
            flex={1}
            gap={2}
            display="flex"
            flexDirection="column"
          >
            <FormControlLabel control={<Switch defaultChecked />} label="Ativar/Desativar Turma" />
            <TextInput
              label={"Teste"}
              placeholder={"Testando input"}
              id="1"
            />
            <FormControl sx={{ m: 2, width: 300 }}>
              <InputLabel > Dia das turma</InputLabel>
              <Select multiple value={personName} onChange={handleChange} MenuProps={MenuProps}>
                {data.map((name) => (
                  <MenuItem key={name} value={name} sx={{
                    flexDirection: "row"
                  }}>
                    <Checkbox checked={personName.includes(name)} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={createClass}>
          {"button de turma"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}