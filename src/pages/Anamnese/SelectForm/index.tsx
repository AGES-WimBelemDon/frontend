import { CardList } from "../../../components/CardList";
import { PageTitle } from "../../../components/PageTitle";
import { TextCard } from "../../../components/TextCard";
import { strings } from "../../../constants";
import { useRoutes } from "../../../hooks/useRoutes";
import { useAnamneseForm } from "../Form/useAnamneseForm";

export default function SelectForm() {
  const { formTypes } = useAnamneseForm()
  const { goTo } = useRoutes();

  return (
    <>
      <PageTitle title={strings.anamnesis.title} dataCy="anamnesis-form" />
      <CardList>
        {formTypes.map((card) => (
          <TextCard
            key={card.id}
            title={card.type}
            theme="light"
            onClick={() => goTo("/anamnese", `/form/${card.id}`)}
          />
        ))}
      </CardList>
    </>
  );
};
