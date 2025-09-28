import { useState } from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";

import type { Document } from "./interface";
import { useFilters } from "../../hooks/useFilters";
import { useRoutes } from "../../hooks/useRoutes";

export default function StudentRegistration() {
  const { goTo } = useRoutes();
  
  const {
    genderOptions,
    raceOptions,
    educationLevels,
    identityTypesOptions,
    socialProgramOptions,
    employmentStatusOptions,
  } = useFilters();

  const [documents, setDocuments] = useState<Document[]>([]);
  const [showUploader, setShowUploader] = useState(false);
  const [docForm, setDocForm] = useState({
    fileName: "",
    fileType: "",
    origin: "",
    date: "",
    description: "",
  });

  function handleAddDoc() {
    if (!docForm.fileName) return;
  
    setDocuments((docs) => [
      ...docs,
      {
        ...docForm,
        id: Date.now(),
      } as Document,
    ]);

    setDocForm({ fileName: "", fileType: "", origin: "", date: "", description: "" });
    setShowUploader(false);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const studentData = Object.fromEntries(formData.entries());
    console.log("Student Data:", studentData);
    console.log("Documents:", documents);
  }

  return (
    <Box
      component="form"
      sx={{
        gap: 4,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
      onSubmit={handleSubmit}
    >
      <Grid>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            mb: 2,
            mt: 1,
            color: "primary.main",
            borderBottom: 2,
            borderColor: "primary.main",
          }}
        >
          Informações Pessoais
        </Typography>

        <TextField
          name="fullName"
          label="Nome"
          fullWidth
          margin="normal"
          placeholder="Digite o nome do Educando"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        />

        <TextField
          name="dateOfBirth"
          label="Data de Nascimento"
          fullWidth
          margin="normal"
          type="date"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        />

        <TextField
          name="gender"
          label="Sexo"
          select
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        >
          {genderOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </TextField>

        <TextField
          name="race"
          label="Raça"
          select
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        >
          {raceOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </TextField>

        <TextField
          name="address.code"
          label="CEP"
          fullWidth
          margin="normal"
          placeholder="Apenas números"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        />
        
        <TextField
          name="enrollmentDate"
          label="Data de Cadastro"
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
          type="date"
        />

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            mb: 2,
            mt: 1,
            color: "primary.main",
            borderBottom: 2,
            borderColor: "primary.main",
          }}
        >
          Documentos
        </Typography>

        <TextField
          name="registrationNumber"
          label="Documento de Identidade (CPF)"
          placeholder="xxx.xxx.xxx-xx"
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        >
          {identityTypesOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </TextField>

        <Typography
          fontWeight="bold"
          sx={{ mt: 2, mb: 1, color: "primary.main" }}
        >
          Anexos
        </Typography>

        <Box
          sx={{ maxHeight: { xs: 180, md: 240 }, overflowY: "auto", mb: 2 }}
        >
          {documents.map(() => (
            <Box
              sx={{ maxHeight: { xs: 180, md: 240 }, overflowY: "auto", mb: 2 }}
            >
              {documents.map((doc) => (
                <Box key={doc.id} mb={1.25}>
                  <Typography variant="caption" color="primary.main" sx={{ mb: 0.5 }}>
                    {doc.documentType}
                  </Typography>
                  <Box display="flex" gap={1.25}>
                    <TextField
                      value={doc.fileName}
                      size="small"
                      sx={{ flex: 1 }}
                      disabled
                    />
                    <Button variant="outlined" size="small" onClick={() => setShowUploader(true)}>Editar</Button>
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Box>

        {!showUploader && (
          <>
            <Button
              variant="contained"
              fullWidth
              sx={{ my: 1, borderRadius: 4 }}
              onClick={() => {
                document.getElementById("fileInputUpload2")?.click();
              }}
            >
              Adicionar mais documentos
            </Button>
            <input
              id="fileInputUpload2"
              type="file"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setDocForm((f) => ({
                    ...f,
                    fileName: file.name,
                    fileType: file.type || file.name.split(".").pop() || "",
                    origin: file.webkitRelativePath || file.name,
                    date: new Date(file.lastModified).toISOString().slice(0, 10),
                  }));
                  setShowUploader(true);
                }
              }}
            />
          </>
        )}

        {showUploader && (
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Selecionar Arquivo
              <input
                id="fileInputUpload"
                type="file"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setDocForm((f) => ({
                      ...f,
                      fileName: file.name,
                      fileType: file.type || file.name.split(".").pop() || "",
                      origin: file.webkitRelativePath || file.name,
                      date: new Date(file.lastModified).toISOString().slice(0, 10),
                    }));
                  }
                }}
              />
            </Button>

            {docForm.fileName && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                Arquivo selecionado: {docForm.fileName}
              </Typography>
            )}

            <TextField
              label="Data"
              type="date"
              fullWidth
              margin="dense"
              value={docForm.date}
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
            <TextField
              label="Descrição"
              fullWidth
              margin="dense"
              value={docForm.description}
              onChange={(e) =>
                setDocForm((f) => ({ ...f, description: e.target.value }))
              }
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />

            <Box display="flex" gap={1} mt={2}>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setDocForm({
                    fileName: "",
                    fileType: "",
                    origin: "",
                    date: "",
                    description: "",
                  });
                  setShowUploader(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddDoc}
                variant="contained"
                disabled={!docForm.fileName}
                sx={{ ml: "auto" }}
              >
                Enviar
              </Button>
            </Box>
          </Box>
        )}

        {(
          <Button
            variant="contained"
            fullWidth
            sx={{
              color: "primary.contrastText",
              borderColor: "primary.main",
              bgcolor: "secondary.main",
              fontWeight: 500,
              borderRadius: 4,
            }}
          >
            Ativar Estudante
          </Button>
        )}
      </Grid>

      <Grid>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            mb: 2,
            mt: 1,
            color: "primary.main",
            borderBottom: 2,
            borderColor: "primary.main",
          }}
        >
          Detalhes
        </Typography>
        
        <TextField
          name="educationLevel"
          label="Escolaridade"
          select
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        >
          {educationLevels.map((opt) => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </TextField>

        <TextField
          name="schoolName"
          label="Escola Atual"
          fullWidth
          margin="normal"
          placeholder="Digite a escola atual do Educando"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        />

        <TextField
          name="socialProgram"
          label="Programas Sociais"
          select
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        >
          {socialProgramOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </TextField>

        <TextField
          name="employmentStatus"
          label="Vínculo Empregatício"
          select
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        >
          {employmentStatusOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </TextField>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mt: 2,
          }}
        >
          <Button type="submit" variant="contained" color="primary" sx={{ flex: 1 }}>
            Salvar
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ flex: 1 }}
            type="button"
            onClick={() => goTo("/")}
          >
            Cancelar
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}
