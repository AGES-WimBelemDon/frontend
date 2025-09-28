import { useState } from 'react';

import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router';

const genderOptions = ['Masculino', 'Feminino', 'Outro'];
const raceOptions = [
  'Branca',
  'Preta',
  'Parda',
  'Amarela',
  'Indígena',
  'Outro',
];
const escolaridadeOptions = ['Fundamental', 'Médio', 'Superior', 'Outro'];
const documentTypesOptions = ['Comprovante de Residência', 'Comprovante de Renda', 'Outro'];

export default function StudentRegistration() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1980 + 1 }, (_, i) => currentYear - i);

  const [personal, setPersonal] = useState({
    nome: '',
    nascimento: '',
    sexo: '',
    raca: '',
    escolaridade: '',
    escolaAtual: '',
    endereco: '',
    cep: '',
    numero: '',
    complemento: '',
    ano: '',
    documentos: '',
    identidade: '',
    numeroIdentidade: ''
  });

  type Documento = {
    arquivo: string;
    tipo: string; 
    tipoDocumento: string;
    origem: string;
    data: string;
    descricao: string;
    id: number;
  };

  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [showUploader, setShowUploader] = useState(false);
  const [docForm, setDocForm] = useState({
    arquivo: '',
    tipo: '',
    origem: '',
    data: '',
    descricao: '',
  });
  const [detalhes, setDetalhes] = useState({
    dataCadastro: '',
    comoConheceu: '',
    vinculo: '',
  });
  const navigate = useNavigate();

  const handleAddDoc = () => {
    if (!docForm.arquivo) return;
  
    setDocumentos((docs) => [
      ...docs,
      {
        ...docForm,
        id: Date.now(),
        tipo: personal.documentos,
      } as Documento,
    ]);
  
    setDocForm({ arquivo: '', tipo: '', origem: '', data: '', descricao: '' });
    setPersonal((p) => ({ ...p, documentos: '' }));
    setShowUploader(false);
  };

  return (
    <Box
      width="100%"
      p={{ xs: 2, md: 4 }}
      display="flex"
      justifyContent="center"
    >
      <Box>
        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            '& > .MuiGrid-item': {
              flexBasis: { md: '33.5%' },
              maxWidth: { md: '33.5%' },
            },
            '@media (min-width:1200px)': {
              '& > .MuiGrid-item': {
                flexBasis: '35%',
                maxWidth: '35%',
              },
            },
            '@media (min-width:1536px)': {
              '& > .MuiGrid-item': {
                flexBasis: '36%',
                maxWidth: '36%',
              },
            },
            columnGap: { md: 3 },
          }}
        >
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
              value={personal.nome}
              onChange={(e) =>
                setPersonal((p) => ({ ...p, nome: e.target.value }))
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
                select
                value={personal.ano}
                onChange={(e) => setPersonal((p) => ({ ...p, ano: e.target.value }))}
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
              value={personal.sexo}
              onChange={(e) =>
                setPersonal((p) => ({ ...p, sexo: e.target.value }))
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
              value={personal.raca}
              onChange={(e) =>
                setPersonal((p) => ({ ...p, raca: e.target.value }))
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
              value={personal.cep}
              onChange={(e) =>
                setPersonal((p) => ({
                  ...p,
                  cep: e.target.value.replace(/\D/g, ''),
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
              value={personal.escolaridade}
              onChange={(e) =>
                setPersonal((p) => ({ ...p, escolaridade: e.target.value }))
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
              value={personal.escolaAtual}
              onChange={(e) =>
                setPersonal((p) => ({ ...p, escolaAtual: e.target.value }))
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
              value={personal.identidade}
              onChange={(e) =>
                setPersonal((p) => ({ ...p, identidade: e.target.value }))
              }
              slotProps={{
                inputLabel: { sx: { color: 'primary.main' }, shrink: true },
              }}
            />           

            <Typography
              fontWeight="bold"
              sx={{ mt: 2, mb: 1, color: 'primary.main' }}
            >
              Anexos
            </Typography>

            <Box
              sx={{ maxHeight: { xs: 180, md: 240 }, overflowY: 'auto', mb: 2 }}
            >
              {documentos.map(() => (
                <Box
                  sx={{ maxHeight: { xs: 180, md: 240 }, overflowY: 'auto', mb: 2 }}
                >
                  {documentos.map((doc) => (
                    <Box key={doc.id} mb={1.25}>
                      <Typography variant="caption" color="primary.main" sx={{ mb: 0.5 }}>
                        {doc.tipo}
                      </Typography>
                      <Box display="flex" gap={1.25}>
                        <TextField
                          value={doc.arquivo}
                          size="small"
                          sx={{ flex: 1 }}
                          disabled
                        />
                        <Button variant="outlined" size="small">Editar</Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              
              ))}
            </Box>

            {!showUploader && (
              <Button
                variant="contained"
                fullWidth
                sx={{ my: 1, borderRadius: 4 }}
                onClick={() => setShowUploader(true)}
              >
                Adicionar mais documentos
              </Button>
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
                    type="file"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setDocForm((f) => ({
                          ...f,
                          arquivo: file.name,
                          tipo: file.type || file.name.split('.').pop() || '',
                          origem:
                            (file as File).webkitRelativePath ?? file.name,
                          data: new Date(file.lastModified)
                            .toISOString()
                            .slice(0, 10),
                        }));
                      }
                    }}
                  />
                </Button>

                {docForm.arquivo && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Arquivo selecionado: {docForm.arquivo}
                  </Typography>
                )}

                <TextField
                  label="Tipo de Documento"
                  select
                  fullWidth
                  margin="normal"
                  value={personal.documentos}
                  onChange={(e) =>
                    setPersonal((p) => ({ ...p, documentos: e.target.value }))
                  }
                  slotProps={{
                    inputLabel: { sx: { color: 'primary.main' }, shrink: true },
                  }}
                >
                  {documentTypesOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Extensão do Documento"
                  fullWidth
                  margin="dense"
                  value={docForm.tipo}
                  slotProps={{
                    inputLabel: { sx: { color: 'primary.main' }, shrink: true },
                  }}
                />
                <TextField
                  label="Origem do Documento"
                  fullWidth
                  margin="dense"
                  value={docForm.origem}
                  slotProps={{
                    inputLabel: { sx: { color: 'primary.main' }, shrink: true },
                  }}
                />
                <TextField
                  label="Data"
                  type="date"
                  fullWidth
                  margin="dense"
                  value={docForm.data}
                  slotProps={{
                    inputLabel: { sx: { color: 'primary.main' }, shrink: true },
                  }}
                />
                <TextField
                  label="Descrição"
                  fullWidth
                  margin="dense"
                  value={docForm.descricao}
                  onChange={(e) =>
                    setDocForm((f) => ({ ...f, descricao: e.target.value }))
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
                        arquivo: '',
                        tipo: '',
                        origem: '',
                        data: '',
                        descricao: '',
                      });
                      setShowUploader(false);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleAddDoc}
                    variant="contained"
                    disabled={!docForm.arquivo || !personal.documentos}
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
              value={detalhes.comoConheceu}
              onChange={(e) =>
                setDetalhes((d) => ({ ...d, comoConheceu: e.target.value }))
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
                onClick={() => navigate(-1)}
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
