import { createContext, lazy, useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from 'ui/Button';
import Icon from 'ui/Icon';
import Switch from 'ui/Switch';

import LazyLoading from 'components/Base/LazyLoading';
import PageLayout from 'components/PageLayout';

const QParameters = lazy(() => import('./QParameters'));
const ParametersContext = createContext();

function ManageParameters () {
  const [isSimplifiedMode, setIsSimplifiedMode] = useState(false);

  return (
    <PageLayout
      title="Q Parameters"
      action={
        <div style={{ display: 'flex', gap: '16px' }}>
          <Switch
            id="parameters-switch"
            value={isSimplifiedMode}
            label="Simplified view"
            onChange={() => setIsSimplifiedMode(!isSimplifiedMode)}
          />
          <Link to="/">
            <Button
              block
              alwaysEnabled
              look="secondary"
            >
              <Icon name="dashboard" />
              <span>Dashboard</span>
            </Button>
          </Link>
        </div>
      }
    >
      <LazyLoading>
        <ParametersContext.Provider value={{ simplified: isSimplifiedMode }}>
          <QParameters />
        </ParametersContext.Provider>
      </LazyLoading>
    </PageLayout>
  );
}

/**
 * @returns {{ simplified: boolean }}
 */
export const useParametersContext = () => useContext(ParametersContext);

export default ManageParameters;
