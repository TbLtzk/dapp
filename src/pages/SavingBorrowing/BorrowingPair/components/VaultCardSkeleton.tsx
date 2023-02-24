import ContentLoader from 'react-content-loader';

import { useTheme } from 'styled-components';

function VaultCardSkeleton () {
  const { colors } = useTheme();

  return (
    <ContentLoader
      speed={2}
      width="100%"
      height={175}
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

export default VaultCardSkeleton;
