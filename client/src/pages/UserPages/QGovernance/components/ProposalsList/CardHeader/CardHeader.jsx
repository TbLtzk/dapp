import React from 'react';

import Button from 'components/Base/Buttons/Button';
import ListCardHeader from 'components/Custom/PageLists/ListCardHeader';

import { LabelStatus, WrapVoteBtn } from 'components/Custom/PageLists/styles';

function CardHeader(props) {
  const { title, status, handleVote, handleExecute } = props;

  return (
    <>
      <ListCardHeader
        title={title}
        data={
          <>
            {!status ? null :
              <LabelStatus>{status}</LabelStatus>
            }
            {status === 'Passed' ?
              <WrapVoteBtn>
                <Button
                  title="Execute"
                  type="white"
                  handleButton={handleExecute}
                />
              </WrapVoteBtn> : null
            }
            {status === 'Pending' || status === 'Accepted' ?
              <WrapVoteBtn>
                <Button
                  title="Vote"
                  type="white"
                  handleButton={handleVote}
                />
              </WrapVoteBtn>
              : null
            }
          </>
        }
      />
      {/*<Header>*/}
      {/*  <Row>*/}
      {/*    <CardTitle md={8}>*/}
      {/*      <p>{title}</p>*/}
      {/*    </CardTitle>*/}
      {/*    <WrapBtnHeader md={4}>*/}
      {/*      {!status ? null :*/}
      {/*        <LabelStatus>{status}</LabelStatus>*/}
      {/*      }*/}
      {/*      {status === 'Passed' ?*/}
      {/*        <WrapVoteBtn>*/}
      {/*          <Button*/}
      {/*            title="Execute"*/}
      {/*            type="white"*/}
      {/*            handleButton={handleExecute}*/}
      {/*          />*/}
      {/*        </WrapVoteBtn> : null*/}
      {/*      }*/}
      {/*      {status === 'Pending' || status === 'Accepted' ?*/}
      {/*        <WrapVoteBtn>*/}
      {/*          <Button*/}
      {/*            title="Vote"*/}
      {/*            type="white"*/}
      {/*            handleButton={handleVote}*/}
      {/*          />*/}
      {/*        </WrapVoteBtn>*/}
      {/*        : null*/}
      {/*      }*/}
      {/*    </WrapBtnHeader>*/}
      {/*  </Row>*/}
      {/*</Header>*/}
    </>
  );
}

export default CardHeader;

