import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard'

function VersionsTable (props) {
  const {
    data,
    header
  } = props
  return (
    <>
      <h3>{header}</h3>
      {data?.map((line, index) => {
        return (
          <div key={index + '-validator-line'} style={{ display: 'flex' }}>
            {
              line.map(item => {
                const text = item.name + '-' + item.value
                return (
                  <div key={item.name + '-validator-pool'} style={{ width: '50%' }}>
                    <h5>{item.name}</h5>
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={
                        <Tooltip id={'tooltip-top' + index}>
                          <span>Copy to clipboard</span>
                        </Tooltip>
                      }
                    >
                      <CopyToClipboard text={text}>
                        <p>{item.value}</p>
                      </CopyToClipboard>
                    </OverlayTrigger>
                  </div>
                )
              })
            }
          </div>
        )
      })}
    </>
  )
}

export default VersionsTable
