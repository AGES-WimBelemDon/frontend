import React from "react";

import {
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

import { Filters } from "./filters";
import { useClassesModal } from "./hook";
import { theme } from "../../styles/theme";

export function ClassesModal() {
  const {
    isOpen,
    closeModal,
    createClass,
    nameStudent,
    nameTeacher,
    setNameStudent,
    setNameTeacher,
    filtredStudents,
    filtredUsers
  } = useClassesModal();

  const [personName, setPersonName] = React.useState<string[]>([]);
  const isChecked = false;

  const days = ["S", "T", "Q", "Q", "S", "S", "D"];
  const level = ["Iniciante", "Intermediário", "Avançado"];

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const DaysCalendarIcon = ({
    text,
    checked,
  }: {
    text: string;
    checked: boolean;
  }) => {
    const style = {
      width: 30,
      height: 30,
      borderRadius: 5,
      bgcolor: "primary.main",
      color: "primary.contrastText",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      fontWeight: "semi-bold",
    };

    return checked ? (
      <Box sx={style}>{text}</Box>
    ) : (
      <Box
        sx={{
          ...style,
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        {text}
      </Box>
    );
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
          width: "100%",
        },
      }}
    >
      <DialogTitle
        fontWeight="bold"
        fontSize={24}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative" 
      >
        {"Cadastrar Turma"}
        <IconButton
          onClick={closeModal}
          sx={{
            position: "absolute",
            right: 2,
            top: "50%",
            transform: "translateY(-90%)",
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
          <Box flex={1} gap={2} display="flex" flexDirection="column">
            <InputLabel
              sx={{ color: theme.palette.text.primary }}
              id="classes-level"
            >
              Nível das Turmas
            </InputLabel>

            <Select
              value={personName}
              onChange={handleChange}
              labelId="classes-level"
            >
              {level.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  sx={{
                    flexDirection: "row",
                    bgcolor: theme.palette.common.white,
                    color: theme.palette.text.primary,
                    "&:hover": {
                      bgcolor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>

            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{ color: theme.palette.primary.main }}
                  icon={<RadioButtonUnchecked />}
                  checkedIcon={<RadioButtonChecked />}
                />
              }
              label="Atividade Recorrente"
            />

            <InputLabel
              sx={{ color: theme.palette.text.primary }}
              id="classes-level"
            >
              Dia da Semana
            </InputLabel>

            <FormGroup sx={{ flexDirection: "row" }}>
              {days.map((day, index) => (
                <Checkbox
                  key={`${day}${index}`}
                  checkedIcon={<DaysCalendarIcon text={day} checked={!isChecked} />}
                  icon={<DaysCalendarIcon text={day} checked={isChecked} />}
                  sx={{
                    color: theme.palette.primary.main,
                    borderColor: isChecked
                      ? theme.palette.primary.main
                      : theme.palette.primary.main,

                    borderRadius: 5,
                    padding: 1,
                    gap: 1,
                    margin: 0.1,
                  
                    
                  }}
                />
              ))}
            </FormGroup>

            <Filters label="Estudantes" name={nameStudent} onChange={setNameStudent} placeholder="Estudante" />

            {filtredStudents.length > 0 &&
              filtredStudents?.map((student) => (
                <FormControlLabel sx={{ width: "100%", maxWidth: 360 }}
                  key={student.id}
                  label={student.fullName}
                  control={<Checkbox sx={{ color: theme.palette.primary.main }} />}
                />
              ))}
            <Filters label="Professores" name={nameTeacher} onChange={setNameTeacher} placeholder="Professor" />
            <FormControl>
              <RadioGroup
                sx={{ width: "100%", maxWidth: 360 }}

              >
                {filtredUsers.length > 0 &&
                  filtredUsers?.map((user) => (
                    <>
                      <FormControlLabel
                        key={user.id}
                        label={user.full_name}
                        value={user.full_name}
                        control={<Radio sx={{ color: theme.palette.primary.main }} />}
                      />
                    </>
                  ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={createClass}>
          {"Cadastrar"}
        </Button>
      </DialogActions>
    </Dialog >
  );
}
