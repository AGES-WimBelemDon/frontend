import { useEffect, useState } from 'react';

import type {
  FrequencyCardStudent,
} from '../../../components/FrequencyCard/interface';

export function useFrequencyCall() {
  const [students, setStudents] = useState<FrequencyCardStudent[]>([
    {
      index: 1,
      name: 'Leonardo Mallet',
      frequencyPercent: 90,
      isPresent: true,
    },
    { index: 2, name: 'João Pedro', frequencyPercent: 60, isPresent: true },
    {
      index: 3,
      name: 'Pedro Henrique',
      frequencyPercent: 40,
      isPresent: true,
    },
    {
      index: 4,
      name: 'Thiago Camargo',
      frequencyPercent: 55,
      isPresent: true,
    },
    {
      index: 5,
      name: 'Paulo Camargo',
      frequencyPercent: 55,
      isPresent: true,
    },
    {
      index: 6,
      name: 'Mayara Cardi',
      frequencyPercent: 55,
      isPresent: true,
    },
  ]);

  const updatePresence = (index: number, present: boolean) => {
    setStudents((prevList) =>
      prevList.map((i) =>
        i.index === index ? { ...i, isPresent: present } : i
      )
    );
  };

  useEffect(() => {
    console.log('Alunos atualizados: ', students);
  }, [students]);

  return { students, updatePresence };
}
