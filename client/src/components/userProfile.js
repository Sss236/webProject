import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getUserDetails } from '../actions/userActions'
import  ProfileCard  from './profileCard'
import { Row, Col, Image, ListGroup, Card, Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { USER_FOLLOW_DELETE } from '../reducers/dataConstants'
import { configData } from '../config'
import {checkFollowed, addFollow , removeFollow, getLikes, getFollows} from '../actions/dataActions'

const Comment = (props) => (
  <div style={{width:300}}>
  <td>{props.cmt[0]}:</td>
  <br/>

  <td>{props.cmt[1]}</td>
  </div>
);

function CommentList(data){
  if(!data || Object.keys(data).length === 0){
    return(<h4>No Comments Yet</h4>)
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

const CreatedBook= (props) => (
  <div style={{width:100}}>
    <Link to={`/view_book/${props.bk[1]}`}> {props.bk[0]}</Link>
  </div>
);

function CreatedBookList(data){
  if(!data || Object.keys(data).length === 0){
    return(<h4>No Books created Yet</h4>)
  }
  return(
    <ListGroup variant='flush'>
      {data.map((bk) => (
        <ListGroup.Item>
          <CreatedBook bk={bk} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

const LikedBook = (props) => {
  return(<div style={{width:100}}>
    <Link to={`/view_book/${props.bk.book}`}> {props.bk.book_name}</Link>
  </div>);
  
}

function LikedBookList(data){
  if(!data || Object.keys(data).length === 0){
    return(<h4>No Books liked Yet</h4>)
  }
  return(
    <ListGroup variant='flush'>
      {data.map((bk) => (
        <ListGroup.Item>
          <LikedBook bk={bk} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

const FollowedUser = (props) => {
  return(<div style={{width:100}}>
    <Link to={`/user_profile/${props.user.other}`}> {props.user.other_name}</Link>
  </div>);
  
}

function FollowedUserList(data){
  if(!data || Object.keys(data).length === 0){
    return(<h4>No following user yet</h4>)
  }
  return(
    <ListGroup variant='flush'>
      {data.map((user) => (
        <ListGroup.Item>
          <FollowedUser user={user} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

const UserProfile = ({ history }) => {
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const params = useParams();
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const navigate = useNavigate();

  const [followed, setFollowed] = useState();
  const [follows, setFollows] = useState();
  const [likes, setLikes] = useState();

  const followHandler = () => {
    addFollow(userInfo._id, params.id, user.name);
    setFollowed(!followed);
  }

  const unfollowHandler = () => {
    removeFollow(userInfo._id, params.id);
    setFollowed(!followed);
  }

  useEffect(() => {
    if(!userInfo){

      navigate("/login");
    } else {
      console.log(userInfo);
      dispatch(getUserDetails(params.id));
      if(error){
        window.alert("get user failed");
        navigate("/");
      }
    }
    checkFollowed(userInfo._id, params.id, setFollowed, user.name);
    getFollows(params.id, setFollows);
    getLikes(params.id, setLikes);
    return;
  }, [])
  
  function EditLink(){
    return (<Button component={Link} to="/update_profile"> Edit </Button>);
  }

  function Follow(){
    if(followed){
      return(
        <Button onClick={unfollowHandler}> Unfollow </Button>
      )
    } else {
      return( <Button onClick={followHandler}> Follow </Button>)
    }
  }

  function ActionButton(){
    if(userInfo._id === params.id){
      return EditLink();
    } else {
      return Follow();
    }
  }
  return (
    <div>
       
       {ActionButton()}
       <Row>
       <Col md={3}></Col>
       <Col md={6}><ProfileCard imageSource={user.logo_url} title={user.name} text={user.introduction} style={{width:500}}/></Col>
       
       <Col md={3}></Col>
       </Row>

       <Row>
       <Col md={6}>
        <h3> Book Created </h3>
        {CreatedBookList(user.books)}
       </Col>

       <Col md={6}>        
       <h3> Comments </h3>
        {CommentList(user.comments)}
        </Col>
       </Row>

      <br/>
      <br/>
      <br/>
       <Row>
       <Col md={6}>
        <h3> Book Liked </h3>
        {LikedBookList(likes)}
       </Col>

       <Col md={6}>        
       <h3> Following </h3>
        {FollowedUserList(follows)}
        </Col>
       </Row>
       
    </div>
  )
   

}

export default UserProfile
