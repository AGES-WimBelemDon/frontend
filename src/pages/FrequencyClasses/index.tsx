import { Typography } from '@mui/material';

import { useFrequencyClasses } from './hook';
import { CardList } from '../../components/CardList';
import { PageTitle } from '../../components/PageTitle';
import { TextCard } from '../../components/TextCard';
import { pt } from '../../constants';

export default function FrequencyClasses() {
  const {
    goTo,
    isLoadingClasses,
    classesError,
    classes,
    activityTitle,
  } = useFrequencyClasses();

  if (isLoadingClasses) {
    return <Typography>{pt.frequencyClasses.loadingClasses}</Typography>;
  }

  if (classesError || !classes) {
    return <Typography color='error'>{pt.frequencyClasses.classesError}</Typography>;
  }

  return (
    <>
      <PageTitle
        title={pt.frequencyClasses.title({ activity: activityTitle })}
        dataCy='frequency-classes'
      />
      <CardList>
        {classes.map((c, index) => {
          return (
            <TextCard
              key={c.id}
              title={c.title}
              theme={index === 0 ? 'dark' : 'light'}
              onClick={() => goTo(`${c.id}/chamada`)}
            />
          );}
        )}
      </CardList>
    </>
  );  
}
