import { useEffect } from "react";

import { Add as AddIcon } from "@mui/icons-material";
import { Box, Typography, TextField, MenuItem, Button, Card, CardContent, Autocomplete, CircularProgress } from "@mui/material";

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
    dayFilter,
    setDayFilter,
    weekDaysOptions,
    levelFilter,
    setLevelFilter,
    levelOptions,
    filteredClasses,
  } = useClassesPage()

  const { showToast } = useToast()

  useEffect(function handleShowErrorToast() {
    if (classesError) {
      showToast("Erro ao carregar turmas", "error")
    }
  }, [classesError, showToast])

  if (isLoadingClasses) {
    return (
      <>
        <CircularProgress />
        <Typography>{strings.classes.loadingClasses}</Typography>
      </>
    )
  }

  if (classesError) {
    return <Typography color="error">{strings.classes.classesError}</Typography>
  }

  return(
    <>
      <Box
        gap={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={deviceSize === "mobile" ? "column" : "row"}
      >
        <PageTitle title={strings.classes.title} dataCy="classes-page" />
        <Button
          disabled
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => goTo("/turmas", "/cadastro")}
        >
          {strings.classes.createClass}
        </Button>
      </Box>

      <Box
        gap={2}
        display="flex"
        flexDirection={deviceSize === "mobile" ? "column" : "row"}
      >
        <Autocomplete
          options={activities || []}
          getOptionLabel={(option) => option.name}
          value={activities?.find((a) => a.id === activityFilter) || null}
          onChange={(_, newValue) => setActivityFilter(newValue?.id || null)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Atividade"
              slotProps={{
                inputLabel: { sx: { color: "text.primary" } },
              }}
            />
          )}
          fullWidth
        />
 
        <TextField
          select
          label={strings.classes.weekDay}
          value={dayFilter}
          onChange={(e) => setDayFilter(e.target.value)}
          fullWidth
          slotProps={{
            inputLabel: { sx: { color: "text.primary" } },
          }}
        >
          <MenuItem value="">{strings.filters.all}</MenuItem>
          {weekDaysOptions?.map((weekDay) => (
            <MenuItem key={weekDay.id} value={weekDay.id}>
              {weekDay.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label={strings.classes.level}
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          fullWidth
          slotProps={{
            inputLabel: { sx: { color: "text.primary" } },
          }}
        >
          <MenuItem value="">{strings.filters.all}</MenuItem>
          {levelOptions?.map((level) => (
            <MenuItem key={level.id} value={level.id}>
              {level.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <br />

      <CardList>
        {filteredClasses.map((c) => (
          <Card key={c.id} sx={{ backgroundColor: "background.default" }}>
            <CardContent>
              <Typography variant="h6">{c.title}</Typography>
              <Typography variant="body2">{c.weekDay}</Typography>
              <Typography variant="body2">{c.schedule}</Typography>
              <Typography variant="body2">{c.level}</Typography>
            </CardContent>
          </Card>
        ))}
      </CardList>
    </>
  );
}

