import React from 'react'
import ContentLoader from 'react-content-loader'
import { SkeletonLoadingWrapper } from './styles'
import { darkColors } from 'constants/colors'

export function SkeletonTableLoading () {
  return (
        <SkeletonLoadingWrapper>
            <ContentLoader
                width="100%"
                height={260}
                speed={2}
                backgroundColor={darkColors.oxfordBlue}
                foregroundColor={darkColors.oxfordBlueTint3}
            >
                <rect x="0" y="0" rx="2" ry="2" width="10" height="10" />
                <rect x="30" y="0" rx="4" ry="10" width="97%" height="10" />

                <rect x="0" y="30" rx="2" ry="2" width="10" height="10" />
                <rect x="30" y="30" rx="4" ry="10" width="97%" height="10" />

                <rect x="0" y="60" rx="2" ry="2" width="10" height="10" />
                <rect x="30" y="60" rx="4" ry="10" width="97%" height="10" />

                <rect x="0" y="90" rx="2" ry="2" width="10" height="10" />
                <rect x="30" y="90" rx="4" ry="10" width="97%" height="10" />

                <rect x="0" y="120" rx="2" ry="2" width="10" height="10" />
                <rect x="30" y="120" rx="4" ry="10" width="97%" height="10" />

                <rect x="0" y="150" rx="2" ry="2" width="10" height="10" />
                <rect x="30" y="150" rx="4" ry="10" width="97%" height="10" />

                <rect x="0" y="180" rx="2" ry="2" width="10" height="10" />
                <rect x="30" y="180" rx="4" ry="10" width="97%" height="10" />

                <rect x="0" y="210" rx="2" ry="2" width="10" height="10" />
                <rect x="30" y="210" rx="4" ry="10" width="97%" height="10" />

                <rect x="0" y="240" rx="2" ry="2" width="10" height="10" />
                <rect x="30" y="240" rx="4" ry="10" width="97%" height="10" />

                <rect x="0" y="270" rx="2" ry="2" width="10" height="10" />
                <rect x="30" y="270" rx="4" ry="10" width="97%" height="10" />

                <rect x="0" y="300" rx="2" ry="2" width="10" height="10" />
                <rect x="30" y="300" rx="4" ry="10" width="97%" height="10" />
            </ContentLoader>
        </SkeletonLoadingWrapper>
  )
}

export function SkeletonAuctionLoading () {
  return (
        <SkeletonLoadingWrapper>
            <ContentLoader
                speed={2}
                width="100%"
                height={164}
                backgroundColor={darkColors.oxfordBlue}
                foregroundColor={darkColors.oxfordBlueTint3}
            >
                <rect x="20" y="25" rx="3" ry="3" width="51%" height="20" />
                <rect x="78%" y="25" rx="3" ry="3" width="20%" height="20" />

                <rect x="20" y="80" rx="3" ry="3" width="10%" height="10" />
                <rect x="35%" y="80" rx="3" ry="3" width="18%" height="10" />
                <rect x="65%" y="80" rx="3" ry="3" width="18%" height="10" />

                <rect x="20" y="100" rx="3" ry="3" width="15%" height="8" />
                <rect x="35%" y="100" rx="3" ry="3" width="10%" height="8" />
                <rect x="65%" y="100" rx="3" ry="3" width="10%" height="8" />
            </ContentLoader>
        </SkeletonLoadingWrapper>
  )
}

function SkeletonProposalsLoading () {
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

export default SkeletonProposalsLoading
