import React from 'react'
import ContentLoader from 'react-content-loader'
import { SkeletonLoadingWrapper } from './styles'
import { darkColors } from 'constants/colors'

function SkeletonLoading () {
  return (
        <SkeletonLoadingWrapper>
            <ContentLoader
                speed={2}
                width="100%"
                height={170}
                backgroundColor={darkColors.oxfordBlue}
                foregroundColor={darkColors.oxfordBlueTint3}
            >
                <rect x="20" y="20" rx="3" ry="3" width="60%" height="20" />
                <rect x="75%" y="20" rx="3" ry="3" width="15%" height="20" />

                <rect x="20" y="65" rx="3" ry="3" width="18%" height="10" />
                <rect x="35%" y="65" rx="3" ry="3" width="18%" height="10" />
                <rect x="75%" y="65" rx="3" ry="3" width="18%" height="10" />

                <rect x="20" y="88" rx="3" ry="3" width="5%" height="8" />
                <rect x="35%" y="88" rx="3" ry="3" width="22%" height="8" />
                <rect x="75%" y="88" rx="3" ry="3" width="22%" height="8" />
            </ContentLoader>
        </SkeletonLoadingWrapper>
  )
}

export default SkeletonLoading
