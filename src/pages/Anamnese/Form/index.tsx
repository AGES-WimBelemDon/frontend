import { Box, Button } from "@mui/material";
import { useParams } from "react-router";

import { TextInput } from "../../../components/Inputs/TextInput";
import { PageTitle } from "../../../components/PageTitle";
import { strings } from "../../../constants";
import { useScreenSize } from "../../../hooks/useScreenSize";

const AnamnesisForm = () => {
  const forms: { id: number; questions: string[] }[] = [
    {
      id: 1,
      questions: [
        "Pergunta 1",
        "Pergunta 2",
        "Pergunta 3",
        "Pergunta 4",
        "Pergunta 5",
        "Pergunta 6",
        "Pergunta 7",
        "Pergunta 8",
      ],
    },
    {
      id: 2,
      questions: [
        "Pergunta 8",
        "Pergunta 9",
        "Pergunta 10",
        "Pergunta 11",
        "Pergunta 12",
        "Pergunta 13",
        "Pergunta 14",
      ],
    },
  ];

  const formId = useParams().id;
  const form = forms.find((f) => f.id.toString() === formId);
  const { isDesktop, isMobile } = useScreenSize();
  const gridCols = isMobile ? 1 : isDesktop ? 3 : 2;

  return (
    <>
      <PageTitle title={strings.anamnesis.title} dataCy="anamnesis-form" />
      {form ? (
        <form>
          <Box
            display={"grid"}
            gridTemplateColumns={`repeat(${gridCols}, 1fr)`}
            gap={5}
          >
            {form?.questions.map((question, index) => (
              <TextInput
                key={`${form.id}-${index}`}
                id={`${form.id}-${index}`}
                label={question}
              />
            ))}
          </Box>
          <Box display={"flex"} gap={2} justifyContent={"end"} marginTop={5}>
            <Button variant="outlined">Pular</Button>
            <Button variant="contained" type="submit">
              Salvar
            </Button>
          </Box>
        </form>
      ) : (
        <p>O Formulário que você está procurando não existe!</p>
      )}
    </>
  );
};

export default AnamnesisForm;
