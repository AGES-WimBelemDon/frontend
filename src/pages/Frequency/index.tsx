import { Typography } from '@mui/material';

import { CardList } from '../../components/CardList';
import { PageTitle } from '../../components/PageTitle';
import { TextCard } from '../../components/TextCard';
import { pt } from '../../constants';
import { useActivities } from '../../hooks/useActivities';
import { useRoutes } from '../../hooks/useRoutes';

export default function Frequency() {
  const { goTo } = useRoutes();
  const { activities, isLoadingActivities, activitiesError } = useActivities();

  if (isLoadingActivities) {
    return <Typography>{pt.frequency.loadingActivities}</Typography>;
  }

  if (activitiesError || !activities) {
    return <Typography color='error'>{pt.frequency.activitiesError}</Typography>;
  }

  return (
    <>
      <PageTitle title={pt.frequency.title} data-cy="frequency-page-title" />
      <CardList>
        {activities.map((c, index) => {
          const activityId = index + 1;
          return (
            <TextCard
              key={`${index}-${c.title}`}
              title={c.title}
              theme={index === 0 ? 'dark' : 'light'}
              onClick={() => goTo(`${activityId}/turmas`)}
            />
          );}
        )}
      </CardList>
    </>
  );  
}
