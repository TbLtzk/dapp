import ContentLoader from 'react-content-loader';

import { useTheme } from 'styled-components';
import { COLORS } from 'styles/colors';

function VaultCardSkeleton () {
  const { palette } = useTheme();

  return (
    <ContentLoader
      speed={2}
      width="100%"
      height={175}
      backgroundColor={palette === 'dark' ? COLORS.blue700 : COLORS.grey100}
      foregroundColor={palette === 'dark' ? COLORS.blue600 : COLORS.grey200}
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
