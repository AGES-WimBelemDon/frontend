import { Typography } from '@mui/material';

import { CardList } from '../../components/CardList';
import { TextCard } from '../../components/TextCard';
import { pt } from '../../constants';

const activities = [
  { title: 'Chamada Geral' },
  { title: 'Tênis' },
  { title: 'Hidroginástica' },
  { title: 'Natação' },
  { title: 'Musculação' },
  { title: 'Spinning' },
  { title: 'Jump' },
  { title: 'Alongamento' },
  { title: 'Pilates' },
  { title: 'Yoga' },
  { title: 'Zumba' },
];

export default function Frequency() {
  return (
    <>
      <Typography
        variant='h1'
        paddingY={2.5}
        fontSize={24}
        fontWeight='bold'
      >
        {pt.frequency.takeAttendance}
      </Typography>
      <CardList>
        {activities.map((c, index) => (
          <TextCard
            key={`${index}-${c.title}`}
            title={c.title}
            theme={index === 0 ? 'dark' : 'light'}
          />
        ))}
      </CardList>
    </>
  );  
}
