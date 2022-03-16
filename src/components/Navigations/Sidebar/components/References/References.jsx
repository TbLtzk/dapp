import React from 'react'
import { ALinkStyle } from '../../styles'
import AccordionElements from '../AccordionElements'
import { latestConstitution } from 'constants/constitution'
import { networkSelector } from 'store/user-inf/selectors'
import { useSelector } from 'react-redux'
import { mainnetDocsUrl, testnetDocsUrl } from 'constants/config'

function References () {
  const network = useSelector(networkSelector)

  const referencesItems = [
    {
      label: 'Constitution',
      location: latestConstitution
    },
    {
      label: 'Repositories',
      location: 'https://gitlab.com/q-dev'
    },
    {
      label: 'Tutorials',
      location: network === '35441' ? mainnetDocsUrl : testnetDocsUrl
    }
  ]

  return (
        <AccordionElements margin="24px 0 0 0" title="References">
            {referencesItems.map((value, key) => (
                <ALinkStyle key={'references' + key} className="nav-link" href={value.location} target="_blank">
                    {value.label}
                </ALinkStyle>
            ))}
        </AccordionElements>
  )
}

export default References
