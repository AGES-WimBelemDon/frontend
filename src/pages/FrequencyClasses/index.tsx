import { CardList } from '../../components/CardList';
import { PageTitle } from '../../components/PageTitle';
import { TextCard } from '../../components/TextCard';
import { pt } from '../../constants';

const activities = [
  { title: 'Turma 30' },
  { title: 'Turma 31' },
  { title: 'Turma 32' }
];

export default function FrequencyClasses() {
  return (
    <>
      <PageTitle title={pt.frequencyClasses.pageTitle} /> 
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
