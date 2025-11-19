import { useContext } from "react";

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
  TextField,
  Radio,
  Divider,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

import { Filters } from "./filters";
import { useClassesModal } from "./hook";
import { strings } from "../../constants";
import { ClassesModalContext } from "../../contexts/ClassesModal/ClassesModalContext";
import { useScreenSize } from "../../hooks/useScreenSize";

export function ClassesModal() {
  const { isOpen, closeModal, classData } = useContext(ClassesModalContext);

  const {
    activeStep,
    steps,
    control,
    levelOptions,
    days,
    nameTeacher,
    setNameTeacher,
    filteredTeachers,
    nameStudent,
    setNameStudent,
    filteredStudents,
    activityName,
    setActivityName,
    filteredActivities,
    handleBack,
    handleNext,
    isLastStep,
    handleSubmit,
  } = useClassesModal({ isOpen, closeModal, classData });

  const { isMobile } = useScreenSize();

  function DaysCalendarIcon({ text, checked }: { text: string; checked: boolean }) {
    return (
      <Box
        sx={{
          width: 36,
          height: 36,
          aspectRatio: "1 / 1",
          borderRadius: "100%",
          border: `2px solid`,
          color: checked ? "primary.contrastText" : "primary.main",
          bgcolor: checked ? "primary.main" : "transparent",
          display: "grid",
          placeItems: "center",
          transition: "all 0.2s",
        }}
      >
        <Typography
          fontSize={16}
          fontWeight={600}
        >
          {text}
        </Typography>
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
          {[...steps.entries()].map(([key, label]) => (
            <Step key={label} >
              <StepLabel >
                <Typography
                  sx={{ color: activeStep >= key ? "" : "grey.500" }}
                  fontWeight={activeStep === key ? "bold" : "normal"} >
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
            <FormControl sx={{ color: "text.primary" }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={strings.classesModal.inputs.className}
                    sx={{ label: { color: "text.primary" } }}
                  />
                )}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="level-select-label" sx={{ color: "text.primary" }}>{strings.classesModal.inputs.classLevel}</InputLabel>
              <Controller
                name="levelId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="level-select-label"
                    label={strings.classesModal.inputs.classLevel}
                  >
                    {levelOptions?.map((level) => (
                      <MenuItem key={level.id} value={level.id}>
                        <ListItemText primary={level.name} />
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            <InputLabel sx={{ color: "text.primary" }}>{strings.filters.weekDays.title}</InputLabel>
            <Controller
              name="dayOfWeekSelection"
              control={control}
              render={({ field }) => (
                <FormGroup sx={{ flexDirection: "row", gap: 1 }}>
                  {days.map((day) => {
                    const current = Array.isArray(field.value) ? field.value : [];
                    const isChecked = current.some((d) => d.id === day.id);
                    return (
                      <Checkbox
                        key={day.id}
                        disableRipple
                        checked={isChecked}
                        onChange={(_event, checked) => {
                          const newWeekDays = checked
                            ? [...current, day]
                            : current.filter((d) => d.id !== day.id);
                          field.onChange(newWeekDays);
                        }}
                        checkedIcon={<DaysCalendarIcon text={day.symbol} checked={true} />}
                        icon={<DaysCalendarIcon text={day.symbol} checked={false} />}
                        sx={{
                          p: 0.3,
                          "&:hover": { backgroundColor: "transparent" },
                        }}
                      />
                    );
                  })}
                </FormGroup>
              )}
            />

            <Box
              gap={1}
              display="flex"
              flexDirection={isMobile ? "column" : "row"}
            >
              <Box flex={1}>
                <InputLabel sx={{ color: "text.primary" }}> {strings.classesModal.inputs.startDate} </InputLabel>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(v) => field.onChange(v ? v.toDate() : null)}
                      sx={{ width: "100%", borderRadius: 1, color: "background.default" }}
                    />
                  )}
                />
              </Box>
              <Box flex={1}>
                <InputLabel sx={{ color: "text.primary" }}>{strings.classesModal.inputs.endDate}</InputLabel>
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(v) => field.onChange(v ? v.toDate() : null)}
                      sx={{ width: "100%", borderRadius: 1, color: "background.default" }}
                    />
                  )}
                />
              </Box>
            </Box>
            <Box
              gap={1}
              display="flex"
              flexDirection={isMobile ? "column" : "row"}
            >
              <Box flex={1}>
                <InputLabel sx={{ color: "text.primary" }}> {strings.classesModal.inputs.startTime} </InputLabel>
                <Controller
                  name="startTime"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(v) => field.onChange(v ? v.toDate() : null)}
                      ampm={false}
                      sx={{ width: "100%", borderRadius: 1, color: "background.default" }}
                    />
                  )}
                />
              </Box>
              <Box flex={1}>
                <InputLabel sx={{ color: "text.primary" }}>{strings.classesModal.inputs.endTime}</InputLabel>
                <Controller
                  name="endTime"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(v) => field.onChange(v ? v.toDate() : null)}
                      ampm={false}
                      sx={{ width: "100%", borderRadius: 1, color: "background.default" }}
                    />
                  )}
                />
              </Box>
            </Box>
          </Box>
        )}

        {activeStep === 1 && (
          <Box display="flex" flexDirection="column" gap={2}>
            <Filters
              label={strings.classesModal.inputs.searchActivity}
              name={activityName}
              onChange={setActivityName}
              placeholder={strings.classesModal.inputs.searchActivity}
            />
            <Controller
              name="isRecurrent"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      size="small"
                      sx={{ color: "primary.main" }}
                    />
                  }
                  label={strings.classesModal.recurring}
                />
              )}
            />
            <Divider />
            <FormControl sx={{ overflow: "auto", minHeight: 125, maxHeight: 250 }}>
              <Controller
                name="activityId"
                control={control}
                render={({ field }) => (
                  <>
                    {filteredActivities.map((activity) => (
                      <FormControlLabel
                        key={activity.id}
                        label={activity.name}
                        sx={{ borderBottom: "1px solid", borderBottomColor: "grey.300" }}
                        control={
                          <Radio
                            sx={{ color: "primary.main" }}
                            checked={field.value === activity.id}
                            onChange={(_, checked) => {
                              const currentSelection = field.value || [];
                              const newSelection = checked
                                ? activity.id
                                : currentSelection;
                              field.onChange(newSelection);
                            }}
                          />
                        }
                      />
                    ))}
                  </>
                )}
              />
            </FormControl>
          </Box>
        )}

        {activeStep === 2 && (
          <Box display="flex" flexDirection="column" gap={2}>
            <Filters
              label={strings.classesModal.inputs.assignTeacher}
              name={nameTeacher}
              onChange={setNameTeacher}
              placeholder={strings.classesModal.inputs.searchTeacher}
            />
            <FormControl sx={{ overflow: "auto", minHeight: 125, maxHeight: 250 }}>
              <Controller
                name="teacherIds"
                control={control}
                render={({ field }) => (
                  <>
                    {filteredTeachers.map((teacher) => (
                      <FormControlLabel
                        key={teacher.id}
                        label={teacher.fullName}
                        sx={{ borderBottom: "1px solid", borderBottomColor: "grey.300" }}
                        control={
                          <Checkbox
                            sx={{ color: "primary.main" }}
                            checked={
                              field.value.includes(teacher.id)
                            }
                            onChange={(_, checked) => {
                              const currentSelection = field.value;
                              const newSelection = checked
                                ? [...currentSelection, teacher.id]
                                : currentSelection.filter(
                                  (id) => id !== teacher.id
                                );
                              field.onChange(newSelection);
                            }}
                          />
                        }
                      />
                    ))}
                  </>
                )}
              />
            </FormControl>
          </Box>
        )}

        {activeStep === 3 && (
          <Box display="flex" flexDirection="column" gap={2}>
            <Filters
              label={strings.classesModal.inputs.addStudent}
              name={nameStudent}
              onChange={setNameStudent}
              placeholder={strings.classesModal.inputs.searchStudent}
            />
            <FormControl
              sx={{
                overflow: "auto",
                minHeight: 125,
                maxHeight: 250,
              }}
            >
              <Controller
                name="studentIds"
                control={control}
                render={({ field }) => (
                  <>
                    {filteredStudents.map((student) => (
                      <FormControlLabel
                        key={student.id}
                        label={student.fullName}
                        sx={{ borderBottom: "1px solid", borderBottomColor: "grey.300" }}
                        control={
                          <Checkbox
                            sx={{ color: "primary.main" }}
                            checked={
                              field.value.includes(student.id)
                            }
                            onChange={(_, checked) => {
                              const currentSelection = field.value;
                              const newSelection = checked
                                ? [...currentSelection, student.id]
                                : currentSelection.filter(
                                  (id) => id !== student.id
                                );
                              field.onChange(newSelection);
                            }}
                          />
                        }
                      />
                    ))}
                  </>
                )}
              />
            </FormControl>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        {activeStep > 0 && (
          <Button onClick={handleBack} variant="text" color="inherit">
            {strings.classesModal.buttons.back}
          </Button>
        )}
        <Button
          variant="contained"
          onClick={isLastStep ? handleSubmit : handleNext}
        >
          {isLastStep ? strings.classesModal.buttons.create : strings.classesModal.buttons.next}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
