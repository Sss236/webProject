import React, { useState } from "react";
import { useNavigate } from "react-router";
import {configData} from "../config";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { useEffect } from "react";
import "./login.css";
export default function CreateBook() {
  const [form, setForm] = useState({
    name: "",
    author: "",
    description: "",
    url:"",
    img_url:"",
    tag:"",
    price:"",
    created_by:"",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch();

  useEffect(() => {
    if(!userInfo){

      navigate("/login");
    } else {
      console.log(userInfo);
      dispatch(getUserDetails(userInfo._id));
      if(error){
        window.alert("get user failed");
        navigate("/");
      }
    }
  }, [])

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newBook = { ...form };
    newBook.created_by = userInfo._id;

    await fetch(`http://${configData.SERVER_IP}:${configData.SERVER_PORT}/books/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    }).then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      user.books.push([newBook.name, data.insertedId])
      dispatch(updateUserProfile(user, userInfo._id));
      if(error){
          window.alert("Error on fetching the user");
          navigate("/");
      }
    })
    .catch(error => {
      window.alert(error);
      return;
    });
  
    window.alert(userInfo.name + " successfully create book " + form.name + " "+ form.author);
    setForm({
      name: "",
      author: "",
      description: "",
      url:"",
      img_url:"",
      tag:"",
      price:"",
      created_by:"",
    });
    
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Book</h3>
      <form onSubmit={onSubmit} className="create-book">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={form.price}
            onChange={(e) => updateForm({ price: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={form.author}
            onChange={(e) => updateForm({ author: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input
            type="text"
            className="form-control"
            id="url"
            value={form.url}
            onChange={(e) => updateForm({ url: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="img_url">Image Url</label>
          <input
            type="text"
            className="form-control"
            id="img_url"
            value={form.img_url}
            onChange={(e) => updateForm({ img_url: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            value={form.tag}
            onChange={(e) => updateForm({ tag: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create book"
            className="button btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
