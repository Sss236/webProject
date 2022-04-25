import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {configData} from "../config";
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile,getUserDetails } from "../actions/userActions";

export default function EditUser() {
  const [form, setForm] = useState({
    name: "",
    introduction: "",
    logo_url: "",
  });
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    user.name = form.name;
    user.introduction = form.introduction;
    user.logo_url = form.logo_url;
    dispatch(updateUserProfile(user, userInfo._id));
    navigate("/");
  }

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }else{
        dispatch(getUserDetails(userInfo._id));
        if(error){
            window.alert("Error on fetching the user");
            navigate("/");
        }
        updateForm(user);
        console.log(user);
    }
  }, [])

  // This following section will display the form that takes input from the user to update the data.
  return (

        
    <div>
      <h3>Update Your Profile</h3>
      <form onSubmit={onSubmit}>
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
          <label htmlFor="price">Introudction</label>
          <input
            type="text"
            className="form-control"
            id="introduction"
            value={form.introduction}
            onChange={(e) => updateForm({ introduction: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="logo_url">ImgUrl</label>
          <input
            type="text"
            className="form-control"
            id="logo_url"
            value={form.logo_url}
            onChange={(e) => updateForm({ logo_url: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Update profile"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
