import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function useId() {
  const { pathname } = useLocation();

  const id = pathname.split('/')[2];

  return id;
}

export default useId;
