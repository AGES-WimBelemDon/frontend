import { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Card, Typography } from "@mui/material";

import type { PersonCardProps } from "./interface";
import { strings } from "../../constants";
import { useScreenSize } from "../../hooks/useScreenSize";

export function PersonCard(personCardProps: PersonCardProps) {
  const cardData = personCardProps;
  const { isMobile } = useScreenSize();
  const [showMore, setShowMore] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleCardClick = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setShowMore(!showMore);
      setIsFlipping(false);
    }, 300);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Previne que o clique no botão dispare o flip do card
    if (cardData.id && cardData.onEditClick) {
      cardData.onEditClick(cardData.id);
    }
  };

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString("pt-BR");
  }

  const dataEntries = [
    { label: strings.personCard.registrationNumber, value: cardData.registrationNumber },
    { label: strings.personCard.relationship, value: cardData.relationship },
    { label: strings.personCard.dateOfBirth, value: formatDate(cardData.dateOfBirth) },
    { label: strings.personCard.nis, value: cardData.nis },
    { label: strings.personCard.phoneNumber, value: cardData.phoneNumber },
    { label: strings.personCard.email, value: cardData.email },
    { label: strings.personCard.race, value: cardData.race },
    { label: strings.personCard.gender, value: cardData.gender },
    { label: strings.personCard.educationLevel, value: cardData.educationLevel },
    { label: strings.personCard.socialPrograms, value: cardData.socialPrograms },
    { label: strings.personCard.employmentStatus, value: cardData.employmentStatus },
    { label: strings.personCard.address, value: cardData.address },
  ];

  return (
    <Card
      sx={{
        gap: 0,
        borderRadius: 3,
        boxShadow: 3,
        width: "100% ",
        backgroundColor: "background.default",
        padding: 1.5,
        transformStyle: "preserve-3d",
        transition: "transform 0.4s",
        transform: isFlipping ? "rotateY(90deg)" : "rotateY(0deg)",
        ":hover": { cursor: "pointer" }
      }}
      onClick={handleCardClick}
    >
      <Typography fontSize={isMobile ? 16 : 20} width="100%">
        <strong>{cardData.fullName}</strong>
        <strong>{cardData.socialName ? " (" + cardData.socialName + ")" : ""}</strong>
      </Typography>
      <Box
        gap={1}
        rowGap={0}
        display={showMore ? "grid" : "flex"}
        gridTemplateColumns={showMore ? "1fr 1fr 1fr" : "none"}
        width="100%"
      >
        {showMore ? dataEntries.map((entry, index) => (
          <Typography
            key={`${entry.label}-${entry.value}-${index}`}
            component="span"
            fontSize={isMobile ? 14 : 16}
          >
            <strong>{entry.label}</strong> {entry.value}
          </Typography>
        )) :
          <Box width="100%" display={"block"} >
            <Typography fontSize={16} width="100%">
              <strong>{strings.personCard.relationship}</strong> {cardData.relationship}
            </Typography>
            <Typography fontSize={16} width="100%">
              <strong>{strings.personCard.phoneNumber}</strong> {cardData.phoneNumber}
            </Typography>
            <Typography fontSize={16} width="100%">
              <strong>{strings.personCard.registrationNumber}</strong> {cardData.registrationNumber}
            </Typography>
          </Box>
        }
        {!showMore ? 
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
              onClick={handleEditClick}
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
          : <></>}
      </Box>
    </Card >
  );
}
