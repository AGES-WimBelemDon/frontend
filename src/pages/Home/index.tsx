import { Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router";

import { CardList } from "../../components/CardList";
import { TextCard } from "../../components/TextCard";
import { useAuth } from "../../hooks/useAuth";

const cards = [
  { title: "Realizar Chamada", goTo: "frequencias/atividades", disabled: false },
  { title: "Gerenciar Turmas", goTo: "turmas", disabled: true },
  { title: "Gerenciar Alunos", goTo: "alunos", disabled: true },
  { title: "Gerenciar Atividades", goTo: "atividades", disabled: false },
  { title: "Gerenciar Usuários", goTo: "usuarios", disabled: false },
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
        {cards.sort((card) => card.disabled ? 1 : -1 ).map((card) => (
          <TextCard
            key={card.title}
            title={card.title}
            theme="light"
            onClick={() => navigate(card.goTo)}
            disabled={card.disabled}
          />
        ))}
      </CardList>
    </>
  );
}
