import HomeIcon from "@mui/icons-material/Home";
import { Button, Container, Stack, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router";

import UserProfile from "./Profile";
import { Header } from "../../components/Header";
import { TextCard } from "../../components/TextCard";
import { pt } from "../../constants";

function TechDemo() {
  const navigate = useNavigate();

  function showAPIInfo() {
    navigate("2?c2=4");
  }

  return ( 
    <>
      <Header/>
      <Container maxWidth="md">
        <Stack>
          <Typography variant="h1" data-cy="tech-demo-title">{pt.techDemo.title}</Typography>
          <Button
            onClick={showAPIInfo}
            variant="contained"
            color="primary"
            data-cy="tech-demo-show-api-info-button"
          >
            <Typography variant="body1">{pt.techDemo.showAPIInfo}</Typography>
          </Button>
        </Stack>
        <TextCard
          title="Home"
          theme="dark"
          icon={<HomeIcon />}
          onClick={() => console.log("clicou") }
        />
        <TextCard
          title="Home"
          theme="light"
          icon={<HomeIcon />}
        />
        <UserProfile />
        <Outlet />
      </Container>
    </>
  );
}

export default TechDemo;
