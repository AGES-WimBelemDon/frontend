import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Fab, Stack, Typography } from "@mui/material";

import { NewResponsibleModal } from "../../components/NewResponsibleModal";
import { useNewResponsibleModal } from "../../components/NewResponsibleModal/hook";
import { PersonCard } from "../../components/PersonCard";
import type { PersonCardData } from "../../components/PersonCard/interface";

export default function ResponsibleRegistration() {
  
  const personCardList: (PersonCardData & { id: number })[] = [
    {
      id: 1,
      name: "Leonardo Scheidt",
      cpf: "123.456.789-00",
      birthDate: "1990-05-15",
      civilState: "Solteiro(a)",
      nis: "12345678900",
      phone: "(11) 91234-5678",
      email: "leonardo@example.com",
      address: "Rua A, 123, São Paulo, SP",
    },
    {
      id: 2,
      name: "Maria Silva",
      cpf: "987.654.321-00",
      birthDate: "1985-10-22",
      civilState: "Casado(a)",
      nis: "98765432100",
      phone: "(21) 99876-5432",
      email: "maria.silva@example.com",
      address: "Avenida B, 456, Rio de Janeiro, RJ",
    },
    {
      id: 3,
      name: "Carlos Oliveira",
      cpf: "111.222.333-44",
      birthDate: "1978-03-08",
      civilState: "Divorciado(a)",
      nis: "11122233344",
      phone: "(31) 98765-4321",
      email: "carlos.oliveira@example.com",
      address: "Rua C, 789, Belo Horizonte, MG",
    },
  ];

  const {openModal} = useNewResponsibleModal();

  return (
    <Box sx={{ px: 4, pb: 12 }}>
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
            bgcolor: "primary.main",
            borderRadius: 5,
          },
        }}
      >
        Cadastro - Responsáveis
      </Typography>

      <Box sx={{ maxWidth: 720 }}>
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
              bgcolor: "primary.main",
              borderRadius: 5,
            },
          }}
        >
          Responsáveis Atuais
        </Typography>

        <Stack spacing={2}>
          {personCardList.map((r) => (
            <PersonCard key={r.id}name={r.name} cpf={r.cpf} birthDate={r.birthDate} civilState={r.birthDate} nis={r.nis} phone={r.phone} email={r.email} address={r.address} />
          ))}
        </Stack>

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
            onClick={openModal}
          >
            <AddIcon sx={{color: "#9AC77A"}} />
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
            color: "primary.main",
            borderColor: "primary.main",
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
            bgcolor: "primary.main",
            ":hover": { bgcolor: "#0f5d5d" },
          }}
          onClick={() => console.log("avançar")}
        >
          Avançar
        </Button>
      </Box>
      <NewResponsibleModal/>
    </Box>
  );
}