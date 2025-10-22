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
  Stepper,
  Step,
  StepLabel,
  Typography,
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
    filtredUsers,
  } = useClassesModal();


  const [personName, setPersonName] = React.useState<string>("");

  const [activeStep, setActiveStep] = React.useState(0);


  const days = ["D", "S", "T", "Q", "Q", "S", "S"];
  const level = ["Iniciante", "Intermediário", "Avançado"];
  const steps = ["Dados", "Professor", "Alunos"];


  const handleChange = (event: SelectChangeEvent<string>) => {
    setPersonName(event.target.value as string);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
    else createClass();
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const DaysCalendarIcon = ({ text, checked }: { text: string; checked: boolean }) => {
    const style = {
      width: 36,
      height: 36,
      borderRadius: 5,
      border: `2px solid ${theme.palette.primary.main}`,
      bgcolor: checked ? "primary.main" : "transparent",
      color: checked ? "primary.contrastText" : theme.palette.primary.main,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
      fontWeight: 600,
      transition: "all 0.2s",
    };
    return <Box sx={style}>{text}</Box>;
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
          maxWidth: 800,
        },
      }}
    >
      <DialogTitle
        fontWeight="bold"
        fontSize={22}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >

        <IconButton
          onClick={closeModal}
          sx={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box sx={{ width: "100%", mb: 2 }}>
        <Stepper
          activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} >
              <StepLabel >
                <Typography
                  sx={{ color: activeStep >= index ? "" : "grey.500" }}
                  fontWeight={activeStep === index ? "bold" : "normal"} >
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <DialogContent sx={{ overflow: "hidden" }}>
        {activeStep === 0 && (
          <Box display="flex" flexDirection="column" gap={2}>
            <InputLabel sx={{ color: theme.palette.text.primary }}>Nível da Turma</InputLabel>
            <Select value={personName} onChange={handleChange} displayEmpty>
              <MenuItem value="">
                <em>Selecione</em>
              </MenuItem>
              {level.map((name) => (
                <MenuItem key={name} value={name}>
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

            <InputLabel sx={{ color: theme.palette.text.primary }}>Dias da Semana</InputLabel>

            <FormGroup sx={{ flexDirection: "row", gap: 1 }}>
              {days.map((day, index) => (
                <Checkbox
                  key={`${day}${index}`}
                  disableRipple
                  checkedIcon={<DaysCalendarIcon text={day} checked={true} />}
                  icon={<DaysCalendarIcon text={day} checked={false} />}
                  sx={{
                    p: 0.3,
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                />
              ))}
            </FormGroup>

            <InputLabel sx={{ color: theme.palette.text.primary }}>Horário</InputLabel>
            <Box sx={{ border: "1px solid #ccc", borderRadius: 1, p: 1.5, color: "text.disabled" }}>
              {"<TimePicker />"}
            </Box>
          </Box>
        )}

        {activeStep === 1 && (
          <Box display="flex" flexDirection="column" gap={2}   >
            <Filters label="Pesquisar Professor" name={nameTeacher} onChange={setNameTeacher} placeholder="Pesquisar Professor" />
            <FormControl>
              <RadioGroup>
                {filtredUsers.length > 0 &&
                  filtredUsers.map((user) => (
                    <FormControlLabel
                      key={user.id}
                      label={user.full_name}
                      value={user.full_name}

                      control={<Radio sx={{ color: theme.palette.primary.main }} />}
                    />
                  ))}
              </RadioGroup>
            </FormControl>
          </Box>
        )}
        {activeStep === 2 && (
          <Box display="flex" flexDirection="column" gap={2}>
            <Filters label="Pesquisar Aluno" name={nameStudent} onChange={setNameStudent} placeholder="Pesquisar Aluno" />
            {filtredStudents.length > 0 &&
              filtredStudents.map((student) => (
                <FormControlLabel key={student.id} label={student.fullName} control={<Checkbox sx={{ color: theme.palette.primary.main }} />} />
              ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        {activeStep > 0 && (
          <Button onClick={handleBack} variant="text" color="inherit">
            Voltar
          </Button>
        )}
        <Button variant="contained" onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Cadastrar" : "Próximo"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
