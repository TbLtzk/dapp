import React, { useCallback, useMemo } from 'react';
import { TitleSmall, Text, Link } from 'components/Custom/PageLists/styles';
import { PROPOSALS_TYPES } from 'constants/statuses';

const EMPTY_ADDR = '0x0000000000000000000000000000000000000000';

function PollDetail(props) {
  const {
    pollDetail,
    proposalsKind
  } = props;

  const showDataArr = useMemo(() => {
    switch (proposalsKind) {
      case PROPOSALS_TYPES.proposals:
        return [
          {
            label: 'Current constitution hash',
            value: pollDetail?.currentConstitutionHash
          },
          {
            label: 'New constitution hash',
            value: pollDetail?.newConstitutionHash
          },
          {
            label: 'Parameter type',
            value: pollDetail?.parameterType
          },
          {
            label: 'Parameter key',
            value: pollDetail?.parameterKey
          },
          {
            label: 'Parameter value',
            value: String(pollDetail?.parameterValue)
          },
        ];
      case PROPOSALS_TYPES.rootNodePanel:
        let rootNodeArr = [];
        if (pollDetail.candidate && pollDetail.candidate !== EMPTY_ADDR) {
          rootNodeArr.push({
            label: 'Proposal to Add Root Node',
            value: pollDetail.candidate
          });
        }
        if (pollDetail.replaceDest && pollDetail.replaceDest !== EMPTY_ADDR) {
          rootNodeArr.push({
            label: 'Proposal to Remove Root Node',
            value: pollDetail.replaceDest
          });
        }
        return rootNodeArr;
      case PROPOSALS_TYPES.expertProposals:
        if (pollDetail.kindVoting === 'membership') {
          let membershipArr = [];
          if (pollDetail.addressToAdd && pollDetail.addressToAdd !== EMPTY_ADDR) {
            membershipArr.push({
              label: 'Address to Add',
              value: pollDetail.addressToAdd
            });
          }
          if (pollDetail.addressToRemove && pollDetail.addressToRemove !== EMPTY_ADDR) {
            membershipArr.push({
              label: 'Address to Remove',
              value: pollDetail.addressToRemove
            });
          }
          return membershipArr;
        } else {
          return [
            {
              label: 'Parameter type',
              value: pollDetail?.parameterType
            },
            {
              label: 'Parameter key',
              value: pollDetail?.parameterKey
            },
            {
              label: 'Parameter value',
              value: String(pollDetail?.parameterValue)
            },
          ];
        }
      case PROPOSALS_TYPES.slashingProposals:
        return [
          {
            label: 'Candidate',
            value: pollDetail?.candidate
          },
          {
            label: 'Amount to slash',
            value: pollDetail?.amountToSlash + 'Q'
          },
        ];
    }

  }, [pollDetail]);

  const printValues = (label, value, key) => {
    {
      return !value || value === 'undefined' ? null :
        <Text key={key + label.replace(/ /g, '-')
          .toLowerCase()}>
          {label}: {value}
        </Text>;
    }
  };

  const showContent = useCallback(() => {
    return showDataArr.map((el, i) => {
      return printValues(el.label, el.value, i);
    });

  }, [showDataArr]);

  const checkLinkAndPrint = () => {
    let hrefValue = '';
    if (pollDetail?.remark?.includes('http') || pollDetail?.remark?.includes('https')) {
      hrefValue = pollDetail.remark;
    } else {
      hrefValue = '//' + pollDetail.remark;
    }
    return <Link href={hrefValue} target="_blank">{pollDetail.remark}</Link>;
  };

  return (
    <div>
      <TitleSmall>Description</TitleSmall>
      {showContent()}
      <TitleSmall>External Reference</TitleSmall>
      {checkLinkAndPrint()}
    </div>
  );
}

export default PollDetail;

