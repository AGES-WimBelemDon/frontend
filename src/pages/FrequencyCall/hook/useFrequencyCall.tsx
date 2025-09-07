import {useState } from 'react';

import { useDataInput } from '../../../components/DataInput/hook/useDataInput';
import type { FrequencyCardStudent } from '../../../components/FrequencyCard/interface';
import { useToast } from '../../../hooks/useToast';
import type { FrequencyCallObject } from '../interface';

export function useFrequencyCall() {

  const {searchParams} = useDataInput();

  const {showToast} = useToast();

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

  const registerCall = () => {
    const data = searchParams.get('data');
    if(!students){
      return showToast('Erro ao salvar a chamada, tente novamente', 'error');
    }
    if(!data) {
      return showToast('Erro ao salvar chamada, por favor insira uma data', 'error');
    } 
    const callObject : FrequencyCallObject = {
      students: students,
      data: data
    };

    console.log(callObject);
    return showToast('Chamada registrada com sucesso', 'success');
  };

  return { students, updatePresence, registerCall};
}
