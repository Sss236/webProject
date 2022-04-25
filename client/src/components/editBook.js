import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {configData} from "../config";

export default function EditBook() {
  const [form, setForm] = useState({
    name: "",
    author: "",
    description: "",
    url:"",
    img_url:"",
    tag:"",
    price:"",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://${configData.SERVER_IP}:${configData.SERVER_PORT}/books/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Book with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedBook = {
      name: form.name,
      author: form.author,
      description: form.description,
      url:form.url,
      img_url:form.img_url,
      tag:form.tag,
      price:form.price,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://${configData.SERVER_IP}:${configData.SERVER_PORT}/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedBook),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Book</h3>
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
          <label htmlFor="img_url">ImgUrl</label>
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
            value="Update book"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
