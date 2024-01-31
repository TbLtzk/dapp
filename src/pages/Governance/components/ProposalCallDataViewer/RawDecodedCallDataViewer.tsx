import { HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

import { media } from '@q-dev/q-ui-kit';
import styled from 'styled-components';
import { DecodedCallDataItem } from 'typings/call-data';

const StyledWrapper = styled.div`
  .raw-decoded-call-data-viewer__item {
    display: grid;
    grid-template-columns: 120px minmax(0, 1fr);

    ${media.lessThan('medium')} {
      grid-template-columns: auto minmax(0, 1fr);
      gap: 8px;
      padding: 4px 0;

      &:first-child {
        padding-top: 0;
      }

      &:not(:last-child) {
        border-bottom: 1px solid ${({ theme }) => theme.colors.borderSecondary};
      }

      & & {
        margin-left: 16px;
      }
    }
  }

  .raw-decoded-call-data-viewer__argument {
    ${media.lessThan('medium')} {
      display: grid;
      grid-template-columns: minmax(0, 1fr);

      &:not(:last-child) {
        border-bottom: none;
      }
    }
  }

  .raw-decoded-call-data-viewer__item-key {
    border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
    padding: 8px;

    ${media.lessThan('medium')} {
      border: none;
      padding: 0;
    }
  }

  .raw-decoded-call-data-viewer__item-value {
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.borderSecondary};

    ${media.lessThan('medium')} {
      border: none;
      padding: 0;
    }
  }
`;

interface Props extends HTMLAttributes<HTMLDivElement> {
  decodedData: DecodedCallDataItem;
}

function RawDecodedCallDataViewer ({ decodedData }: Props) {
  const { t } = useTranslation();

  return (
    <StyledWrapper>
      <div className="raw-decoded-call-data-viewer__item">
        <p className="raw-decoded-call-data-viewer__item-key text-md color-secondary font-semibold">
          {t('FUNCTION')}
        </p>
        <p
          className="raw-decoded-call-data-viewer__item-value text-md break-word font-semibold"
          title={t(decodedData.functionName)}
        >
          {decodedData.functionName}
        </p>
      </div>

      {decodedData.children.length
        ? decodedData.children.map((child, index) => (
          <div key={index} className="raw-decoded-call-data-viewer__item raw-decoded-call-data-viewer__argument">
            <p className="raw-decoded-call-data-viewer__item-key text-md color-secondary font-semibold">
              {t('ARGUMENT_NUMBER', { number: index + 1 })}
            </p>
            <RawDecodedCallDataViewer
              decodedData={child}
              className="raw-decoded-call-data-viewer__item-value"
            />
          </div>
        ))
        : decodedData.arguments.map((arg, index) => (
          <div key={index} className="raw-decoded-call-data-viewer__item">
            <p
              className="raw-decoded-call-data-viewer__item-key text-md color-secondary break-word"
              title={arg.key}
            >
              {arg.key}
            </p>
            <p
              className="raw-decoded-call-data-viewer__item-value text-md break-word"
              title={String(arg.value)}
            >
              {String(arg.value)}
            </p>
          </div>
        ))
      }
    </StyledWrapper>
  );
}

export default RawDecodedCallDataViewer;
