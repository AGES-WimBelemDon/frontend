import { Box, Typography, TextField, MenuItem, Button, Card, CardContent, Autocomplete } from "@mui/material";

import { useClassesPage } from "./hook";
import { CardList } from "../../components/CardList";

export default function Classes() {
  const {
    isLoadingClasses,
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
    return <p>Carregando turmas...</p>;
  }

  return(
    <Box p = {2}>
      <Box
        display = "flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={deviceSize === "mobile" ? "column" : "row"}
        mb={3}
        gap={2}
      >
        <Typography variant="h5" fontWeight="bold">
          Minhas Turmas
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => goTo("cadastro")}
        >
            Criar turma
        </Button>
      </Box>


      <Box
        display="flex"
        gap={2}
        flexDirection={deviceSize === "mobile" ? "column" : "row"}
        mb={3}
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
          label="Dia da Semana"
          value={dayFilter}
          onChange={(e) => setDayFilter(e.target.value)}
          fullWidth
        >
          <MenuItem value = "">Todos</MenuItem>
          {weekDays.map((weekDay) => (
            <MenuItem key={weekDay} value={weekDay}>
              {weekDay}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Nível"
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          fullWidth
        >
          <MenuItem value = "">Todos</MenuItem>
          {levels.map((lvl) => (
            <MenuItem key={lvl} value={lvl}>
              {lvl}
            </MenuItem>

          ))}
        </TextField>
      </Box>

      <CardList>
        {filteredClasses?.map((c) => (
          <Card key={c.id}>
            <CardContent>
              <Typography variant="h6">{c.title}</Typography>
              <Typography variant="body2">{"Dia da semana:"}</Typography>
              <Typography variant="body2">{"Horário:"}</Typography>
              <Typography variant="body2">{"Nível:"}</Typography>
            </CardContent>
          </Card>
        ))}
      </CardList>
    </Box>
  );
}

