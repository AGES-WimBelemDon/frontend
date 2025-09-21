import ButtonCadastro from '../../components/RegisterButton';
export default function Register(){
  const data = [
    { initialName: 'Educando', frequency: 'Educando' },
    { initialName: 'Usuário', frequency: 'Usuário' },
    { initialName: 'Atividade', frequency: 'Atividade' }
  ];
  return (
    <>
      {data.map((student, index) => (
        <ButtonCadastro key={index} initialName={student.initialName} frequency={student.frequency} />
      ))}
    </>
  );

}