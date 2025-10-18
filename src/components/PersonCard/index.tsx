import { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";

import type { PersonCardProps } from "./interface";
import userImg from "../../assets/userImg.png";
import { strings } from "../../constants";
import { useScreenSize } from "../../hooks/useScreenSize";

export function PersonCard(personCardProps: PersonCardProps) {
  const [cardData, setCardData] = useState<PersonCardProps>(personCardProps);
  const { isMobile } = useScreenSize();

  const dataEntries = [
    { label: strings.personCard.fullName, value: cardData.fullName },
    { label: strings.personCard.socialName, value: cardData.socialName },
    { label: strings.personCard.registrationNumber, value: cardData.registrationNumber },
    { label: strings.personCard.dateOfBirth, value: cardData.dateOfBirth },
    { label: strings.personCard.nis, value: cardData.nis },
    { label: strings.personCard.phoneNumber, value: cardData.phoneNumber },
    { label: strings.personCard.email, value: cardData.email },
    { label: strings.personCard.address, value: cardData.address },
    { label: strings.personCard.relationship, value: cardData.relationship },
    { label: strings.personCard.race, value: cardData.race },
    { label: strings.personCard.gender, value: cardData.gender },
    { label: strings.personCard.educationLevel, value: cardData.educationLevel },
    { label: strings.personCard.socialPrograms, value: cardData.socialPrograms },
    { label: strings.personCard.employmentStatus, value: cardData.employmentStatus },
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
        alt={strings.personCard.userImageAlt}
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
              fullName: "New Full Name",
              socialName: "New Social Name",
              registrationNumber: "New CPF",
              dateOfBirth: "New Date of Birth",
              nis: "New NIS",
              phoneNumber: "New Phone Number",
              email: "New Email",
              address: "New Address",
              relationship: "New Relationship",
              race: "New Race",
              gender: "New Gender",
              educationLevel: "New Education Level",
              socialPrograms: "New Social Programs",
              employmentStatus: "New Employment Status"
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
          {strings.genericActions.edit}
        </Button>
      </Box>
    </Card>
  );
}
