import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookie } from "../states/cookie";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const { cookie } = useCookie();
  const [tableData, setTableData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (cookie == null) {
      navigate("/signin");
    }
    else
      handleSession();
  }, []);

  const handleSession = (e) => {
    console.log(cookie);
    axios
      .post(`${process.env.REACT_APP_TEST_API}session`, { cookie: cookie })
      .then((response) => {
        if(response.data.success)
        {
          console.log(response.data);
          setIsLogin(true);
          getTableData();
        }
        else
          navigate("/signin");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getTableData = () => {
    axios
      .post(`${process.env.REACT_APP_TEST_API}table`, { cookie: cookie })
      .then((response) => {
        console.log(response.data);
        setTableData(response.data.message.tabledata);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getTableHeader = () => {
    let tableHead = tableData[0];
    console.log(tableHead);
    tableHead = tableHead.map((item,key) => {
      return <th key={key}>{item}</th>;
    })

    console.log(tableHead);
    return tableHead;
  }

  const getTableBody = () => {
    let data = [];
    for(let i=0; i < tableData?.length; i++)
    {
      let tableRow = tableData[i];
      tableRow = tableRow.map((item, key) => {
        return <td key={key}>{item}</td>;
      })
      
      data = [...data, <tr>{tableRow}</tr>];
    }
    return data;
  }
  return (
    <>
    {isLogin && (
      <>
      <h1 className="page-title">Home</h1>
      {tableData.length > 1 && (
        <div className="home-body">
        <Table striped bordered hover>
          <thead>
            <tr>
              {getTableHeader()}
            </tr>
          </thead>
          <tbody>
            {getTableBody()}
          </tbody>
        </Table>
        </div>
      )}
      </>
      )}
    </>
  );
};

export default Home;
