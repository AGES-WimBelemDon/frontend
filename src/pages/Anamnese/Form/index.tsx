import { Box, Button, Select, MenuItem, TextField, FormControl, InputLabel } from "@mui/material";
import dayjs from "dayjs";

import { useAnamneseForm } from "./useAnamneseForm";
import { CardList } from "../../../components/CardList";
import { PageTitle } from "../../../components/PageTitle";
import { strings } from "../../../constants";

const AnamnesisForm = () => {
  const {
    formDates,
    responses,
    isCreating,
    questions,
    formId,
    handleResponseChange,
    handleSubmit,
    handleCreateNew,
    handleFormChange,
  } = useAnamneseForm();

  return (
    <>
      <PageTitle title={strings.anamnesis.title} dataCy="anamnesis-form" />
      <Box
        gap={2}
        display="flex"
        alignItems="center"
        justifyContent="end"
        marginBottom={3}
      >
        {formDates.length > 0 && (
          <FormControl variant="standard" sx={{ minWidth: 150 }}>
            <InputLabel>{strings.anamnesis.previousForms}</InputLabel>
            <Select value={formId || ""} onChange={(e) => handleFormChange(e.target.value)}>
              {formDates.map((date) => (
                <MenuItem key={date} value={date}>
                  {dayjs(date).format("DD/MM/YYYY")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Button variant="outlined" onClick={handleCreateNew}>{strings.anamnesis.createNew}</Button>
      </Box>

      {(formId || isCreating) ? (
        <Box component="form" onSubmit={handleSubmit}>
          <CardList rowGap={5} columnGap={5}>
            {questions.map((question) => (
              <TextField
                key={question.questionId}
                fullWidth
                multiline
                minRows={1}
                id={question.questionId.toString()}
                label={question.statement}
                variant="standard"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                    sx: {
                      whiteSpace: "normal",
                      lineHeight: 1.2,
                      maxWidth: "100%",
                    },
                  },
                  formHelperText: {
                    sx: { whiteSpace: "normal" },
                  },
                }}
                sx={{
                  "& .MuiInputLabel-root": {
                    whiteSpace: "normal",
                    overflow: "visible",
                    textOverflow: "unset",
                    fontSize: "1.2rem"
                  },
                  "& .MuiInputBase-input": {
                    paddingTop: "25px",
                  },
                }}
                
                value={responses[question.questionId]?.content || ""}
                onChange={(e) => handleResponseChange(question.questionId, e.target.value)}
              />
            ))}
          </CardList>
          <Box
            gap={2}
            display="flex"
            justifyContent="end"
            marginTop={5}
          >
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