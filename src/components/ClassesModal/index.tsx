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
  Select,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";

import { Filters } from "./filters";
import { useClassesModal, type IClassesModalForm } from "./hook";
import { strings } from "../../constants";
import { useScreenSize } from "../../hooks/useScreenSize";
import { theme } from "../../styles/theme";

const ClassesModal: React.FC = () => {
  const { control, getValues, reset } = useForm<IClassesModalForm>({
    defaultValues: {
      level: "",
      recurring: false,
      weekDays: [],
      startTime: null,
      endTime: null,
    },
  });

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
    selectedStudents,
    selectedTeachers,
    setSelectedStudents,
    setSelectedTeachers
  } = useClassesModal();

  const { isMobile } = useScreenSize();

  const [activeStep, setActiveStep] = React.useState(0);


  const days = [
    { label: "D", value: "D-0" },
    { label: "S", value: "S-1" },
    { label: "T", value: "T-2" },
    { label: "Q", value: "Q-3" },
    { label: "Q", value: "Q-4" },
    { label: "S", value: "S-5" },
    { label: "S", value: "S-6" },
  ];
  const level = ["Infantil", "Fundamental", "Médio"];
  const steps = ["Dados", "Professor", "Alunos"];


  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      const formData = getValues();

      if (createClass(formData)) {
        setActiveStep(0);
        reset();
        setSelectedStudents([]);
        setSelectedTeachers([]);
        setNameStudent("");
        setNameTeacher("");
      }
    }
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

      <DialogContent sx={{ overflow: "auto" }}>
        {activeStep === 0 && (
          <Box display="flex" flexDirection="column" gap={2}>
            <FormControl fullWidth sx={{ backgroundColor: theme.palette.background.default }}>
              <InputLabel id="level-select-label" sx={{ color: theme.palette.text.primary }}>{strings.classesModal.inputs.classLevel}</InputLabel>
              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="level-select-label"
                    label={strings.classesModal.inputs.classLevel}
                    displayEmpty
                  >
                    {level.map((name) => (
                      <MenuItem key={name} value={name} sx={{ backgroundColor: theme.palette.background.default }}>
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            <Controller
              name="recurring"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      size="small"
                      sx={{ color: theme.palette.primary.main }}
                      icon={<RadioButtonUnchecked />}
                      checkedIcon={<RadioButtonChecked />}
                    />
                  }
                  label={strings.classesModal.recurring}
                />
              )}
            />

            <InputLabel sx={{ color: theme.palette.text.primary }}>{strings.filters.weekDays.title}</InputLabel>
            <Controller
              name="weekDays"
              control={control}
              render={({ field }) => (
                <FormGroup sx={{ flexDirection: "row", gap: 1 }}>
                  {days.map((day) => (
                    <Checkbox
                      key={day.value}
                      disableRipple
                      checked={field.value.includes(day.value)}
                      onChange={(_event, checked) => {
                        const newWeekDays = checked
                          ? [...field.value, day.value]
                          : field.value.filter((d) => d !== day.value);
                        field.onChange(newWeekDays);
                      }}
                      checkedIcon={<DaysCalendarIcon text={day.label} checked={true} />}
                      icon={<DaysCalendarIcon text={day.label} checked={false} />}
                      sx={{
                        p: 0.3,
                        "&:hover": { backgroundColor: "transparent" },
                      }}
                    />
                  ))}
                </FormGroup>
              )}
            />

            <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 1, }}>
              <Box sx={{ flex: 1, }}>
                <InputLabel sx={{ color: theme.palette.text.primary }}> {strings.classesModal.inputs.startTime} </InputLabel>
                <Controller
                  name="startTime"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      ampm={false}
                      sx={{ width: "100%", borderRadius: 1, color: theme.palette.background.default }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InputLabel sx={{ color: theme.palette.text.primary }}>{strings.classesModal.inputs.endTime}</InputLabel>
                <Controller
                  name="endTime"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      ampm={false}
                      sx={{ width: "100%", borderRadius: 1, color: theme.palette.background.default }}
                    />
                  )}
                />
              </Box>
            </Box>
          </Box>
        )}

        {activeStep === 1 && (
          <Box display="flex" flexDirection="column" gap={2}   >
            <Filters label={strings.classesModal.inputs.assignTeacher} name={nameTeacher} onChange={setNameTeacher} placeholder={strings.classesModal.inputs.searchTeacher} />
            <FormControl sx={{ overflow: "auto", minHeight: 125, maxHeight: 250 }}>
              {filtredUsers.length > 0 &&
                filtredUsers.map((user) => (
                  <FormControlLabel
                    key={user.id}
                    label={user.full_name}
                    value={user.full_name}
                    sx={{ borderBottom: "1px solid " + theme.palette.grey[300] }}
                    control={
                      <Checkbox
                        sx={{ color: theme.palette.primary.main }}
                        checked={selectedTeachers.includes(user.id)}
                        onChange={() => {
                          const isSelected = selectedTeachers.includes(user.id);
                          if (isSelected) {
                            setSelectedTeachers(selectedTeachers.filter((id) => id !== user.id));
                          } else {
                            setSelectedTeachers([...selectedTeachers, user.id]);
                          }
                        }}
                      />
                    }
                  />
                ))}
            </FormControl>
          </Box>
        )}
        {activeStep === 2 && (
          <Box display="flex" flexDirection="column" gap={0.5} >
            <Filters label={strings.classesModal.inputs.addStudent} name={nameStudent} onChange={setNameStudent} placeholder={strings.classesModal.inputs.searchStudent} />
            <FormControl sx={{ overflow: "auto", minHeight: 125, maxHeight: 250 }}>
              {filtredStudents.length > 0 &&
                filtredStudents.map((student) => (
                  <FormControlLabel
                    key={student.id}
                    label={student.fullName}
                    sx={{ borderBottom: "1px solid " + theme.palette.grey[300] }}
                    control={
                      <Checkbox
                        sx={{ color: theme.palette.primary.main }}
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => {
                          const isSelected = selectedStudents.includes(student.id);
                          if (isSelected) {
                            setSelectedStudents(
                              selectedStudents.filter((id) => id !== student.id)
                            );
                          } else {
                            setSelectedStudents([...selectedStudents, student.id]);
                          }
                        }}
                      />
                    }
                  />
                ))}
            </FormControl>
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
          {activeStep === steps.length - 1 ? strings.classesModal.buttons.create : strings.classesModal.buttons.next}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassesModal;