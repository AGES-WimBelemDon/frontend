import { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";

import type { PersonCardProps } from "./interface";
import userImg from "../../assets/userImg.png";
import { pt } from "../../constants";
import { useScreenSize } from "../../hooks/useScreenSize";

export function PersonCard(personCardProps: PersonCardProps) {
  const [cardData, setCardData] = useState<PersonCardProps>(personCardProps);

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
        display="flex"
        alignItems="end"
        justifyContent="flex-end"
        padding={1}
      >
        <Button
          size="small"
          variant="contained"
          fullWidth
          onClick={() =>
            setCardData({
              name: "New name",
              cpf: "New cpf",
              birthDate: "New date",
              civilState: "New state",
              nis: "New nis",
              phone: "New phone",
              email: "New email",
              address: "New address",
            })
          }
          endIcon={<EditIcon />}
          sx={{
            textTransform: "none",
            fontSize: 15,
            fontWeight: "bold",
            borderRadius: 4,
            paddingY: 0.5,
            paddingX: 1.5,
          }}
        >
          {pt.personCard.editButton}
        </Button>
      </Box>
    </Card>
  );
}
