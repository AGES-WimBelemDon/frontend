import { useEffect, useContext } from "react";

import {
  Add as AddIcon,
  Event,
  AccessTime,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Autocomplete,
  CircularProgress,
  FormControl,
  FormLabel,
} from "@mui/material";

import { useClassesPage } from "./hook";
import { CardList } from "../../components/CardList";
import { PageTitle } from "../../components/PageTitle";
import { strings } from "../../constants";
import { ClassesModalContext } from "../../contexts/ClassesModal/ClassesModalContext";
import { useToast } from "../../hooks/useToast";

export default function Classes() {
  const { openModal } = useContext(ClassesModalContext);

  const {
    isLoadingClasses,
    classesError,
    isMobile,
    activities,
    activityFilter,
    setActivityFilter,
    setLevelFilter,
    levelOptions,
    filteredClasses,
    handleClassClick,
  } = useClassesPage();

  const { showToast } = useToast();

  useEffect(
    function handleShowErrorToast() {
      if (classesError) {
        showToast("Erro ao carregar turmas", "error");
      }
    },
    [classesError, showToast]
  );

  if (isLoadingClasses) {
    return (
      <>
        <CircularProgress />
        <Typography>{strings.classes.loadingClasses}</Typography>
      </>
    );
  }

  if (classesError) {
    return (
      <Typography color="error">
        {strings.classes.classesError}
      </Typography>
    );
  }

  return (
    <>
      <PageTitle title={strings.classes.title} dataCy="classes-page" />

      <Box
        gap={3}
        display="flex"
        flexDirection="column"
      >
        <Box
          gap={2}
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
        >
          <FormControl fullWidth
            sx={{
              gap: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormLabel>
              <Typography color="primary">
                {strings.classes.activity}
              </Typography>
            </FormLabel>
            <Autocomplete
              options={activities || []}
              getOptionLabel={(option) => option.name}
              value={activities?.find((a) => String(a.id) === activityFilter) || null}
              onChange={(_, newValue) => setActivityFilter(newValue ? String(newValue.id) : null)}
              data-cy="classes-filter-activity"
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
          <FormControl fullWidth
            sx={{
              gap: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormLabel>
              <Typography color="primary">
                {strings.classes.level}
              </Typography>
            </FormLabel>
            <Autocomplete
              options={levelOptions || []}
              getOptionLabel={(option) => option.name}
              onChange={(_, newValue) => setLevelFilter(newValue)}
              renderInput={(params) => <TextField {...params} />}
              data-cy="classes-filter-level"
            />
          </FormControl>
        </Box>

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => openModal()}
          sx={{
            alignSelf: isMobile ? "auto" : "flex-start",
          }}
          data-cy="classes-create-button"
        >
          <Typography fontWeight="bold" variant="button">
            {strings.classes.createClass}
          </Typography>
        </Button>

        <CardList>
          {filteredClasses.map((c) => (
            <Card
              key={c.id}
              onClick={() => handleClassClick(String(c.id))}
              sx={{
                backgroundColor: "background.default",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "grey.400",
                boxShadow: "none",
              }}
              data-cy={`class-card-${c.id}`}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={3} mb={1}>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Event sx={{ color: "primary.main", fontSize: 20, fontWeight: "bold" }} />
                    {c.schedules.map(schedule => (
                      <Typography
                        key={schedule.id}
                        variant="body2"
                        color="text.primary"
                        fontWeight="bold"
                      >
                        {schedule.dayOfWeek}
                      </Typography>
                    ))}
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <AccessTime sx={{ color: "primary.main", fontSize: 20, fontWeight: "bold" }} />
                    <Typography
                      variant="body2"
                      color="text.primary"
                      fontWeight="bold"
                    >
                      {c.startTime.toString()} - {c.endTime.toString()}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="h6"
                  color="primary.main"
                  fontWeight="bold"
                  mb={1}
                >
                  {c.name}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  <strong>{strings.classes.card.level}</strong>{" "}{c.levelId}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  <strong>{strings.classes.card.teachers}</strong>{" "}
                  {c.teachers.map((teacher) => teacher.fullName).join(", ")}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </CardList>
      </Box>
    </>
  );
}
