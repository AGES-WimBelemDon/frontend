import { CardList } from "../../../components/CardList";
import { PageTitle } from "../../../components/PageTitle";
import { TextCard } from "../../../components/TextCard";
import { strings } from "../../../constants";
import { useRoutes } from "../../../hooks/useRoutes";
import { useAnamneseForm } from "../Form/useAnamneseForm";

export default function SelectForm() {
  const { formTypes, handleSelectFormType } = useAnamneseForm()
  const { goTo } = useRoutes();

  return (
    <>
      <PageTitle title={strings.anamnesis.title} dataCy="anamnesis-form" />
      <CardList>
        {formTypes.map((card) => (
          <TextCard
            key={card.id}
            title={card.title}
            theme="light"
            onClick={() => {
              handleSelectFormType(card.id)
              goTo("/anamnese", `/form/${card.id}`)
            }}
          />
        ))}
      </CardList>
    </>
  );
};
