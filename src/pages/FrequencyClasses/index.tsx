import { Typography } from '@mui/material';

import { CardList } from '../../components/CardList';
import { TextCard } from '../../components/TextCard';
import { pt } from '../../constants';
import { useRoutes } from '../../hooks/useRoutes';

const activities = [
  { title: 'Turma 30' },
  { title: 'Turma 31' },
  { title: 'Turma 32' }
];

export default function FrequencyClasses() {
  const { goTo } = useRoutes();

  return (
    <>
      <Typography
        variant='h1'
        paddingY={2.5}
        fontSize={24}
        fontWeight='bold'
      >
        {pt.frequencyClasses.takeAttendance}
      </Typography>
      <CardList>
        {activities.map((c, index) => {
          const classId = index + 1;
          return (
            <TextCard
              key={`${index}-${c.title}`}
              title={c.title}
              theme={index === 0 ? 'dark' : 'light'}
              onClick={() => goTo(`${classId}/chamada`)}
            />
          );}
        )}
      </CardList>
    </>
  );  
}
