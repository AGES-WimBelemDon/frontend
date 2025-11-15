import { Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router";

import { CardList } from "../../components/CardList";
import { sidebarOptionsMapper } from "../../components/Sidebar/interface";
import { TextCard } from "../../components/TextCard";
import { strings } from "../../constants";
import { useAuth } from "../../hooks/useAuth";
import type { ValidRoute } from "../../hooks/useRoutes";

const cards: { title: string; goTo: ValidRoute }[] = [
  { title: strings.home.cards.takeAttendance, goTo: "/frequencias/atividades" },
  { title: strings.home.cards.manageStudents, goTo: "/alunos" },
  { title: strings.home.cards.manageAnamnesis, goTo: "/anamnese" },
  { title: strings.home.cards.manageActivities, goTo: "/atividades" },
  { title: strings.home.cards.manageClasses, goTo: "/turmas" },
  { title: strings.home.cards.manageUsers, goTo: "/usuarios" },
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
        {strings.home.welcomeBack}
        {!user?.fullName
          ? "!"
          : (
            <>
              <br />
              <Typography
                component="span"
                fontWeight="bold"
                fontSize={20}
              >
                {user.fullName}!
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
