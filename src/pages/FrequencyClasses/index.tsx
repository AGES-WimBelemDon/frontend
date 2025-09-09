import { Typography } from '@mui/material';

import { useFrequencyClasses } from './hook';
import { CardList } from '../../components/CardList';
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
      <Typography
        variant='h1'
        paddingY={2.5}
        fontSize={24}
        fontWeight='bold'
      >
        {pt.frequencyClasses.title({ activity: activityTitle })}
      </Typography>
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
