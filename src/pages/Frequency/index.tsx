import { useNavigate } from 'react-router';

import { CardList } from '../../components/CardList';
import { PageTitle } from '../../components/PageTitle';
import { TextCard } from '../../components/TextCard';
import { pt } from '../../constants';

const activities = [
  { title: 'Chamada Geral' },
  { title: 'Tênis', goTo: '/turmas' },
  { title: 'Hidroginástica', goTo: '/turmas' },
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

  const navigate = useNavigate();

  return (
    <>
      <PageTitle title={pt.frequency.pageTitle} />
      <CardList>
        {activities.map((c, index) => (
          <TextCard
            key={`${index}-${c.title}`}
            title={c.title}
            theme={index === 0 ? 'dark' : 'light'}
            onClick={() => c.goTo && navigate(c.goTo)}
          />
        ))}
      </CardList>
    </>
  );  
}
