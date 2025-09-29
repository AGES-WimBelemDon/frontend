import { useState } from "react";

import { Box, Typography, TextField, MenuItem, Button, Card, CardContent, Autocomplete } from "@mui/material";

import { CardList } from "../../components/CardList";
import { useActivities } from "../../hooks/useActivities";
import { useClasses } from "../../hooks/useClasses";
import { useRoutes } from "../../hooks/useRoutes";
import { useScreenSize } from "../../hooks/useScreenSize";

const daysOfWeek = [
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
  "Domingo"
];

const levels = [
  "Iniciante",
  "Intermediário",
  "Avançado"
];

export default function Classes (){
  const {classes, isLoadingClasses} = useClasses();
  const {activities} = useActivities();
  const {goTo} = useRoutes();
  const {deviceSize} = useScreenSize();

  
  //filtros
  const [activityFilter, setActivityFilter] = useState<string | null>(null);
  const [dayFilter, setDayFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  const FilteredClasses = classes?.filter((c) => {
    return(
      (!activityFilter || c.title.includes(activityFilter)) &&
      (!dayFilter || true) &&
      (!levelFilter || true)
    );
  });

  if (isLoadingClasses) return <p>Carregando turmas...</p>;

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
          onClick={() => goTo("/turmas/cadastro")}
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
          {daysOfWeek.map((d) => (
            <MenuItem key={d} value={d}>
              {d}
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
        {FilteredClasses?.map((cls) => (
          <Card key={cls.id}>
            <CardContent>
              <Typography variant="h6">{cls.title}</Typography>
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

