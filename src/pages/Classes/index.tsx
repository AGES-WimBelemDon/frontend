import { useEffect } from "react";

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
import ClassesModal from "../../components/ClassesModal";
import { PageTitle } from "../../components/PageTitle";
import { strings } from "../../constants";
import { useToast } from "../../hooks/useToast";

export default function Classes() {
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
    openClassesModal,
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
              value={activities?.find((a) => a.id === activityFilter) || null}
              onChange={(_, newValue) => setActivityFilter(newValue?.id || null)}
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
              onChange={(_, newValue) => setLevelFilter(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
        </Box>

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={openClassesModal}
          sx={{
            alignSelf: isMobile ? "auto" : "flex-start",
          }}
        >
          <Typography fontWeight="bold" variant="button">
            {strings.classes.createClass}
          </Typography>
        </Button>

        <CardList>
          {filteredClasses.map((c) => (
            <Card
              key={c.id}
              onClick={() => handleClassClick(c.id)}
              sx={{
                backgroundColor: "background.default",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "grey.400",
                boxShadow: "none",
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={3} mb={1}>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Event sx={{ color: "primary.main", fontSize: 20, fontWeight: "bold" }} />
                    <Typography
                      variant="body2"
                      color="text.primary"
                      fontWeight="bold"
                    >
                      {c.weekDay}
                    </Typography>
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
                  {c.teachers.map(teacher => (
                    <>
                      <strong>{strings.classes.card.teacher}</strong>{" "}{teacher.fullName}
                    </>
                  ))}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </CardList>
      </Box>

      <ClassesModal />
    </>
  );
}
