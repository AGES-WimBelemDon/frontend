import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";

import { useStudentRegistration } from "./hook";
import { strings } from "../../constants";
import { useFilters } from "../../hooks/useFilters";
import { useRoutes } from "../../hooks/useRoutes";
import { useScreenSize } from "../../hooks/useScreenSize";


export default function StudentRegistration() {
  const { goBack } = useRoutes();
  
  const {
    genderOptions,
    raceOptions,
    schoolYearOptions,
    identityTypesOptions,
    socialProgramsOptions,
    employmentStatusOptions
  } = useFilters();

  const isMobile = useScreenSize().isMobile;

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
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
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
          {strings.studentRegistration.personalInformation}
        </Typography>

        <TextField
          required
          name="fullName"
          label={strings.studentRegistration.name}
          fullWidth
          margin="normal"
          placeholder={strings.studentRegistration.namePlaceholder}
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        />
        <TextField
          name="socialName"
          label={strings.studentRegistration.socialName}
          fullWidth
          margin="normal"
          placeholder={strings.studentRegistration.socialNamePlaceholder}
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        />

        <TextField
          required
          name="dateOfBirth"
          label={strings.studentRegistration.dateOfBirth}
          fullWidth
          margin="normal"
          type="date"
          slotProps={{
            htmlInput: { max: new Date().toISOString().slice(0, 10), min: "1925-01-01" },
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        />

        <TextField
          required
          name="gender"
          label={strings.filters.gender.title}
          select={!!genderOptions}
          defaultValue={!genderOptions ? strings.filters.loading : ""}
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
          required
          name="race"
          label={strings.filters.race.title}
          select={!!raceOptions}
          defaultValue={!raceOptions ? strings.filters.loading : ""}
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
          name="enrollmentDate"
          label={strings.studentRegistration.enrollmentDate}
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
          {strings.studentRegistration.documents}
        </Typography>
        <TextField
          required
          name="registrationNumber"
          label={strings.studentRegistration.registrationNumber}
          placeholder="xxx.xxx.xxx-xx"
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        >
          {identityTypesOptions?.map((identityType) => (
            <MenuItem key={identityType.id} value={identityType.id}>{identityType.label}</MenuItem>
          ))}
        </TextField>
        <Typography
          fontWeight="bold"
          sx={{ mt: 2, mb: 1, color: "primary.main" }}
        >
          {strings.studentRegistration.attachments}
        </Typography>

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
                <Button variant="outlined" size="small" onClick={() => setShowUploader(true)}>{strings.studentRegistration.editButton}</Button>
              </Box>
            </Box>
          ))}
        </Box>

        {!showUploader && (
          <>
            <Button
              variant="contained"
              fullWidth
              sx={{ my: 1 }}
              onClick={() => {
                document.getElementById("fileInputUpload2")?.click();
              }}
            >
              {strings.studentRegistration.attachMoreFiles}
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
              {strings.studentRegistration.selectFiles}
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
                {strings.studentRegistration.selectedFile}{" "}{docForm.fileName}
              </Typography>
            )}

            <TextField
              label={strings.studentRegistration.fileCreatedAt}
              type="date"
              fullWidth
              margin="dense"
              value={docForm.date}
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
            <TextField
              label={strings.studentRegistration.fileDescription}
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
                {strings.studentRegistration.cancelFileSend}
              </Button>
              <Button
                onClick={handleAddDoc}
                variant="contained"
                disabled={!docForm.fileName}
                sx={{ ml: "auto" }}
              >
                {strings.studentRegistration.addFileButton}
              </Button>
            </Box>
          </Box>
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
          {strings.studentRegistration.details}
        </Typography>
        
        <TextField
          required
          name="schoolYear"
          label={strings.filters.schoolYear.title}
          select={!!schoolYearOptions}
          defaultValue={!schoolYearOptions ? strings.filters.loading : ""}
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        >
          {schoolYearOptions?.map(({ id, label }) => (
            <MenuItem key={id} value={id}>{label}</MenuItem>
          ))}
        </TextField>

        <TextField
          name="schoolName"
          label={strings.studentRegistration.schoolName}
          fullWidth
          margin="normal"
          placeholder={strings.studentRegistration.schoolNamePlaceholder}
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        />

        <TextField
          name="socialPrograms"
          label={strings.filters.socialPrograms.title}
          select={!!socialProgramsOptions}
          defaultValue={!socialProgramsOptions ? strings.filters.loading : ""}
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        >
          {socialProgramsOptions?.map(({ id, label }) => (
            <MenuItem key={id} value={id}>{label}</MenuItem>
          ))}
        </TextField>

        <TextField
          name="employmentStatus"
          label={strings.filters.employmentStatus.title}
          select={!!employmentStatusOptions}
          defaultValue={!employmentStatusOptions ? strings.filters.loading : employmentStatusOptions.find(option => option.id.toLowerCase() === "estudante")?.id || ""}
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
          {strings.studentRegistration.address.title}
        </Typography>

        <TextField
          required
          name="cep"
          label={strings.studentRegistration.address.zipCode}
          placeholder={strings.studentRegistration.address.zipCodePlaceholder}
          fullWidth
          margin="normal"
          type="string"
          value={address?.code}
          onChange={(e) => setAddress({ ...address, code: e.target.value })}
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
            htmlInput: { maxLength: 8, minLength: 8, pattern: "[0-9]{8}" }
          }}
        />

        {address?.street && (
          <>
            <TextField
              name="street"
              label={strings.studentRegistration.address.street}
              fullWidth
              margin="normal"
              value={address?.street}
              aria-readonly
              slotProps={{
                htmlInput: {
                  readOnly: true,
                  sx: { cursor: "not-allowed", borderColor: "grey.600", onFocus: { borderColor: "grey.600", color: "grey.600" }, color: "grey.600" }
                },
                inputLabel: { sx: { color: "grey.600" }, shrink: true },
              }}
            />
            <TextField
              required
              
              name="number"
              label={strings.studentRegistration.address.number}
              placeholder={strings.studentRegistration.address.numberPlaceholder}
              fullWidth
              margin="normal"
              slotProps={{ 
                inputLabel: { sx: { color: "primary.main" }, shrink: true }, 
              }}
            />
            <TextField
              name="state"
              label={strings.studentRegistration.address.state}
              value={address?.state}
              fullWidth
              margin="normal"
              aria-readonly
              slotProps={{
                htmlInput: {
                  readOnly: true,
                  sx: { cursor: "not-allowed", borderColor: "grey.600", onFocus: { borderColor: "grey.600", color: "grey.600" }, color: "grey.600" }
                },
                inputLabel: { sx: { color: "grey.600" }, shrink: true },
              }}
            />
            <TextField
              name="city"
              label={strings.studentRegistration.address.city}
              value={address?.city}
              fullWidth
              margin="normal"
              aria-readonly
              slotProps={{
                htmlInput: {
                  readOnly: true,
                  sx: { cursor: "not-allowed", borderColor: "grey.600", onFocus: { borderColor: "grey.600", color: "grey.600" }, color: "grey.600" }
                },
                inputLabel: { sx: { color: "grey.600" }, shrink: true },
              }}
            />
            
            <TextField
              name="neighborhood"
              label={strings.studentRegistration.address.neighborhood}
              value={address?.neighborhood}
              fullWidth
              margin="normal"
              aria-readonly
              slotProps={{
                htmlInput: {
                  readOnly: true,
                  sx: { cursor: "not-allowed", borderColor: "grey.600", onFocus: { borderColor: "grey.600", color: "grey.600" }, color: "grey.600" }
                },
                inputLabel: { sx: { color: "grey.600" }, shrink: true },
              }}
            />
            
            <TextField
              name="complement"
              label={strings.studentRegistration.address.complement}
              value={address?.complement}
              placeholder={strings.studentRegistration.address.complementPlaceholder}
              fullWidth
              margin="normal"
              slotProps={{ inputLabel: { sx: { color: "primary.main" }, shrink: true } }}
            />
          </>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mt: 2,
          }}
        >
          {/* <Button                           deixar bonito depois e chamar quando fizer ediçao (criar nova variavel no hook)
            variant="contained"
            sx={{
              color: "primary.contrastText",
              borderColor: "primary.main",
              bgcolor: "error.main",
              fontWeight: 500,
            }}
          >
            {strings.studentEdition.toggleStudentStatusOff}
          </Button>  */}
          <Button type="submit" variant="contained" color="primary" sx={{ flex: 1 }}>
            {strings.studentRegistration.saveButton}
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ flex: 1 }}
            type="button"
            onClick={goBack}
          >
            {strings.studentRegistration.cancelButton}
          </Button>
          
        </Box> 
      </Grid>
    </Box>
  );
}
