import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

import Button from 'components/Base/Buttons/Button';
import ListCardHeader from 'components/Custom/PageLists/ListCardHeader';

import { LabelStatus, WrapVoteBtn, WrapRefreshBtn } from 'components/Custom/PageLists/styles';

function CardHeader(props) {
  const { title, status, handleVote, handleExecute, handleUpdate } = props;

  return (
    <>
      <ListCardHeader
        title={
          <WrapRefreshBtn>
            <Button
              title={<FontAwesomeIcon icon={faRedo}/>}
              type="transparent"
              handleButton={handleUpdate}
            />
            <span>{title}</span>
          </WrapRefreshBtn>
        }
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

