import * as React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
  Avatar,
  Button,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

type Responsible = {
  id: string;
  nome: string;
  cpf: string;
  nascimento: string;
  estadoCivil: string;
  nis: string;
  telefone: string;
  email: string;
  endereco: string;
};

const wbGreen = "#9AC77A";
const wbTeal = "#167A7A";

function InfoLine({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
      <Typography component="span" sx={{ fontWeight: 700, color: "#19806a" }}>
        {label}:{" "}
      </Typography>
      <Typography component="span" sx={{ color: "text.primary" }}>
        {value}
      </Typography>
    </Typography>
  );
}

function ResponsibleCard({
  data,
  onEdit,
}: {
  data: Responsible;
  onEdit: (id: string) => void;
}) {
  return (
    <Card
      elevation={3}
      sx={{
        width: "100%",
        maxHeight: 210,
        borderRadius: 3,
        px: 1,
        py: 0.5,
        bgcolor: "#FAFAFA",
      }}
    >
      <CardContent sx={{ py: 2 }}>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item>
            <Avatar
              variant="rounded"
              sx={{
                width: 125,
                height: 150,
                bgcolor: "#E7EFE8",
                color: "#879C88",
                fontWeight: 700,
                borderRadius: 2,
              }}
            >
              {data.nome
                .split(" ")
                .slice(0, 2)
                .map((s) => s[0]?.toUpperCase())
                .join("")}
            </Avatar>
          </Grid>

          <Grid item xs>
            <Stack spacing={0.25}>
              <InfoLine label="Nome" value={data.nome} />
              <InfoLine label="CPF" value={data.cpf} />
              <InfoLine label="Nascimento" value={data.nascimento} />
              <InfoLine label="Estado Civil" value={data.estadoCivil} />
              <InfoLine label="NIS" value={data.nis} />
            </Stack>
          </Grid>

          <Grid item xs>
            <Stack spacing={0.25}>
              <InfoLine label="Telefone" value={data.telefone} />
              <InfoLine label="Email" value={data.email} />
              <InfoLine label="Endereço" value={data.endereco} />
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 0.5 }}>
          <Button
            size="small"
            variant="contained"
            onClick={() => onEdit(data.id)}
            endIcon={<EditIcon fontSize="small" />}
            sx={{
              textTransform: "none",
              borderRadius: 999,
              px: 1.5,
              py: 0.4,
              fontWeight: 700,
              bgcolor: wbTeal,
              ":hover": { bgcolor: "#0f5d5d" },
            }}
          >
            Editar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function ResponsibleRegistration() {
  const [lista] = React.useState<Responsible[]>([
    {
      id: "1",
      nome: "João Pedro Bauer",
      cpf: "012.345.678-90",
      nascimento: "08/08/1964",
      estadoCivil: "Casado",
      nis: "123.4567890-1",
      telefone: "51-986027476",
      email: "joaosigmund@gmail.com",
      endereco: "Rua Portugal 245, Jardim Itu",
    },
  ]);

  function handleEdit(id: string) {
    console.log("editar", id);
  }

  return (
    <Box sx={{ px: 4, pb: 12 }}>
      {/* Título */}
      <Typography
        variant="h5"
        sx={{
          width: "100%",
          fontWeight: 700,
          fontSize: 32,
          color: "#196a6a",
          position: "relative",
          pb: 1.25,
          mb: 5,
          "::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: -24,
            right: 0,
            height: 4,
            bgcolor: wbGreen,
            borderRadius: 5,
          },
        }}
      >
        Cadastro – Responsáveis
      </Typography>

      {/* 🔽 Tudo abaixo alinhado à esquerda */}
      <Box sx={{ maxWidth: 720 }}>
        {/* Subtítulo */}
        <Typography
          variant="h6"
          sx={{
            width: "100%",
            fontWeight: 1000,
            fontSize: 20,
            color: "#196a6a",
            position: "relative",
            pb: 1.25,
            mb: 2,
            "::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: -16,
              width: "75%",
              height: 2,
              bgcolor: wbGreen,
              borderRadius: 5,
            },
          }}
        >
          Responsáveis Atuais
        </Typography>

        {/* Lista de cards */}
        <Stack spacing={2}>
          {lista.map((r) => (
            <ResponsibleCard key={r.id} data={r} onEdit={handleEdit} />
          ))}
        </Stack>

        {/* Botão "+" abaixo dos cards */}
        <Box sx={{ mt: 2 }}>
          <Fab
            aria-label="adicionar"
            sx={{
              width: 48,
              height: 48,
              minHeight: "unset",
              bgcolor: "#FFFFFF",
              color: "#6AA653",
              borderRadius: 2,
              boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
              border: "2px solid #9AC77A",
              ":hover": { bgcolor: "#DCF0D4" },
            }}
            size="medium"
          >
            <AddIcon />
          </Fab>
        </Box>
      </Box>

      {/* Footer fixo */}
      <Box
        sx={{
          position: "fixed",
          right: 24,
          bottom: 24,
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: 999,
            px: 3,
            py: 1,
            fontWeight: 700,
            borderWidth: 2,
            color: wbTeal,
            borderColor: wbTeal,
            ":hover": {
              borderWidth: 2,
              borderColor: "#0f5d5d",
              color: "#0f5d5d",
            },
          }}
          onClick={() => console.log("cancelar")}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: 999,
            px: 3,
            py: 1,
            fontWeight: 700,
            bgcolor: wbTeal,
            ":hover": { bgcolor: "#0f5d5d" },
          }}
          onClick={() => console.log("avançar")}
        >
          Avançar
        </Button>
      </Box>
    </Box>
  );
}