import ContentLoader from 'react-content-loader';

import { COLORS, darkColors } from 'styles/colors';

import { SkeletonLoadingWrapper } from './styles';

export function SkeletonTableLoading ({ tiny = false }) {
  const generateSize = (nRow) =>
    tiny
      ? { y: `${nRow * 30}`, x: '0', height: '20', ry: '8', rx: '10' }
      : { y: `${nRow * 70}`, x: '0', height: '60', ry: '16', rx: '20' };

  return (
    <ContentLoader
      width="100%"
      height={tiny ? 210 : 410}
      speed={2}
      backgroundColor={COLORS.blue900}
      foregroundColor={darkColors.oxfordBlueTint3}
    >
      <rect width="100%" {...generateSize(0)} />
      <rect width="100%" {...generateSize(1)} />
      <rect width="100%" {...generateSize(2)} />
      <rect width="100%" {...generateSize(3)} />
      <rect width="100%" {...generateSize(4)} />
      <rect width="100%" {...generateSize(5)} />
      <rect width="100%" {...generateSize(6)} />
    </ContentLoader>
  );
}

export function SkeletonAuctionLoading () {
  return (
    <SkeletonLoadingWrapper>
      <ContentLoader
        speed={2}
        width="100%"
        height={164}
        backgroundColor={COLORS.blue900}
        foregroundColor={darkColors.oxfordBlueTint3}
      >
        <rect
          x="20"
          y="25"
          rx="3"
          ry="3"
          width="51%"
          height="20"
        />
        <rect
          x="78%"
          y="25"
          rx="3"
          ry="3"
          width="20%"
          height="20"
        />

        <rect
          x="20"
          y="80"
          rx="3"
          ry="3"
          width="10%"
          height="10"
        />
        <rect
          x="35%"
          y="80"
          rx="3"
          ry="3"
          width="18%"
          height="10"
        />
        <rect
          x="65%"
          y="80"
          rx="3"
          ry="3"
          width="18%"
          height="10"
        />

        <rect
          x="20"
          y="100"
          rx="3"
          ry="3"
          width="15%"
          height="8"
        />
        <rect
          x="35%"
          y="100"
          rx="3"
          ry="3"
          width="10%"
          height="8"
        />
        <rect
          x="65%"
          y="100"
          rx="3"
          ry="3"
          width="10%"
          height="8"
        />
      </ContentLoader>
    </SkeletonLoadingWrapper>
  );
}

function SkeletonProposalsLoading () {
  return (
    <SkeletonLoadingWrapper>
      <ContentLoader
        speed={2}
        width="100%"
        height={165}
        backgroundColor={COLORS.blue900}
        foregroundColor={darkColors.oxfordBlueTint3}
      >
        <rect
          x="20"
          y="22"
          rx="3"
          ry="3"
          width="30%"
          height="16"
        />
        <rect
          x="80%"
          y="20"
          rx="3"
          ry="3"
          width="15%"
          height="20"
        />

        <rect
          x="20"
          y="60"
          rx="3"
          ry="3"
          width="60%"
          height="25"
        />

        <rect
          x="20"
          y="110"
          rx="3"
          ry="3"
          width="18%"
          height="10"
        />
        <rect
          x="50%"
          y="110"
          rx="3"
          ry="3"
          width="18%"
          height="10"
        />

        <rect
          x="20"
          y="130"
          rx="3"
          ry="3"
          width="25%"
          height="12"
        />
        <rect
          x="50%"
          y="130"
          rx="3"
          ry="3"
          width="25%"
          height="12"
        />
      </ContentLoader>
    </SkeletonLoadingWrapper>
  );
}

export default SkeletonProposalsLoading;
