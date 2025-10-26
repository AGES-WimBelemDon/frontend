import { useNavigate } from "react-router";

import { CardList } from "../../../components/CardList";
import { PageTitle } from "../../../components/PageTitle";
import { TextCard } from "../../../components/TextCard";
import { strings } from "../../../constants";

const SelectForm = () => {
  const cards: { id: number; title: string }[] = [
    { id: 1, title: "Psico" },
    { id: 2, title: "Serviço Social" },
  ];
  const navigate = useNavigate();

  return (
    <>
      <PageTitle title={strings.anamnesis.title} dataCy="anamnesis-form" />
      <CardList>
        {cards.map((card) => (
          <TextCard
            key={card.id}
            title={card.title}
            theme="light"
            onClick={() => navigate(`form/${card.id}`)}
          />
        ))}
      </CardList>
    </>
  );
};

export default SelectForm;
