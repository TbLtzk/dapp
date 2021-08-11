import React  from "react";
import FormInput from "components/Base/Form/FormInput";
import Button from "components/Base/Buttons/Button";

import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";

import { setVestingWithdraw } from "store/actions/action-creaters/vesting";

function ManageVestingBalance() {
    const dispatch = useDispatch();

    const { register, handleSubmit, errors} = useForm();

    const setWithdrawVesting = (formData) => {
        dispatch(setVestingWithdraw(formData.amountQ));
    };

    return (
        <>
            <div className="modal-line" />
            <h4>Amount</h4>
            <FormInput
                lbl={"Q"}
                min={0}
                name="amountQ"
                type="number"
                placeholder="0.0"
                ref={register({
                    required: "Field is required!",
                    pattern: /[0-9]/i,
                })}
                valid={errors.amountQ?.message}
            />
            <Button
                type="outline"
                margin="0px 0px 12px 0px"
                title="Withdraw"
                width="90px"
                handleButton={handleSubmit(setWithdrawVesting)}
            />
        </>
    );
}

export default ManageVestingBalance;
