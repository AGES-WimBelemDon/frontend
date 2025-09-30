import { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";

import type { PersonCardData } from "./interface";
import userImg from "../../assets/userImg.png";
import { pt } from "../../constants";
import { useScreenSize } from "../../hooks/useScreenSize";

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

  const { isMobile } = useScreenSize();

  const dataEntries = [
    { label: pt.personCard.name, value: cardData.name },
    { label: pt.personCard.cpf, value: cardData.cpf },
    { label: pt.personCard.birthDate, value: cardData.birthDate },
    { label: pt.personCard.civilState, value: cardData.civilState },
    { label: pt.personCard.nis, value: cardData.nis },
    { label: pt.personCard.phone, value: cardData.phone },
    { label: pt.personCard.email, value: cardData.email },
    { label: pt.personCard.address, value: cardData.address },
  ]

  return (
    <Card
      sx={{
        gap: 2,
        display: "flex",
        flexDirection: "row",
        borderRadius: 3,
        boxShadow: 3,
        width: "100% ",
        backgroundColor: "background.default",
        padding: 1.5,
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: "9vh", height: "100%", borderRadius: 3 }}
        image={userImg}
        alt={pt.personCard.userImageAlt}
      />
      <Box
        gap={1.2}
        rowGap={0}
        display={isMobile ? "grid" : "flex"}
        flexWrap="wrap"
        sx={{
          width: "100%",
          gridTemplateColumns: "1fr 1fr"
        }}
      >
        {dataEntries.map((entry, index) => (
          <Typography
            key={`${entry.label}-${entry.value}-${index}`}
            component="span"
            fontSize={isMobile ? 14 : 16}
          >
            <strong>{entry.label}</strong> {entry.value}
          </Typography>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "end",
          paddingRight: 1.1,
          paddingBottom: 1.1,
          paddingTop: 1.1,
        }}
      >
        <Button
          size="small"
          variant="contained"
          onClick={() =>
            setCardData({
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
          endIcon={
            <EditIcon
              fontSize={isMobile ? undefined : "medium"}
              sx={{ height: { xs: "0.8rem", sm: "100%"} }}
            />
          }
          sx={{
            textTransform: "none",
            fontSize: { xs: 8, sm: 15 },
            height: { xs: "1rem", sm: "1.8rem" },
            width: { xs: "100%", sm: "100%" },
            borderRadius: 4,
            padding: { xs: 0.4, sm: 1.5 },
            fontWeight: 700,
            bgcolor: "primary",
            ":hover": { bgcolor: "primary.dark" },
            ...(isMobile && {
              "& > span": {
                marginLeft: 0,
              },
            }),
          }}
        >
          {pt.personCard.editButton}
        </Button>
      </Box>
    </Card>
  );
}
