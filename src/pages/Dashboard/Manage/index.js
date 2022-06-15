import { createContext, lazy, useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/Base/Button';
import LazyLoading from 'components/Base/LazyLoading';
import PageWrap from 'components/Base/PageWrap';

import { ParametersSwitch } from './styles';

const QParameters = lazy(() => import('./QParameters'));
const ParametersContext = createContext();

function ManageParameters () {
  const [isSimplifiedMode, setIsSimplifiedMode] = useState(false);

  return (
    <PageWrap
      headerTitle="Q Parameters"
      headerExtra={
        <>
          <ParametersSwitch
            id="parameters-switch"
            checked={isSimplifiedMode}
            label="Simplified view"
            onChange={() => setIsSimplifiedMode(!isSimplifiedMode)}
          />
          <Link to="/">
            <Button
              alwaysEnabled
              look="white"
            >
              Dashboard
            </Button>
          </Link>
        </>
      }
    >
      <LazyLoading>
        <ParametersContext.Provider value={{ simplified: isSimplifiedMode }}>
          <QParameters />
        </ParametersContext.Provider>
      </LazyLoading>
    </PageWrap>
  );
}

/**
 * @returns {{ simplified: boolean }}
 */
export const useParametersContext = () => useContext(ParametersContext);

export default ManageParameters;
