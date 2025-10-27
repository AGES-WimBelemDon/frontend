import { Box, Button, Select, MenuItem, TextField, FormControl, InputLabel } from "@mui/material";
import dayjs from "dayjs";

import { PageTitle } from "../../../components/PageTitle";
import { strings } from "../../../constants";
import { useAnamneseForm } from "./useAnamneseForm";
import { useScreenSize } from "../../../hooks/useScreenSize";

const AnamnesisForm = () => {
  const {
    forms,
    questions,
    formId,
    responses,
    isCreating,
    handleResponseChange,
    handleSubmit,
    handleCreateNew,
    handleFormChange,
  } = useAnamneseForm();
  const { isDesktop, isMobile } = useScreenSize();
  const gridCols = isMobile ? 1 : isDesktop ? 3 : 2;

  return (
    <>
      <PageTitle title={strings.anamnesis.title} dataCy="anamnesis-form" />
      <Box display={"flex"} justifyContent={"end"} alignItems={"center"} gap={2} marginBottom={3}>
        <FormControl variant="standard" sx={{ minWidth: 150 }}>
          <InputLabel>{strings.anamnesis.previousForms}</InputLabel>
          <Select value={formId || ""} onChange={(e) => handleFormChange(e.target.value)}>
            {forms.map((form) => (
              <MenuItem key={form.id} value={form.id}>
                {dayjs(form.date).format("DD/MM/YYYY")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={handleCreateNew}>{strings.anamnesis.createNew}</Button>
      </Box>

      {(formId || isCreating) ? (
        <form onSubmit={handleSubmit}>
          <Box
            display={"grid"}
            gridTemplateColumns={`repeat(${gridCols}, 1fr)`}
            gap={5}
          >
            {questions.map((question) => (
              <TextField
                key={question.id}
                id={question.id}
                label={question.statement}
                variant="standard"
                value={responses[question.id] || ""}
                onChange={(e) => handleResponseChange(question.id, e.target.value)}
              />
            ))}
          </Box>
          <Box display={"flex"} gap={2} justifyContent={"end"} marginTop={5}>
            <Button variant="outlined">{strings.anamnesis.skip}</Button>
            <Button variant="contained" type="submit">
              {strings.anamnesis.save}
            </Button>
          </Box>
        </form>
      ) : (
        <p>{strings.anamnesis.selectOrCreate}</p>
      )}
    </>
  );
};

export default AnamnesisForm;

