import { useEffect, useState } from 'react';

import type { FrequencyCardStudent } from '../../components/FrequencyCard/interface';
import { useDateInput } from '../../components/Inputs/DateInput/hook';
import { pt } from '../../constants';
import { useActivities } from '../../hooks/useActivities';
import { useClasses } from '../../hooks/useClasses';
import { useRoutes } from '../../hooks/useRoutes';
import { useStudents } from '../../hooks/useStudents';
import { useToast } from '../../hooks/useToast';

export function useFrequencyCall() {
  const { getActivityTitleById } = useActivities();
  const { getClassTitleById } = useClasses();
  const {getDate} = useDateInput('1');
  const { getPathParamId } = useRoutes();
  const { students: apiStudents } = useStudents();
  const { showToast } = useToast();

  const activityId = getPathParamId('atividades');
  const activityTitle = !activityId ? ''
    : getActivityTitleById(activityId);
  
  const classId = getPathParamId('turmas');
  const classTitle = !classId ? ''
    : getClassTitleById(classId);

  const [students, setStudents] = useState<FrequencyCardStudent[]>([]);

  useEffect(function markAllStudentsAsPresent() {
    if (apiStudents) {
      setStudents(apiStudents.map(apiStudent => ({ ...apiStudent, isPresent: true })));
    }
  }, [apiStudents]);

  function updatePresence(id: string, present: boolean) {
    setStudents((prevList) =>
      prevList.map((i) =>
        i.id === id ? { ...i, isPresent: present } : i
      )
    );
  };

  function registerCall() {
    const date = getDate();
    
    if (!students) {
      return showToast(pt.frequencyCall.errorNoStudents, 'error', true);
    }

    if (!date) {
      return showToast(pt.frequencyCall.errorNoDate, 'error', true);
    }

    return showToast(pt.frequencyCall.successSave, 'success', true);
  };

  return {
    students,
    updatePresence,
    registerCall,
    activityTitle,
    classTitle,
  };
}
