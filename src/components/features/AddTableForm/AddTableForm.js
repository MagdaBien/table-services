import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TableForm from "../TableForm/TableForm";
import { addTableRequest } from "../../../redux/tablesRedux";

const AddTableForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = {
    id: "",
    statusId: "1",
    peopleAmount: "0",
    maxPeopleAmount: "",
    bill: 0,
  };

  const handleSubmit = (form) => {
    dispatch(addTableRequest(form));
    navigate("/");
  };

  return (
    <TableForm
      actionHandle={handleSubmit}
      buttonName="ADD TABLE"
      formState={form}
    ></TableForm>
  );
};

export default AddTableForm;
