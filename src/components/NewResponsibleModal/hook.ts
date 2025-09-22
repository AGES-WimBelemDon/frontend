import { useSearchParams } from 'react-router';

export function useNewResponsibleModal(){

  const [searchParams, setSearchParams] = useSearchParams();

  const isOpen = searchParams.get('action') == 'open-new-responsible-modal';


  const openModal = () => {
    const params = new URLSearchParams(searchParams);
    params.set('action', 'open-new-responsible-modal');
    setSearchParams(params);
  };

  const closeModal = () => {
    const params = new URLSearchParams();
    setSearchParams(params);
  };

  return {
    isOpen,
    openModal,
    closeModal
  };
}