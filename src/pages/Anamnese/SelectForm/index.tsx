import type { FormCard } from "./interface";
import { CardList } from "../../../components/CardList";
import { PageTitle } from "../../../components/PageTitle";
import { TextCard } from "../../../components/TextCard";
import { strings } from "../../../constants";
import { useRoutes } from "../../../hooks/useRoutes";

export default function SelectForm() {
  const cards: FormCard[] = [
    { id: 1, title: "Psico" },
    { id: 2, title: "Serviço Social" },
  ];
  const { goTo } = useRoutes();

  return (
    <>
      <PageTitle title={strings.anamnesis.title} dataCy="anamnesis-form" />
      <CardList>
        {cards.map((card) => (
          <TextCard
            key={card.id}
            title={card.title}
            theme="light"
            onClick={() => goTo("/anamnese", `/form/${card.id}`)}
          />
        ))}
      </CardList>
    </>
  );
};
