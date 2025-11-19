import { Box, Button, Select, MenuItem, TextField, FormControl, InputLabel } from "@mui/material";
import dayjs from "dayjs";

import { useAnamneseForm } from "./useAnamneseForm";
import { CardList } from "../../../components/CardList";
import { PageTitle } from "../../../components/PageTitle";
import { strings } from "../../../constants";
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

  const { isMobile } = useScreenSize()

  return (
    <>
      <PageTitle title={strings.anamnesis.title} dataCy="anamnesis-form" />
      <Box
        gap={2}
        display="flex"
        alignItems="center"
        pb={3}
      >
        <Button variant="outlined" onClick={handleCreateNew} fullWidth={isMobile}>{strings.anamnesis.createNew}</Button>
        {forms.length > 0 && (
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
        )}
      </Box>

      {(formId || isCreating) ? (
        <Box component="form" onSubmit={handleSubmit}>
          <CardList rowGap={5} columnGap={5}>
            {questions.map((question) => (
              <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                <InputLabel sx={{ color: "primary.main", textWrap: "wrap" }}>{question.statement}</InputLabel>
                <TextField
                  // slotProps={{
                  //   inputLabel: { sx: { color: "primary.main" }, shrink: true },
                  // }}
                  key={question.id}
                  id={question.id}
                  variant="standard"
                  value={responses[question.id] || ""}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  fullWidth
                />
              </Box>
            ))}
          </CardList>
          <Box
            gap={2}
            display="flex"
            justifyContent="end"
            marginTop={5}
          >
            <Button variant="outlined">{strings.anamnesis.skip}</Button>
            <Button variant="contained" type="submit">
              {strings.anamnesis.save}
            </Button>
          </Box>
        </Box>
      ) : (
        <p>{strings.anamnesis.selectOrCreate}</p>
      )}
    </>
  );
};

export default AnamnesisForm;

