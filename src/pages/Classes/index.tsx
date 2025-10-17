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
  MenuItem,
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
import { useToast } from "../../hooks/useToast";

export default function Classes() {
  const {
    isLoadingClasses,
    classesError,
    deviceSize,
    goTo,
    activities,
    activityFilter,
    setActivityFilter,
    levelFilter,
    setLevelFilter,
    levelOptions,
    filteredClasses,
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
      <Box
        gap={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={deviceSize === "mobile" ? "column" : "row"}
      >
        <PageTitle title={strings.classes.title} dataCy="classes-page" />
      </Box>

      <Box
        gap={2}
        display="flex"
        flexDirection={deviceSize === "mobile" ? "column" : "row"}
      >
        <FormControl fullWidth>
          <FormLabel sx={{ mb: 1, color: "text.primary" }}>
            {strings.classes.activity}
          </FormLabel>
          <Autocomplete
            options={activities || []}
            getOptionLabel={(option) => option.name}
            value={activities?.find((a) => a.id === activityFilter) || null}
            onChange={(_, newValue) => setActivityFilter(newValue?.id || null)}
            renderInput={(params) => <TextField {...params} />}
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel sx={{ mb: 1, color: "text.primary" }}>
            {strings.classes.level}
          </FormLabel>
          <TextField
            select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            fullWidth
          >
            <MenuItem value="">{strings.filters.all}</MenuItem>
            {levelOptions?.map((level) => (
              <MenuItem key={level.id} value={level.id}>
                {level.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Box>

      <Box mt={2} mb={2}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => goTo("/turmas", "/cadastro")}
          sx={{
            borderWidth: 2,
            borderRadius: 2,
            borderColor: "primary.main",
            fontWeight: "bold",
          }}
        >
          {strings.classes.createClass}
        </Button>
      </Box>

      <CardList>
        {filteredClasses.map((c) => (
          <Card
            key={c.id}
            sx={{
              backgroundColor: "background.default",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "grey.400",
              boxShadow: "none",
              p: 2,
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box display="flex" alignItems="center" gap={3} mb={1}>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Event sx={{ color: "primary.main", fontSize: 20, fontWeight: "bold"}} />
                  <Typography
                    variant="body2"
                    color="text.primary"
                    fontWeight= "bold"
                  >
                    {c.weekDay}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={0.5}>
                  <AccessTime sx={{ color: "primary.main", fontSize: 20, fontWeight: "bold"}} />
                  <Typography
                    variant="body2"
                    color="text.primary"
                    fontWeight= "bold"
                  >
                    {c.schedule}
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="h6"
                color="primary.main"
                fontWeight= "bold"
                mb={1}
              >
                {c.title}
              </Typography>

              <Typography variant="body2" color="text.primary">
                <strong>{strings....}</strong> {c.level}
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>Responsável:</strong> {c.teacher}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </CardList>
    </>
  );
}
