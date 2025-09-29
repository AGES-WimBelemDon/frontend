import { Box, Typography, TextField, MenuItem, Button, Card, CardContent, Autocomplete } from "@mui/material";

import { useClassesPage } from "./hook";
import { CardList } from "../../components/CardList";
import { PageTitle } from "../../components/PageTitle";
import { pt } from "../../constants";

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
    weekDays,
    levelFilter,
    setLevelFilter,
    levels,
    filteredClasses,
  } = useClassesPage()

  if (isLoadingClasses) {
    return <Typography>{pt.classes.loadingClasses}</Typography>;
  }

  if (classesError) {
    return <Typography color="error">{pt.classes.classesError}</Typography>;
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
        <PageTitle title={pt.classes.title} dataCy="classes-page" />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => goTo("cadastro")}
        >
          {pt.classes.createClass}
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
          renderInput={(params) => <TextField {...params} label="Atividade"/>}
          fullWidth
        />

        <TextField
          select
          label={pt.classes.weekDay}
          value={dayFilter}
          onChange={(e) => setDayFilter(e.target.value)}
          fullWidth
        >
          <MenuItem value="">{pt.filters.all}</MenuItem>
          {weekDays.map((weekDay) => (
            <MenuItem key={weekDay} value={weekDay}>
              {weekDay}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label={pt.classes.level}
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          fullWidth
        >
          <MenuItem value="">{pt.filters.all}</MenuItem>
          {levels.map((lvl) => (
            <MenuItem key={lvl} value={lvl}>
              {lvl}
            </MenuItem>

          ))}
        </TextField>
      </Box>

      <br />

      <CardList>
        {filteredClasses.map((c) => (
          <Card key={c.id}>
            <CardContent>
              <Typography variant="h6">{c.title}</Typography>
              <Typography variant="body2">{pt.classes.weekDay}</Typography>
              <Typography variant="body2">{pt.classes.schedule}</Typography>
              <Typography variant="body2">{pt.classes.level}</Typography>
            </CardContent>
          </Card>
        ))}
      </CardList>
    </>
  );
}

