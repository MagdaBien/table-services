import { useParams } from "react-router";
import { Navigate } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTableById } from "../../../redux/tablesRedux";
import { isLoadingStatuts } from "../../../redux/statutsRedux";
import { getStatusById } from "../../../redux/statutsRedux";

const Table = () => {
  //const navigate = useNavigate();

  const { id } = useParams();
  const table = useSelector((state) => getTableById(state, id));
  const status = useSelector((state) => getStatusById(state, id));

  const isLoadingDataStatuts = useSelector(isLoadingStatuts);
  if (isLoadingDataStatuts) {
    return <p>Loading ...</p>;
  }

  if (table === undefined) return <Navigate to="/" />;

  return (
    <div>
      <h1>Table</h1>
      <p>
        Chosen table number: {id} <br />
        Status: {status.statusName}
        <br />
        People: {table.peopleAmount} / {table.maxPeopleAmount} <br />
        Bill: $ {table.bill}
      </p>
    </div>
  );
};

export default Table;
