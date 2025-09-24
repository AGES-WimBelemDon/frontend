import { useState } from 'react';

import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
} from '@mui/material';

import { useFilters } from '../../hooks/useFilters';
import { useRoutes } from '../../hooks/useRoutes';

export default function StudentRegistration() {
  
  //Gera uma lista de anos de nascimento válidos para o aluno, estabelecendo uma idade mínima e uma máxima para os estudantes que serão cadastrados e evita o uso de números mágicos.
  const MIN_AGE = 1;
  const MAX_AGE = 30;
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: MAX_AGE - MIN_AGE + 1 }, (_, i) => currentYear - MIN_AGE - i);

  const { goTo } = useRoutes();
  
  const {
    genderOptions,
    raceOptions,
    escolaridadeOptions,
    identityTypesOptions,
  } = useFilters();

  const [student, setStudent] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    race: '',
    schoolYear: '',
    schoolName: '',
    address: {
      cep: '',
      street: '',
      number: '',
      complement: '',
    },
    docs: [],
    registrationNumber: ''
  });

  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');

  type Document = {
    fileName: string;
    fileType: string; // extensão (jpg, pdf)
    documentType: string; // tipo do documento (rg, cpf)
    origin: string;
    date: string;
    description: string;
    id: number;
  };

  const [documents, setDocuments] = useState<Document[]>([]);
  const [showUploader, setShowUploader] = useState(false);
  const [docForm, setDocForm] = useState({
    fileName: '',
    fileType: '',
    origin: '',
    date: '',
    description: '',
  });
  const [details, setDetails] = useState({
    dataCadastro: '',
    comoConheceu: '',
    vinculo: '',
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

    setDocForm({ fileName: '', fileType: '', origin: '', date: '', description: '' });
    setShowUploader(false);
  };

  return (
    <Box
      width="100%"
      p={{ xs: 2, md: 4 }}
      display="flex"
      justifyContent="center"
    >
      <Box width="100%" maxWidth={1200}>
        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{flexWrap: { xs: 'wrap', md: 'nowrap'}, columnGap: 3}}
        >
          {/* Informações Pessoais */}
          <Grid>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                mb: 2,
                mt: 1,
                color: 'primary.main',
                borderBottom: 2,
                borderColor: 'primary.main',
              }}
            >
              Informações Pessoais
            </Typography>

            <TextField
              label="Nome"
              fullWidth
              margin="normal"
              placeholder="Digite o nome do Educando"
              value={student.fullName}
              onChange={(e) =>
                setStudent((p) => ({ ...p, fullName: e.target.value }))
              }
              slotProps={{
                inputLabel: { sx: { color: 'primary.main' }, shrink: true },
              }}
            />

            <Typography sx={{ mt: 2, mb: 0.5, color: 'primary.main' }}>
              Data de Nascimento
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gap: { xs: 1, md: 1.5 },
                gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)' },
              }}
            >
              <TextField
                label="Dia"
                select
                value={birthDay}
                onChange={e => setBirthDay(e.target.value)}
                slotProps={{
                  inputLabel: { sx: { color: 'primary.main' }, shrink: true },
                }}
              >
                {Array.from({ length: 31 }, (_, i) => {
                  const v = String(i + 1).padStart(2, '0');
                  return <MenuItem key={v} value={v}>{v}</MenuItem>;
                })}
              </TextField>
              <TextField
                label="Mês"
                select
                value={birthMonth}
                onChange={e => setBirthMonth(e.target.value)}
                slotProps={{
                  inputLabel: { sx: { color: 'primary.main' }, shrink: true },
                }}
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const v = String(i + 1).padStart(2, '0');
                  return <MenuItem key={v} value={v}>{v}</MenuItem>;
                })}
              </TextField>
              <TextField
                label="Ano"
                select
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                slotProps={{ inputLabel: { sx: { color: 'primary.main' }, shrink: true } }}
              >
                <MenuItem value="" disabled>Ano</MenuItem>
                {years.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
              </TextField>
            </Box>

            <TextField
              label="Sexo"
              select
              fullWidth
              margin="normal"
              value={student.gender}
              onChange={(e) => setStudent((p) => ({ ...p, gender: e.target.value }))
              }
              slotProps={{
                inputLabel: { sx: { color: 'primary.main' }, shrink: true },
              }}
            >
              {genderOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </TextField>

            <TextField
              label="Raça"
              select
              fullWidth
              margin="normal"
              value={student.race}
              onChange={(e) =>
                setStudent((p) => ({ ...p, race: e.target.value }))
              }
              slotProps={{
                inputLabel: { sx: { color: 'primary.main' }, shrink: true },
              }}
            >
              {raceOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </TextField>

            <TextField
              label="CEP"
              fullWidth
              margin="normal"
              placeholder="Apenas números"
              value={student.address.cep}
              onChange={(e) =>
                setStudent((p) => ({
                  ...p,
                  address: {
                    ...p.address,
                    cep: e.target.value.replace(/\D/g, ''),
                  },
                }))
              }
              slotProps={{
                inputLabel: { sx: { color: 'primary.main' }, shrink: true },
              }}
            />

            <TextField
              label="Escolaridade"
              select
              fullWidth
              margin="normal"
              value={student.schoolYear}
              onChange={(e) =>
                setStudent((p) => ({ ...p, schoolYear: e.target.value }))
              }
              slotProps={{
                inputLabel: { sx: { color: 'primary.main' }, shrink: true },
              }}
            >
              {escolaridadeOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </TextField>

            <TextField
              label="Escola Atual"
              fullWidth
              margin="normal"
              placeholder="Digite a escola atual do Educando"
              value={student.schoolName}
              onChange={(e) =>
                setStudent((p) => ({ ...p, schoolName: e.target.value }))
              }
              slotProps={{
                inputLabel: { sx: { color: 'primary.main' }, shrink: true },
              }}
            />
          </Grid>

          <Grid>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                mb: 2,
                mt: 1,
                color: 'primary.main',
                borderBottom: 2,
                borderColor: 'primary.main',
              }}
            >
              Documentos
            </Typography>

            <TextField
              label="Documento de Identidade (CPF)"
              placeholder="xxx.xxx.xxx-xx"
              fullWidth
              margin="normal"
              value={student.docs}
              onChange={(e) =>
                setStudent((p) => ({ ...p, document: e.target.value }))
              }
              slotProps={{
                inputLabel: { sx: { color: 'primary.main' }, shrink: true },
              }}
            >
              {identityTypesOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </TextField>

            {student.docs && (
              <TextField
                label={`Número / Detalhes do Documento ${student.docs}`}
                fullWidth
                margin="normal"
                value={student.registrationNumber|| ''}
                onChange={(e) =>
                  setStudent((p) => ({ ...p, registrationNumber: e.target.value }))
                }
                slotProps={{
                  inputLabel: { sx: { color: 'primary.main' }, shrink: true },
                }}
              />
            )}

            <Typography
              fontWeight="bold"
              sx={{ mt: 2, mb: 1, color: 'primary.main' }}
            >
              Anexos
            </Typography>

            <Box
              sx={{ maxHeight: { xs: 180, md: 240 }, overflowY: 'auto', mb: 2 }}
            >
              {documents.map(() => (
                <Box
                  sx={{ maxHeight: { xs: 180, md: 240 }, overflowY: 'auto', mb: 2 }}
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
                    document.getElementById('fileInputUpload2')?.click();
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
                        fileType: file.type || file.name.split('.').pop() || '',
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
                  border: '1px solid',
                  borderColor: 'divider',
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
                          fileType: file.type || file.name.split('.').pop() || '',
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
                    inputLabel: { sx: { color: 'primary.main' }, shrink: true },
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
                    inputLabel: { sx: { color: 'primary.main' }, shrink: true },
                  }}
                />

                <Box display="flex" gap={1} mt={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setDocForm({
                        fileName: '',
                        fileType: '',
                        origin: '',
                        date: '',
                        description: '',
                      });
                      setShowUploader(false);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleAddDoc}
                    variant="contained"
                    disabled={!docForm.fileName || !student.docs}
                    sx={{ ml: 'auto' }}
                  >
                    Enviar
                  </Button>
                </Box>
              </Box>
            )}

            <Button
              variant="contained"
              fullWidth
              sx={{
                color: 'primary.contrastText',
                borderColor: 'primary.main',
                bgcolor: 'secondary.main',
                fontWeight: 500,
                borderRadius: 4,
              }}
            >
              Ativar Estudante
            </Button>
          </Grid>

          {/* Detalhes */}
          <Grid>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                mb: 2,
                mt: 1,
                color: 'primary.main',
                borderBottom: 2,
                borderColor: 'primary.main',
              }}
            >
              Detalhes
            </Typography>

            <Typography sx={{ mt: 0.5, mb: 0.5, color: 'text.main' }}>
              Data De Cadastro
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gap: { xs: 1, md: 1.5 },
                gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)' },
                mb: 1,
              }}
            >
              <TextField
                label="Dia"
                select
                defaultValue=""
                slotProps={{
                  inputLabel: { sx: { color: 'primary.main' }, shrink: true },
                }}
              >
                {Array.from({ length: 31 }, (_, i) => {
                  const v = String(i + 1).padStart(2, '0');
                  return <MenuItem key={v} value={v}>{v}</MenuItem>;
                })}
              </TextField>
              <TextField
                label="Mês"
                select
                defaultValue=""
                slotProps={{
                  inputLabel: { sx: { color: 'primary.main' }, shrink: true },
                }}
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const v = String(i + 1).padStart(2, '0');
                  return <MenuItem key={v} value={v}>{v}</MenuItem>;
                })}
              </TextField>
              <TextField
                label="Ano"
                value={String(currentYear)}
                slotProps={{ inputLabel: { sx: { color: 'primary.main' }, shrink: true } }}
              />
            </Box>

            <TextField
              label="Como conheceu o projeto?"
              fullWidth
              margin="normal"
              placeholder="Digite como o educando conheceu o projeto"
              value={details.comoConheceu}
              onChange={(e) =>
                setDetails((d) => ({ ...d, comoConheceu: e.target.value }))
              }
              slotProps={{
                inputLabel: { sx: { color: 'primary.main' }, shrink: true },
              }}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                mt: 2,
              }}
            >
              <Button variant="contained" color="primary" sx={{ flex: 1 }}>
                Salvar
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ flex: 1 }}
                onClick={() => goTo('/')} //ir para a homepage provisória
              >
                Cancelar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
