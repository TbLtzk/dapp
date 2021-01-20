import React, { useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';

import BigTabsView from 'components/Base/Tabs/BigTabsView';

import { Title, WrapDescr } from 'components/Custom/PageLists/Tabs/styles';

function QTypeProposalsTabs(props) {
  const { activeDescr, votableDesc, activeContent, votableContent } = props;

  const tabsItems = useMemo(() => {
    return (
      [
        {
          label: 'active-proposals',
          title: (
            <>
              <Title>Active Proposals</Title>
              <WrapDescr>{activeDescr}</WrapDescr>
            </>
          ),
          content: activeContent
        },
        {
          label: 'only-votable',
          title: (
            <>
              <Title>Only votable</Title>
              <WrapDescr>{votableDesc}</WrapDescr>
            </>
          ),
          content: votableContent
        },
      ]
    );
  }, [activeContent, votableContent]);

  return (
    <Row>
      <Col xs={12}>
        <BigTabsView
          tabsItems={tabsItems}
        />
      </Col>
    </Row>

  );
}

export default QTypeProposalsTabs;

