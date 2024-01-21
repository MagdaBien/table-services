import { Routes, Route } from "react-router-dom";
import Tables from "./components/pages/Tables/Tables";
import Table from "./components/pages/Table/Table";
import TableAdd from "./components/pages/TableAdd/TableAdd";
import TableEdit from "./components/pages/TableEdit/TableEdit";
import ErrorPage from "./components/pages/ErrorPage/ErrorPage";
import { Container } from "react-bootstrap";
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";
import { fetchTables } from "./redux/tablesRedux";
import { fetchStatuts } from "./redux/statutsRedux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTables());
    dispatch(fetchStatuts());
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Tables />} />
        <Route path="/tableAdd" element={<TableAdd />} />
        <Route path="/tableEdit/:id" element={<TableEdit />} />
        <Route path="/table/:id" element={<Table />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
