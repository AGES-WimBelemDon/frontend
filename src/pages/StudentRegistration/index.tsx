import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";

import { useStudentRegistration } from "./hook";
import { pt } from "../../constants";
import { useFilters } from "../../hooks/useFilters";
import { useRoutes } from "../../hooks/useRoutes";

export default function StudentRegistration() {
  const { goBack } = useRoutes();
  
  const {
    genderOptions,
    raceOptions,
    educationLevels,
    identityTypesOptions,
    socialProgramOptions,
    employmentStatusOptions,
  } = useFilters();

  const {
    documents,
    showUploader,
    setShowUploader,
    docForm,
    setDocForm,
    handleAddDoc,
    handleSubmit,
    address,
    setAddress,
  } = useStudentRegistration();

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
          {pt.studentRegistration.personalInformation}
        </Typography>

        <TextField
          name="fullName"
          label={pt.studentRegistration.name}
          fullWidth
          margin="normal"
          placeholder={pt.studentRegistration.namePlaceholder}
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        />

        <TextField
          name="dateOfBirth"
          label={pt.studentRegistration.dateOfBirth}
          fullWidth
          margin="normal"
          type="date"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        />

        <TextField
          name="gender"
          label={pt.filters.gender.title}
          select={!!genderOptions}
          defaultValue={!genderOptions ? pt.filters.loading : ""}
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        >
          {genderOptions?.map(({ id, label }) => (
            <MenuItem key={id} value={id}>{label}</MenuItem>
          ))}
        </TextField>

        <TextField
          name="race"
          label={pt.filters.race.title}
          select={!!raceOptions}
          defaultValue={!raceOptions ? pt.filters.loading : ""}
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        >
          {raceOptions?.map(({ id, label }) => (
            <MenuItem key={id} value={id}>{label}</MenuItem>
          ))}
        </TextField>

        <TextField
          name="address.code"
          label={pt.studentRegistration.address.zipCode}
          placeholder={pt.studentRegistration.address.zipCodePlaceholder}
          fullWidth
          margin="normal"
          type="number"
          value={address?.code}
          onChange={(e) => setAddress({ ...address, code: e.target.value })}
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        />

        {address?.street && (
          <>
            <TextField
              name="address.street"
              label={pt.studentRegistration.address.street}
              fullWidth
              margin="normal"
              value={address?.street}
              aria-readonly
              slotProps={{
                htmlInput: {
                  readOnly: true,
                  sx: { cursor: "not-allowed" }
                },
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
            <TextField
              name="address.number"
              label={pt.studentRegistration.address.number}
              placeholder={pt.studentRegistration.address.numberPlaceholder}
              fullWidth
              margin="normal"
              slotProps={{ inputLabel: { sx: { color: "primary.main" }, shrink: true } }}
            />
            <TextField
              name="address.complement"
              label={pt.studentRegistration.address.complement}
              placeholder={pt.studentRegistration.address.complementPlaceholder}
              fullWidth
              margin="normal"
              slotProps={{ inputLabel: { sx: { color: "primary.main" }, shrink: true } }}
            />
          </>
        )}
        
        <TextField
          name="enrollmentDate"
          label={pt.studentRegistration.enrollmentDate}
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
          {pt.studentRegistration.documents}
        </Typography>

        <TextField
          name="registrationNumber"
          label={pt.studentRegistration.registrationNumber}
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
          {pt.studentRegistration.attachments}
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
              {pt.studentRegistration.attachMoreFiles}
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
              {pt.studentRegistration.selectFiles}
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
                {pt.studentRegistration.selectedFile}{" "}{docForm.fileName}
              </Typography>
            )}

            <TextField
              label={pt.studentRegistration.fileCreatedAt}
              type="date"
              fullWidth
              margin="dense"
              value={docForm.date}
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
            <TextField
              label={pt.studentRegistration.fileDescription}
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
                {pt.studentRegistration.cancelFileSend}
              </Button>
              <Button
                onClick={handleAddDoc}
                variant="contained"
                disabled={!docForm.fileName}
                sx={{ ml: "auto" }}
              >
                {pt.studentRegistration.addFileButton}
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
            {pt.studentRegistration.toggleStudentStatusOn}
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
          {pt.studentRegistration.details}
        </Typography>
        
        <TextField
          name="educationLevel"
          label={pt.filters.educationLevel.title}
          select={!!educationLevels}
          defaultValue={!educationLevels ? pt.filters.loading : ""}
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        >
          {educationLevels?.map(({ id, label }) => (
            <MenuItem key={id} value={id}>{label}</MenuItem>
          ))}
        </TextField>

        <TextField
          name="schoolName"
          label={pt.studentRegistration.schoolName}
          fullWidth
          margin="normal"
          placeholder={pt.studentRegistration.schoolNamePlaceholder}
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        />

        <TextField
          name="socialProgram"
          label={pt.filters.socialPrograms.title}
          select={!!socialProgramOptions}
          defaultValue={!socialProgramOptions ? pt.filters.loading : ""}
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        >
          {socialProgramOptions?.map(({ id, label }) => (
            <MenuItem key={id} value={id}>{label}</MenuItem>
          ))}
        </TextField>

        <TextField
          name="employmentStatus"
          label={pt.filters.employmentStatus.title}
          select={!!employmentStatusOptions}
          defaultValue={!employmentStatusOptions ? pt.filters.loading : ""}
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        >
          {employmentStatusOptions?.map(({ id, label }) => (
            <MenuItem key={id} value={id}>{label}</MenuItem>
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
            {pt.studentRegistration.saveButton}
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ flex: 1 }}
            type="button"
            onClick={goBack}
          >
            {pt.studentRegistration.cancelButton}
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}
