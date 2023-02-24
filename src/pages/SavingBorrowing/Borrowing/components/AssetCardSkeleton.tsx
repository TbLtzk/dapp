import ContentLoader from 'react-content-loader';

import { useTheme } from 'styled-components';

function AssetCardSkeleton () {
  const { colors } = useTheme();

  return (
    <ContentLoader
      speed={2}
      width="100%"
      height={280}
      backgroundColor={colors.tertiaryMiddle}
      foregroundColor={colors.tertiaryLight}
    >
      <rect
        x="0"
        y="0"
        rx="16"
        ry="16"
        width="100%"
        height="100%"
      />
    </ContentLoader>
  );
}

export default AssetCardSkeleton;
