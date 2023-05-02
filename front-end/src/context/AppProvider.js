import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  useEffect(() => {}, []);

  const values = useMemo(() => ({}), []);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
