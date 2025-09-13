import { useState } from 'react';

import {
  Box, Typography, TextField, Button, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Grid,
	Divider
} from '@mui/material';
import { useNavigate } from 'react-router';

//Consts por enquanto, mas mudar para ENUM ou algo assim
const sexOptions = ['Masculino', 'Feminino', 'Outro'];
const raceOptions = ['Branca', 'Preta', 'Parda', 'Amarela', 'Indígena', 'Outro'];
const escolaridadeOptions = ['Fundamental', 'Médio', 'Superior', 'Outro'];
const vinculoOptions = ['Novo', 'Retorno', 'Outro'];

export default function StudentRegistration() {
  // States para os campos principais
  const [personal, setPersonal] = useState({
  	nome: '',
    nascimento: '',
    sexo: '',
    raca: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    escolaridade: '',
    escolaAtual: '',
  });
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState('');
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [documentModal, setDocumentModal] = useState(false);
	type Documento = { arquivo: string, tipo: string, origem: string, data: string, descricao: string, id: number };
	const [documentos, setDocumentos] = useState<Documento[]>([]);
	const [docForm, setDocForm] = useState({
	  arquivo: '', tipo: '', origem: '', data: '', descricao: ''
	});
	const [detalhes, setDetalhes] = useState({
	  dataCadastro: '',
	  comoConheceu: '',
	  vinculo: '',
	});

	const navigate = useNavigate();

	//Mock enquanto nao tem api pra buscar o cep
	const handleCepBlur = () => {
	  if (personal.cep.length === 8) {
	    setCepLoading(true);
	    setTimeout(() => {
	      setPersonal(p => ({ ...p, endereco: 'Rua Exemplo', complemento: '', numero: '' }));
	      setShowAddressFields(true);
	      setCepLoading(false);
	      setCepError('');
	    }, 1000);
	  } else {
	    setCepError('CEP inválido');
	  }
	};

	// Modal de documentos
	const handleAddDoc = () => {
	  setDocumentos(docs => [...docs, { ...docForm, id: Date.now() }]);
	  setDocForm({ arquivo: '', tipo: '', origem: '', data: '', descricao: '' });
	  setDocumentModal(false);
	};

	// Responsividade: ajustar
	return(
	  <Box width="100%" p={{ xs: 1, md: 4 }}
	    overflow ="auto" maxHeight="80vh">
	    <Grid container spacing={8}>
	      {/* Informações Pessoais */}
	          <Grid  container
	        display='grid'
	        spacing={{ xs: 12, md: 1 }}>
	        <Typography variant="h6" fontWeight="bold" mb={2} sx={{display: 'flex',
	          justifyContent: 'center',
	          alignItems: 'center',
	          mt: '13px'
	        }}>Informações Pessoais </Typography>
	        <TextField label="Nome" fullWidth margin="dense" value={personal.nome} onChange={e => setPersonal(p => ({ ...p, nome: e.target.value }))} />
	        <TextField label="Data de Nascimento" type="date" fullWidth margin="dense" InputLabelProps={{ shrink: true }} value={personal.nascimento} onChange={e => setPersonal(p => ({ ...p, nascimento: e.target.value }))} />
	        <TextField label="Sexo" select fullWidth margin="dense" value={personal.sexo} onChange={e => setPersonal(p => ({ ...p, sexo: e.target.value }))} >
	          {sexOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
	        </TextField>
	        <TextField label="Raça" select fullWidth margin="dense" value={personal.raca} onChange={e => setPersonal(p => ({ ...p, raca: e.target.value }))} >
	          {raceOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
	        </TextField>
	        <TextField label="CEP" fullWidth margin="dense" value={personal.cep} onChange={e => setPersonal(p => ({ ...p, cep: e.target.value.replace(/\D/g, '') }))} onBlur={handleCepBlur} error={!!cepError} helperText={cepError} />
	        {cepLoading && <Typography color="primary">Buscando endereço...</Typography>}
	        {showAddressFields && (
	          <>
	            <TextField label="Endereço" fullWidth margin="dense" value={personal.endereco} disabled />
	            <TextField label="Número" fullWidth margin="dense" value={personal.numero} onChange={e => setPersonal(p => ({ ...p, numero: e.target.value }))} />
	            <TextField label="Complemento" fullWidth margin="dense" value={personal.complemento} onChange={e => setPersonal(p => ({ ...p, complemento: e.target.value }))} />
	          </>
	        )}
	        <TextField label="Escolaridade" select fullWidth margin="dense" value={personal.escolaridade} onChange={e => setPersonal(p => ({ ...p, escolaridade: e.target.value }))} >
	          {escolaridadeOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
	        </TextField>
	        <TextField label="Escola Atual" fullWidth margin="dense" value={personal.escolaAtual} onChange={e => setPersonal(p => ({ ...p, escolaAtual: e.target.value }))} />
	      </Grid>

	      {/* Documentos */}
	      <Grid  container
	        display='grid'
	        spacing={{ xs: 12, md: 4	}}>
	        <Typography variant="h6" fontWeight="bold" mb={-2} sx={{display: 'flex',
	          justifyContent: 'center',
	          alignItems: 'center'
	        }} >Documentos</Typography>
	        <TextField label="Documento" fullWidth margin="dense" />
	        <Typography fontWeight="bold" mb={-10} mt={1} sx= {{display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}>Anexos</Typography>
					<Divider sx={{my: 1}}  />

					<Box sx= {{maxHeight: 220, overflowY: 'auto', mb: 2, mt: -4}}>
	        {documentos.map(doc => (
	          <Box key={doc.id} display="flex" alignItems="center" mb={1}>
	            <TextField value={doc.arquivo} size="small" sx={{ flex: 1, mr: 1 }} disabled />
	            <Button variant="contained" size="small">Editar</Button>
	          </Box>
	        ))}
					</Box>
	        <Button variant="contained" fullWidth sx={{ my: 2 }} onClick={() => setDocumentModal(true)}>Adicionar mais documentos</Button>
	        <Button variant="contained" fullWidth color="secondary">Ativar Estudante</Button>
	      </Grid>

	      {/* Detalhes */}
	      <Grid  container
	        display='grid'
	        spacing={{ xs: 12, md: 5}}>
	        <Typography variant="h6" fontWeight="bold" mb={-6} mt={-4} sx={{display: 'flex',
	          justifyContent: 'center',
	          alignItems: 'center',
	        }} >Detalhes</Typography>
	        
					<TextField label="Data de Cadastro" type="date" fullWidth margin="dense" InputLabelProps={{ shrink: true }} value={detalhes.dataCadastro} onChange={e => setDetalhes(d => ({ ...d, dataCadastro: e.target.value }))} />
	        
					<TextField label="Como conheceu o projeto?" fullWidth margin="dense" value={detalhes.comoConheceu} onChange={e => setDetalhes(d => ({ ...d, comoConheceu: e.target.value }))} />
	        
					<TextField label="Vínculo" select fullWidth margin="dense" value={detalhes.vinculo} onChange={e => setDetalhes(d => ({ ...d, vinculo: e.target.value }))} >
	          {vinculoOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
	        </TextField>
	        
					<Box display="flex" gap={2} mt={2}>
	          <Button variant="contained" color="primary">Salvar</Button>
	          <Button variant="contained" color="error"
						onClick={() => navigate(-1)}>Cancelar</Button>
	        </Box>
	      </Grid>
	    </Grid>

	    {/* Modal de documentos */}
	    <Dialog open={documentModal} onClose={() => setDocumentModal(false)} fullWidth maxWidth="sm">
	      <DialogTitle>Adicionar Documento</DialogTitle>
			<DialogContent>
			<Button
				variant="outlined"
				component="label"
				fullWidth
				sx={{ mb: 2 }}
			>
				Selecionar Arquivo
				<input
					type="file"
					hidden
					onChange={e => {
						const file = e.target.files?.[0];
						if (file) {
							setDocForm(f => ({
								...f,
								arquivo: file.name,
								tipo: file.type || file.name.split('.').pop() || '',
								origem: file.webkitRelativePath || file.name,
								data: new Date(file.lastModified).toISOString().slice(0, 10)
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
				fullWidth
				margin="dense"
				value={docForm.tipo}
				InputProps={{ readOnly: true }}
			/>
			<TextField
				label="Origem do Documento"
				fullWidth
				margin="dense"
				value={docForm.origem}
				InputProps={{ readOnly: true }}
			/>
			<TextField
				label="Data"
				type="date"
				fullWidth
				margin="dense"
				InputLabelProps={{ shrink: true }}
				value={docForm.data}
				InputProps={{ readOnly: true }}
			/>
			<TextField
				label="Descrição"
				fullWidth
				margin="dense"
				value={docForm.descricao}
				onChange={e => setDocForm(f => ({ ...f, descricao: e.target.value }))}
			/>
		</DialogContent>
	      <DialogActions>
	        <Button onClick={() => setDocumentModal(false)}>Cancelar</Button>
	        <Button onClick={handleAddDoc} variant="contained">Enviar</Button>
	      </DialogActions>
	    </Dialog>
	  </Box>
	);
}