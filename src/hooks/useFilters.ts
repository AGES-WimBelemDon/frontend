
export function useFilters(){
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
  const identityTypesOptions = ['RG', 'CPF', 'Certidão de Nascimento'];
  const documentTypesOptions = ['Comprovante de Residência', 'Comprovante de Renda', 'Outro'];

  return {
    genderOptions,
    raceOptions,
    escolaridadeOptions,
    identityTypesOptions,
    documentTypesOptions,
  };

}