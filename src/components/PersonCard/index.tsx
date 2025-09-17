import { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";

import type { PersonCardData } from "./interface";

export function PersonCard({
  name,
  cpf,
  birthDate,
  civilState,
  nis,
  phone,
  email,
  address,
}: PersonCardData) {
  const [cardData, setCardData] = useState<PersonCardData>({
    name,
    cpf,
    birthDate,
    civilState,
    nis,
    phone,
    email,
    address,
  });

  const onEdit = (newCard: PersonCardData) => {
    setCardData(newCard);
  };
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "9vh",
        width: "100% ",
        backgroundColor: "background.default",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: "9vh ", height: "100%", padding: 1.2, borderRadius: 3 }}
        image="public/userImg.png"
        alt="Ícone"
      />
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <Typography component="span" sx={{ padding: 1.6 }}>
          <strong>Nome:</strong> {cardData.name} <strong>CPF:</strong>{" "}
          {cardData.cpf} <strong>Nascimento:</strong> {cardData.birthDate}{" "}
          <strong>Estado Civil: </strong> {cardData.civilState}{" "}
          <strong>NIS: </strong> {cardData.nis} <strong>Telefone: </strong>{" "}
          {cardData.phone} <strong>Email: </strong> {cardData.email}{" "}
          <strong>Endereço: </strong> {cardData.address}{" "}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "end",
          p: 1.5,
        }}
      >
        <Button
          size="small"
          variant="contained"
          onClick={() =>
            onEdit({
              name: "New name",
              cpf: "New cpf",
              birthDate: "new date",
              civilState: "new state",
              nis: "new nis",
              phone: "New Phone",
              email: "New email",
              address: "New Address",
            })
          }
          endIcon={<EditIcon fontSize="small" />}
          sx={{
            textTransform: "none",
            height: "1.5rem",
            borderRadius: 4,
            px: 1.5,
            py: 0.4,
            fontWeight: 700,
            bgcolor: "wbTeal",
            ":hover": { bgcolor: "#0f5d5d" },
          }}
        >
          Editar
        </Button>
      </Box>
    </Card>
  );
}
