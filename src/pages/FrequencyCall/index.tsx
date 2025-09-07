import { Box, Divider, Input, Typography } from "@mui/material";

export function FrequencyCall() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        padding: 2.5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: { md: "left", xs: "center" },
          paddingBottom: 4.5,
        }}
      >
        Realizar Chamada
      </Typography>
        
        <Input type=''></Input>
      <Divider
        sx={{
          bgcolor: "primary.main",
          height: 2,
          width: "100%",
        }}
      ></Divider>
    </Box>
  );
}
