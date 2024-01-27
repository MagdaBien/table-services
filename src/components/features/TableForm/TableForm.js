import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { getAllStatuts } from "../../../redux/statutsRedux";
import { useSelector } from "react-redux";
import styles from "./TableForm.module.scss";
import { isLoadingStatuts } from "../../../redux/statutsRedux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useEffect } from "react";

const TableForm = ({ actionHandle, buttonName, formState }) => {
  const isLoadingDataStatuts = useSelector(isLoadingStatuts);
  const statutsList = useSelector(getAllStatuts);
  const [form, setForm] = useState({
    ...formState,
  });
  const [errorPeople, setErrorPeople] = useState(false);

  useEffect(() => {
    setErrorPeople(false);
    const minPeople = "0";
    const maxPeople = "10";

    const newFormData = { ...form };

    // checking min and max value
    if (Number(newFormData.peopleAmount) < Number(minPeople)) {
      newFormData.peopleAmount = minPeople;
      setErrorPeople("Minimum amount is " + minPeople);
    }
    if (Number(newFormData.peopleAmount) > Number(maxPeople)) {
      newFormData.peopleAmount = maxPeople;
      setErrorPeople("Maximum amount is " + maxPeople);
    }
    if (Number(newFormData.maxPeopleAmount) < Number(minPeople)) {
      newFormData.maxPeopleAmount = minPeople;
      setErrorPeople("Minimum amount is " + minPeople);
    }
    if (Number(newFormData.maxPeopleAmount) > Number(maxPeople)) {
      newFormData.maxPeopleAmount = maxPeople;
      setErrorPeople("Maximum amount is " + maxPeople);
    }
    // checking if amount people is bigger than max
    if (
      Number(newFormData.peopleAmount) > Number(newFormData.maxPeopleAmount)
    ) {
      newFormData.peopleAmount = newFormData.maxPeopleAmount;
      setErrorPeople("People amount can't be bigger than max people amount.");
    }

    // cleaning table (people amount and bill) when status other than busy
    if (newFormData.statusId !== "3" && newFormData.peopleAmount !== "0") {
      newFormData.peopleAmount = "0";
      newFormData.bill = "0";
      setErrorPeople("Only BUSY is allowed to have value other than 0.");
    }

    if (errorPeople !== false) {
      setForm(newFormData);
    }
  }, [form, errorPeople]);

  const updateFields = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const actionHandler = (e) => {
    actionHandle(form);
  };

  if (isLoadingDataStatuts) {
    return <p>Loading ...</p>;
  }

  return (
    <div className={styles.smallerForm}>
      <Form onSubmit={actionHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Status: </Form.Label>
          <FloatingLabel controlId="floatingSelect" label="Choose status">
            <Form.Select
              id="statusId"
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
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>People: </Form.Label>
          <Form.Control
            type="number"
            id="peopleAmount"
            className={styles.smallInput}
            value={form.peopleAmount}
            onChange={updateFields}
          />
          /
          <Form.Control
            type="number"
            id="maxPeopleAmount"
            className={styles.smallInput}
            value={form.maxPeopleAmount}
            onChange={updateFields}
          />
          <p className="er">{errorPeople}</p>
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
