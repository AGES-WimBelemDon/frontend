import { Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router";

import { CardList } from "../../components/CardList";
import { sidebarOptionsMapper } from "../../components/Sidebar/interface";
import { TextCard } from "../../components/TextCard";
import { useAuth } from "../../hooks/useAuth";
import type { ValidRoute } from "../../hooks/useRoutes";

const cards: { title: string; goTo: ValidRoute }[] = [
  { title: "Realizar Chamada", goTo: "/frequencias/atividades" },
  { title: "Gerenciar Alunos", goTo: "/alunos" },
  { title: "Gerenciar Atividades", goTo: "/atividades" },
  { title: "Gerenciar Turmas", goTo: "/turmas" },
  { title: "Gerenciar Usuários", goTo: "/usuarios" },
];

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Typography
        width="100%"
        variant="h5"
        fontWeight="bold"
        textAlign="center"
      >
        Bem vindo(a) de volta
        {!user?.displayName
          ? "!"
          : (
            <>
              <br />
              <Typography
                component="span"
                fontWeight="bold"
                fontSize={20}
              >
                {user.displayName}!
              </Typography>
            </>
          )
        }
      </Typography>

      <Divider sx={{ my: 2, width: "100%" }} />

      <CardList>
        {cards.map((card) => (
          <TextCard
            key={card.title}
            title={card.title}
            theme="light"
            onClick={() => navigate(card.goTo)}
            icon={sidebarOptionsMapper[card.goTo]?.icon}
          />
        ))}
      </CardList>
    </>
  );
}
