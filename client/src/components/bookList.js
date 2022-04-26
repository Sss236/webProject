import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { configData } from "../config";
import { useSelector } from "react-redux";
import {getRecords, searchBooks}  from "../actions/dataActions";
import {Row} from 'react-bootstrap';




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
  const [searchCategory, setSearchCategory] = useState("Name");  
  var query_value = "";
  const navigate = useNavigate();
  // This method fetches the records from the database.

  useEffect(() => {
    if(!userInfo){
      navigate("/login");
    }
    getRecords(setRecords);
    return; 
  }, []);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://${configData.SERVER_IP}:${configData.SERVER_PORT}/books/${id}`, {
      method: "DELETE"
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  function searchHandler(e){
    e.preventDefault();
    if(!query_value || query_value.length === 0){
      return;
    }
    searchBooks(setRecords, searchCategory, query_value);
  }

  function clearHandler(e){
    e.preventDefault();
    getRecords(setRecords);
  }

  function categoryHandler(e){
    e.preventDefault();
    setSearchCategory(e.target.value);
  }

  const googleHanlder = (e) => {
    e.preventDefault();
    if(!query_value || query_value.length === 0){
      return;
    }
    var google_query = query_value;
    google_query.replace(/\s/g, '+') 
    window.open(`https://www.google.com/search?tbm=bks&q=${google_query}`);
  };

  const SearchBar = (props) => (
    <div>
    <form onSubmit={searchHandler}>
        <Row>
        <label htmlFor="header-search" style={{'margin-left':40}}>
            <span className="visually-hidden">Search books</span>
        </label>
        <select value={searchCategory} style={{'margin-left':20, height:30}} onChange={categoryHandler} >
          <option value="Name">Name</option>
          <option value="Author">Author</option>
          <option value="Tag">Tag</option>
        </select>
        <div className="form-group" style={{'margin-left':20}}>
        <input
            type="text"
            placeholder="Search your books"
            name="s"
            onChange={(e) => query_value = e.target.value}
            style={{width:300}}
        />
        </div>
        <p>     </p>
        <button type="submit" style={{'margin-left':50, height:30}}>Search</button>
        <button onClick={clearHandler} style={{'margin-left':50, height:30}}>Clear</button>
        </Row>
        <button class="btn btn-success" onClick={googleHanlder}>Search on Google</button>

    </form>
    
    </div>
  );

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
      <SearchBar></SearchBar>
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
