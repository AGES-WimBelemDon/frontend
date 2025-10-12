import React from "react";

import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, IconButton, InputLabel, ListItemText, MenuItem, Radio, RadioGroup, Select, type SelectChangeEvent } from "@mui/material";

import { useClassesModal } from "./hook";
import { theme } from "../../styles/theme";
export function ClassesModal() {
  const { isOpen, closeModal, createClass } = useClassesModal();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const isChecked = false;

  const days = ["S", "T", "Q", "Q", "S", "S", "D"];
  const level = ["Iniciante", "Intermediário", "Avançado"];
  const professores = ["profeessora A", "Professo B", "Professora C", "Professor D"];
  const alunos = ["Aluna A", "Aluno B", "Aluna C", "Aluno D"];

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const DaysCalendarIcon = ({ text, checked }: { text: string, checked: boolean }) => {
    const style = {
      width: 22,
      height: 22,
      borderRadius: 5,
      bgcolor: "primary.main",
      color: "primary.contrastText",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      fontWeight: "semi-bold",
    }
    return (
      checked ?
        <Box
          sx={{
            ...style,
          }}
        >
          {text}
        </Box>
        :
        <Box
          sx={{
            ...style,
            bgcolor: "background.paper",
            color: "text.primary",
          }}
        >
          {text}
        </Box>
    );
  }


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

            <InputLabel sx={{ color: theme.palette.text.primary }} id="classes-level">Nível das Turmas</InputLabel>

            <Select sx={{}} value={personName} onChange={handleChange} labelId="classes-level">
              {level.map((name) => (
                <MenuItem key={name} value={name} sx={{
                  flexDirection: "row",
                  bgcolor: theme.palette.common.white,
                  color: theme.palette.text.primary,
                  "&:hover": {
                    bgcolor: theme.palette.action.hover
                  }
                }}>
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
            <FormControlLabel control={<Checkbox size="small" sx={{ color: theme.palette.primary.main }}
              icon={<RadioButtonUnchecked />}
              checkedIcon={<RadioButtonChecked />}
            />}
            label="Turma Ativa" />
            <InputLabel sx={{ color: theme.palette.text.primary }} id="classes-level">Dia da Semana</InputLabel>
            <FormGroup sx={{ flexDirection: "row" }}>
              {days.map((day, index) =>
                <Checkbox key={`${day}` + `${index}`}
                  checkedIcon={<DaysCalendarIcon text={day} checked={!isChecked} />}
                  icon={<DaysCalendarIcon text={day} checked={isChecked} />}
                  sx={{ color: theme.palette.primary.main }} />
              )
              }
            </FormGroup>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                {professores.map((professor) =>
                  <FormControlLabel key={professor} value={professor} control={<Radio sx={{ color: theme.palette.primary.main }} />} label={professor} />

                )}
              </RadioGroup>
            </FormControl>
            Time
            <FormGroup>
              {alunos.map((aluno) =>
                < FormControlLabel key={aluno} value={aluno} control={< Radio />} label={aluno} />
              )}
            </FormGroup>
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