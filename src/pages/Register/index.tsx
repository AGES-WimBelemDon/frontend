import { RegisterButton } from '../../components/RegisterButton';

export default function Register() {
  const data = [
    { initialName: 'Educando', frequency: 'Educando' },
    { initialName: 'Usuário', frequency: 'Usuário' },
    { initialName: 'Atividade', frequency: 'Atividade' }
  ];

  return (
    <>
      {data.map((student, index) => (
        <RegisterButton key={index} title={student.initialName} />
      ))}
    </>
  );
}
