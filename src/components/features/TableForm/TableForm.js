import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getAllStatuts } from "../../../redux/statutsRedux";
import { useSelector } from "react-redux";
import styles from "./TableForm.module.scss";
import { isLoadingStatuts } from "../../../redux/statutsRedux";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const TableForm = ({ actionHandle, buttonName, formState }) => {
  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const statutsList = useSelector(getAllStatuts);
  const [peopleAmountError, setPeopleAmountError] = useState(false);

  const [form, setForm] = useState({
    ...formState,
  });

  const isLoadingDataStatuts = useSelector(isLoadingStatuts);
  if (isLoadingDataStatuts) {
    return <p>Loading ...</p>;
  }

  const updateFields = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const updateAfterStatusChanged = (e) => {
    const newFormData = { ...form };
    if (e.target.value !== "3" && newFormData.peopleAmount !== "0") {
      newFormData.peopleAmount = "0";
      newFormData.bill = "0";
      newFormData.statusId = e.target.value;
      setPeopleAmountError("Status change caused the field to be reset.");
    } else {
      newFormData.statusId = e.target.value;
      setPeopleAmountError(false);
    }
    setForm(newFormData);
  };

  const updatePeopleAmount = (e) => {
    const newFormData = { ...form };

    setPeopleAmountError(false);

    if (e.target.value < 0) {
      e.target.value = "0";
    }
    if (e.target.value > 10) {
      e.target.value = "10";
    }

    if (newFormData.statusId !== "3" && e.target.value !== "0") {
      newFormData.peopleAmount = "0";
      setPeopleAmountError("Only BUSY is allowed to have value other than 0.");
    } else if (Number(e.target.value) > Number(newFormData.maxPeopleAmount)) {
      newFormData.peopleAmount = newFormData.maxPeopleAmount;
      setPeopleAmountError(
        "People amount can't be bigger than max people amount."
      );
    } else {
      newFormData.peopleAmount = e.target.value;
      setPeopleAmountError(false);
    }
    setForm(newFormData);
  };

  const updateMaxPeopleAmount = (e) => {
    const newFormData = { ...form };

    setPeopleAmountError(false);
    if (e.target.value < 0) {
      e.target.value = "0";
    }
    if (e.target.value > 10) {
      e.target.value = "10";
    }
    if (Number(e.target.value) < Number(newFormData.peopleAmount)) {
      newFormData.peopleAmount = e.target.value;
      newFormData.maxPeopleAmount = e.target.value;
      setPeopleAmountError(
        "People amount can't be bigger than max people amount."
      );
    } else {
      newFormData.maxPeopleAmount = e.target.value;
      setPeopleAmountError(false);
    }
    setForm(newFormData);
  };

  const actionHandler = (e) => {
    actionHandle(form);
  };

  return (
    <div className={styles.smallerForm}>
      <Form onSubmit={validate(actionHandler)}>
        <Form.Group className="mb-3">
          <Form.Label>Status: </Form.Label>
          <FloatingLabel controlId="floatingSelect" label="Choose status">
            <Form.Select
              id="statusId"
              {...register("statusId", { required: true })}
              value={form.statusId}
              onChange={updateAfterStatusChanged}
            >
              {statutsList.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.statusName}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          {errors.statusId && (
            <small className="d-block form-text text-danger mt-2">
              This option should be chosen
            </small>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>People: </Form.Label>
          <Form.Control
            type="number"
            id="peopleAmount"
            className={styles.smallInput}
            {...register("peopleAmount", { required: true })}
            value={form.peopleAmount}
            onChange={updatePeopleAmount}
          />
          {errors.peopleAmount && (
            <small className="d-block form-text text-danger mt-2">
              Require 0 to 10.
            </small>
          )}
          {peopleAmountError && (
            <small className="d-block form-text text-danger mt-2">
              {peopleAmountError}
            </small>
          )}
          /
          <Form.Control
            type="number"
            id="maxPeopleAmount"
            className={styles.smallInput}
            {...register("maxPeopleAmount", {
              required: true,
            })}
            value={form.maxPeopleAmount}
            onChange={updateMaxPeopleAmount}
          />
          {errors.maxPeopleAmount && (
            <small className="d-block form-text text-danger mt-2">
              Require 0 to 10
            </small>
          )}
        </Form.Group>
        {form.statusId === "3" && (
          <Form.Group className="mb-3">
            <Form.Label>Bill: </Form.Label>
            <Form.Control
              type="text"
              id="bill"
              className={styles.bill}
              value={form.bill}
              onChange={updateFields}
            />
          </Form.Group>
        )}
        <Button variant="primary" type="submit">
          {buttonName}
        </Button>
      </Form>
    </div>
  );
};

export default TableForm;
