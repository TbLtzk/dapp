import React, { useState, useEffect } from 'react'
import ModalWindow from 'components/Base/ModalWindow'
import Calendar from 'components/Base/Calendar'
import FormInput from 'components/Base/Form/FormInput'
import Button from 'components/Base/Buttons/Button'
import { useForm } from 'react-hook-form'
import { CalendarWraper } from '../../../styles'
import ManageVestingBalance from '../ManageVestingBalance'
import { dateToTimestamp } from 'func/convertDate'

import 'react-datepicker/dist/react-datepicker.css'

function ModalManage ({ modalShow, setModalShow, setDeposit, setPurge, modalTitle, contract, address }) {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [isCorrectDate, setIsCorrectDate] = useState('')

  const { register, control, handleSubmit, errors, getValues, reset } = useForm()

  useEffect(() => {
    checkCorrectDate()
  }, [startDate, endDate])

  const checkCorrectDate = () => {
    if (startDate === null || endDate === null) {
      return
    }
    if (dateToTimestamp(startDate) >= dateToTimestamp(endDate)) {
      setIsCorrectDate('Date is not correct!')
    } else {
      setIsCorrectDate('')
    }
  }

  const handleSetDeposit = () => {
    const values = getValues()
    const isFull = Object.values(values).every((x) => x !== null && x.length !== 0)
    if (isFull && isCorrectDate.length === 0) {
      handleSubmit(setDeposit)()
      setModalShow(false)
      setStartDate(null)
      setEndDate(null)
    }
  }

  return (
        <ModalWindow
            show={modalShow}
            onHide={() => {
              setModalShow(false)
              setStartDate(null)
              setEndDate(null)
              reset()
            }}
            modalTitle={modalTitle}
            content={
                <>
                    <div className="modal-line" />
                    <h5>Recipient Address</h5>
                    <h4>{address}</h4>
                    {contract === 'vesting' ? <ManageVestingBalance setModalShow={setModalShow} /> : null}
                    <CalendarWraper>
                        <Calendar
                            selectsStart={true}
                            selectsEnd={false}
                            title="Start date"
                            control={control}
                            name="startDate"
                            selected={startDate}
                            startDate={startDate}
                            endDate={endDate}
                            minDate={new Date()}
                            setDate={setStartDate}
                            isCorrectDate={isCorrectDate}
                        />
                        <Calendar
                            title="End Date"
                            selectsStart={false}
                            selectsEnd={true}
                            control={control}
                            name="endDate"
                            disabled={startDate === null}
                            setDate={setEndDate}
                            selected={endDate}
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            isCorrectDate={isCorrectDate}
                        />
                    </CalendarWraper>
                    <h4>Amount</h4>
                    <FormInput
                        lbl={'Q'}
                        min={0}
                        name="amountQ"
                        type="number"
                        placeholder="0.0"
                        ref={register({ required: 'Field is required!', pattern: /[0-9]/i })}
                        valid={errors.amountQ?.message}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            type="outline"
                            title="Deposit"
                            width="80px"
                            margin="0 0 20px 0"
                            handleButton={handleSetDeposit}
                        />
                        <Button
                            type="outline"
                            title="Purge expired time locks"
                            width="200px"
                            margin="0 0 20px 0"
                            handleButton={setPurge}
                        />
                    </div>
                </>
            }
        />
  )
}

export default ModalManage
