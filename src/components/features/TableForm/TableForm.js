import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
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
  console.log("hello from TableForm");

  const statutsList = useSelector(getAllStatuts);

  const [form, setForm] = useState({
    ...formState,
  });

  const isLoadingDataStatuts = useSelector(isLoadingStatuts);
  if (isLoadingDataStatuts) {
    return <p>Loading ...</p>;
  }

  const updateFields = (e) => {
    //console.log(e.target.value);
    if (e.target.value === "statusId") {
    }
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const actionHandler = (e) => {
    const newFormData = { ...form };
    if (newFormData.statusId === "1" || newFormData.statusId === "4") {
      newFormData.peopleAmount = "0";
    }
    if (newFormData.statusId !== "3") {
      newFormData.bill = "0";
    }
    if (
      Number(newFormData.peopleAmount) > Number(newFormData.maxPeopleAmount)
    ) {
      newFormData.peopleAmount = newFormData.maxPeopleAmount;
    }

    //setForm(newFormData);
    //console.log("form", form);
    //console.log("newFormData", newFormData);

    actionHandle(newFormData);
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
              onChange={updateFields}
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
            {...register("peopleAmount", { required: true, min: 0, max: 10 })}
            value={form.peopleAmount}
            onChange={updateFields}
          />
          {errors.peopleAmount && (
            <small className="d-block form-text text-danger mt-2">
              Require 0 to 10, but no more than the maximum number of people
            </small>
          )}
          /
          <Form.Control
            type="number"
            id="maxPeopleAmount"
            className={styles.smallInput}
            {...register("maxPeopleAmount", {
              required: true,
              min: 0,
              max: 10,
            })}
            value={form.maxPeopleAmount}
            onChange={updateFields}
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
