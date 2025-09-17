import { useState } from 'react';

import { useDateInput } from '../../components/DateInput/hook/useDataInput';
import type { FrequencyCardStudent } from '../../components/FrequencyCard/interface';
import { pt } from '../../constants';
import { useToast } from '../../hooks/useToast';

export function useFrequencyCall() {
  const { searchParams } = useDateInput();
  const { showToast } = useToast();

  const [students, setStudents] = useState<FrequencyCardStudent[]>([
    { id: 1, name: 'Leonardo Mallet', frequencyPercent: 90, isPresent: true },
    { id: 2, name: 'João Pedro', frequencyPercent: 60, isPresent: true },
    { id: 3, name: 'Pedro Henrique', frequencyPercent: 40, isPresent: true },
    { id: 4, name: 'Thiago Camargo', frequencyPercent: 55, isPresent: true },
    { id: 5, name: 'Paulo Camargo', frequencyPercent: 55, isPresent: true },
    { id: 6, name: 'Mayara Cardi', frequencyPercent: 55, isPresent: true },
  ]);

  function updatePresence(id: number, present: boolean) {
    setStudents((prevList) =>
      prevList.map((i) =>
        i.id === id ? { ...i, isPresent: present } : i
      )
    );
  };

  function registerCall() {
    const date = searchParams.get('date');
    
    if (!students) {
      return showToast(pt.frequencyCall.errorNoStudents, 'error', true);
    }

    if (!date) {
      return showToast(pt.frequencyCall.errorNoDate, 'error', true);
    }

    return showToast(pt.frequencyCall.successSave, 'success', true);
  };

  return { students, updatePresence, registerCall};
}
