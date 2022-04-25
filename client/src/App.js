import React from "react";



// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import BookList from "./components/bookList";
import EditBook from "./components/editBook";
import CreateBook from "./components/createBook";
import BookDetail from "./components/bookDetail";
import RegisterScreen from "./components/register";
import LoginScreen from "./components/login";
import EditUser from "./components/updateUser";
import UserProfile from "./components/userProfile";

const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route exact path="/" element={<BookList />} />
        <Route path="/edit/:id" element={<EditBook />} />
        <Route path="/create" element={<CreateBook />} />
        <Route path="/view_book/:id" element={<BookDetail />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/update_profile" element={<EditUser/>}/>
        <Route path="/user_profile/:id" element={<UserProfile/>}/>
      </Routes>
      </div>
    </div>
  );
};

export default App;



