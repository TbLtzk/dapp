import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from 'components/Base/Buttons/Button';
import Calendar from 'components/Base/Calendar';
import FormInput from 'components/Base/Form/FormInput';
import ModalWindow from 'components/Base/ModalWindow';

import { CalendarWraper } from '../../../styles';
import ManageVestingBalance from '../ManageVestingBalance';

import { dateToTimestamp } from 'func/convertDate';

import 'react-datepicker/dist/react-datepicker.css';

function ModalManage ({ modalShow, setModalShow, setDeposit, setPurge, modalTitle, contract, address }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isCorrectDate, setIsCorrectDate] = useState('');

  const { register, control, handleSubmit, errors, getValues, reset } = useForm();

  useEffect(() => {
    checkCorrectDate();
  }, [startDate, endDate]);

  const checkCorrectDate = () => {
    if (!startDate || !endDate) {
      return;
    }
    if (dateToTimestamp(startDate) >= dateToTimestamp(endDate)) {
      setIsCorrectDate('Date is not correct!');
    } else {
      setIsCorrectDate('');
    }
  };

  const handleSetDeposit = () => {
    const values = getValues();
    const isFull = Object.values(values).every((value) => value !== null && value.length !== 0);
    if (isFull && isCorrectDate.length === 0) {
      handleSubmit(setDeposit)();
      setModalShow(false);
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleHideModal = () => {
    setModalShow(false);
    setStartDate(null);
    setEndDate(null);
    reset();
  };

  return (
    <ModalWindow
      show={modalShow}
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
            ref={register({ required: 'Field is required!', pattern: /[0-9]/i })}
            prefix="Q"
            min={0}
            name="amountQ"
            type="number"
            placeholder="0.0"
            valid={errors.amountQ?.message}
          />
          <div>
            <Button
              position="relative"
              right="-380px"
              type="outline"
              title="Deposit"
              width="80px"
              margin="-5px 0 10px 0"
              handleButton={handleSetDeposit}
            />
            <div className="modal-line" />
            <Button
              position="relative"
              right="-270px"
              type="outline"
              title="Purge Expired Time Locks"
              width="190px"
              margin="3px 0 20px 0"
              handleButton={() => {
                setPurge();
                handleHideModal();
              }}
            />
          </div>
        </>
      }
      onHide={handleHideModal}
    />
  );
}

export default ModalManage;
