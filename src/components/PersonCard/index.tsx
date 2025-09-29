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

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        borderRadius: 3,
        boxShadow: 3,
        height: "9vh",
        width: "100% ",
        backgroundColor: "background.default",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: "9vh", height: "100%", padding: 1.2, borderRadius: 3 }}
        image={userImg}
        alt={pt.personCard.userImageAlt}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {isMobile ? (
          <>
            <Box sx={{ width: "50%", paddingTop: 1.2 }}>
              <Typography
                component="div"
                sx={{ fontWeight: "normal", fontSize: 7 }}
              >
                <strong>{pt.personCard.name}</strong>
                {" "}{cardData.name}
              </Typography>
              <Typography
                component="div"
                sx={{ fontWeight: "normal", fontSize: 7 }}
              >
                <strong>{pt.personCard.cpf}</strong>
                {" "}{cardData.cpf}
              </Typography>
              <Typography
                component="div"
                sx={{ fontWeight: "normal", fontSize: 7 }}
              >
                <strong>{pt.personCard.birthDate}</strong>
                {" "}{cardData.birthDate}
              </Typography>
              <Typography
                component="div"
                sx={{ fontWeight: "normal", fontSize: 7 }}
              >
                <strong>{pt.personCard.civilState}</strong>
                {" "}{cardData.civilState}
              </Typography>
            </Box>

            <Box sx={{ width: "50%", paddingTop: 1.2 }}>
              <Typography
                component="div"
                sx={{ fontWeight: "normal", fontSize: 7 }}
              >
                <strong>{pt.personCard.nis}</strong>
                {" "}{cardData.nis}
              </Typography>
              <Typography
                component="div"
                sx={{ fontWeight: "normal", fontSize: 7 }}
              >
                <strong>{pt.personCard.phone}</strong>
                {" "}{cardData.phone}
              </Typography>
              <Typography
                component="div"
                sx={{ fontWeight: "normal", fontSize: 7 }}
              >
                <strong>{pt.personCard.email}</strong>
                {" "}{cardData.email}
              </Typography>
              <Typography
                component="div"
                sx={{ fontWeight: "normal", fontSize: 7 }}
              >
                <strong>{pt.personCard.address}</strong>
                {" "}{cardData.address}
              </Typography>
            </Box>
          </>
        ) : (
          <Typography
            component="span"
            sx={{ paddingTop: 1.2, fontWeight: "normal" }}
          >
            <strong>{pt.personCard.name}</strong>{" "}{cardData.name}{" "}
            <strong>{pt.personCard.cpf}</strong>{" "}{cardData.cpf}{" "}
            <strong>{pt.personCard.birthDate}</strong>{" "}{cardData.birthDate}{" "}
            <strong>{pt.personCard.civilState}</strong>{" "}{cardData.civilState}{" "}
            <strong>{pt.personCard.nis}</strong>{" "}{cardData.nis}{" "}
            <strong>{pt.personCard.phone}</strong>{" "}{cardData.phone}{" "}
            <strong>{pt.personCard.email}</strong>{" "}{cardData.email}{" "}
            <strong>{pt.personCard.address}</strong>{" "}{cardData.address}{" "}
          </Typography>
        )}
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
