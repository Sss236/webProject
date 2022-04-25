import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { configData } from "../config";
import { useSelector } from "react-redux";
function buttonArray(props){
  if(props.record.created_by === props.id){
    return (<div><Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
    <button className="btn btn-link"
      onClick={() => {
        props.deleteRecord(props.record._id);
      }}
    >
      Delete
    </button> |
    <Link className="btn btn-link" to={`/view_book/${props.record._id}`}>View</Link>
    </div>);
  } else {
    return (
      <div><Link className="btn btn-link" to={`/view_book/${props.record._id}`}>View</Link></div>
    )
  }
}
const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.author}</td>
    <td>{props.record.tag}</td>
    <td> 
      {buttonArray(props)}
    </td>
  </tr>
);

export default function BookList() {
  const [records, setRecords] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;  
  const navigate = useNavigate();
  // This method fetches the records from the database.

  useEffect(() => {
    if(!userInfo){
      navigate("/login");
    }
    async function getRecords() {
      const response = await fetch(`http://${configData.SERVER_IP}:${configData.SERVER_PORT}/books/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return; 
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://${configData.SERVER_IP}:${configData.SERVER_PORT}/books/${id}`, {
      method: "DELETE"
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
          id={userInfo._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Book List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Tag</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
