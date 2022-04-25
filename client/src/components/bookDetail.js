import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form, } from 'react-bootstrap'
import { useParams, useNavigate } from "react-router";
import { configData } from "../config";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import {AiTwotoneLike, AiOutlineLike} from "react-icons/ai"
import { checkLiked, addLike, removeLike } from "../actions/dataActions";
// import { Rating } from "./rating";

const Comment = (props) => (
    <div style={{width:300}}>
    <td>{props.cmt.content}</td>
    <br/>
    <td>      ----</td>
    <td>{props.cmt.author}</td>
    </div>
);

function commentList(data){
  if(Object.keys(data).length === 0){
    return(<h3>No Comments Yet</h3>)
  }
  return(
    <ListGroup variant='flush'>
      {data.map((cmt) => (
        <ListGroup.Item>
          <Comment cmt={cmt} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
export default function BookDetail(){
    const [textareaContent, settextareaContent] = useState(
      "Leave a comment here"
    );
    const [comments, setComments] = useState({});
    
    const [bookInfo, setBookInfo] = useState({
        name: "",
        author: "",
        description: "",
        url:"",
        img_url:"",
        tag:"",
        price:"",
      });
      const params = useParams();
      const [liked, setLiked] = useState(false);

      const dispatch = useDispatch()

      const userDetails = useSelector((state) => state.userDetails)
      const { loading, error, user } = userDetails
    
      const userLogin = useSelector((state) => state.userLogin)
      const { userInfo } = userLogin
      const navigate = useNavigate();

      useEffect(() => {
        if(!userInfo){
          navigate("/login");
        } else{
          dispatch(getUserDetails(userInfo._id));
          if(error){
            window.alert("get user failed");
            navigate("/");
          }
          checkLiked(userInfo._id, params.id, setLiked);
        }
        async function fetchComments() {
          const id = params.id.toString();
          const response = await fetch(`http://${configData.SERVER_IP}:${configData.SERVER_PORT}/comments/${params.id.toString()}`);
    
          if (!response.ok) {
            const message = `An error has occured: ${response.statusText}`;
            window.alert(message);
            return;
          }
    
          const data = await response.json();
          if (!data) {
            window.alert(`Comments for book with id ${id} not found`);
            navigate("/");
            return;
          }
          console.log(data);
          setComments(data);
        }
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
    
          setBookInfo(record);
        }
    
        fetchData();
        fetchComments();
        return;
      }, [params.id, navigate]);


      async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newComment = { name:params.id, content:textareaContent, author:user.name };
    
        await fetch(`http://${configData.SERVER_IP}:${configData.SERVER_PORT}/comment/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        }).then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          user.comments.push([bookInfo.name, textareaContent, data.insertedId])
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
        comments.push(newComment);
        settextareaContent("");
      }

      const LikeButtonHandler = () => {
        if(liked){
          removeLike(userInfo._id, params.id);
        } else {
          addLike(userInfo._id, params.id, bookInfo.name);
        }
        setLiked(!liked);
      }

      function LikeButton(){
        if(liked){
          return (<Button onClick={LikeButtonHandler}><AiTwotoneLike/></Button>);
        } else {
          return(<Button onClick={LikeButtonHandler}><AiOutlineLike/></Button>);
        }
      }
      return(
        <>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>
        <div>
        <Row>
        <Col md={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{bookInfo.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  Author: {bookInfo.author}
                </ListGroup.Item>
                <ListGroup.Item>Price: $ {bookInfo.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {bookInfo.description}
                </ListGroup.Item>
                <ListGroup.Item>
                <Link className="btn btn-link" to={`/user_profile/${bookInfo.created_by}`}>Who recommends this?</Link>
                </ListGroup.Item>
              </ListGroup>
              {LikeButton()}             
        </Col>
        <Col md={6}><Image src={bookInfo.img_url} alt={bookInfo.name} ></Image></Col>
        </Row>
        <br/>
        <br/>
        <br/>
        <Row>
        <Col md={6}>
          <h2>Comments</h2>
        <tbody>{commentList(comments)}</tbody>
        </Col>
        <Col md={6}>
          <h2>Leave Your Comment :)</h2>  
          <form onSubmit={onSubmit}>
            <div >
              <textarea style={{minHeight: 100, width: 500}} value={textareaContent} onChange= {(event) => {settextareaContent(event.target.value)}} />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Submit comment"
                className="btn btn-primary"
              />
            </div>
          </form>
        </Col>
        </Row>
        </div>
        </>
      );

};