const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/books").get(function (req, res) {
  let db_connect = dbo.getDb("webProj");
  db_connect
    .collection("books")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/books/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("books")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
recordRoutes.route("/books/create").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    author: req.body.author,
    description: req.body.description,
    url: req.body.url,
    img_url:req.body.img_url,
    tag:req.body.tag,
    price:req.body.price,
    created_by:req.body.created_by,
  };
  db_connect.collection("books").insertOne(myobj, function (err, res) {
    if (err) throw err;
    console.log(res);
    response.json(res);
  });
});

recordRoutes.route("/comments/:id").get(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { name:req.params.id};
  db_connect
      .collection("comments")
      .find(myquery).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        response.json(result);
      });
});

recordRoutes.route("/comment/create").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    content: req.body.content,
    author:req.body.author,
  };
  db_connect.collection("comments").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      url: req.body.url,
      img_url:req.body.img_url,
      tag:req.body.tag,
    },
  };
  db_connect
    .collection("books")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/books/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("books").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted " + req.params.id);
    response.json(obj);
  });
  myquery = {name: req.params.id};
  db_connect.collection("comments").remove(myquery, function (err, obj) {
    if (err) throw err;
    console.log("comments deleted " + req.params.id);
  } );
});

recordRoutes.route("/users/create").post(function (req, response) {  
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    email:req.body.email,
    password:req.body.password,
    introduction: "",
    books: [],
    created_books: [],
    following: [],
    comments: [],
    logo_url: "",
  };
  db_connect.collection("accounts").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

recordRoutes.route("/users/login").post(function (req, response) {  
  let db_connect = dbo.getDb();
  let myquery = { email:req.body.email};
  db_connect.collection("accounts").findOne(myquery, function (err, result) {
    if (err) throw err;
    if(result && result.password === req.body.password){
      response.json(result);
    } else {
      response.status(401).send(new Error('Log in failed, no such account or password mismatch'));
      console.log("log in failed");
      console.log(result);
    }
  });
});

recordRoutes.route("/users/:id").get(function (req, response) {
  let db_connect = dbo.getDb();
  console.log("fetch user " + req.params.id);
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("accounts")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        response.json(result);
        console.log("get user ");
        console.log(result);
      });
});


recordRoutes.route("/users/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      name: req.body.name,
      email:req.body.email,
      password:req.body.password,
      introduction: req.body.introduction,
      books: req.body.books,
      created_books: req.body.created_books,
      following: req.body.following,
      comments: req.body.comments,
      logo_url: req.body.logo_url,
    },
  };
  db_connect
    .collection("accounts")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      newvalues.$set._id = req.params.id;
      response.json(newvalues.$set);
    });
});


recordRoutes.route("/users/checkfollow").post(function (req, response){
  let db_connect = dbo.getDb();
  let myquery = {me: req.body.me, other: req.body.other};
  db_connect
      .collection("follows")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        response.json(result);
        console.log(result);
      });
});

recordRoutes.route("/users/follow").post(function (req, response){
  let db_connect = dbo.getDb();
  let myobj = {me: req.body.me, other: req.body.other, other_name: req.body.other_name};
  db_connect.collection("follows").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});


recordRoutes.route("/users/follow").delete(function (req, response){
  let db_connect = dbo.getDb();
  let myquery = {me: req.body.me, other: req.body.other};
  db_connect.collection("follows").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted " + req.params.id);
    response.json(obj);
  });
});


recordRoutes.route("/users/checklike").post(function (req, response){
  let db_connect = dbo.getDb();
  let myquery = {me: req.body.me, book: req.body.book};
  db_connect
      .collection("likes")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        response.json(result);
        console.log(result);
      });
});

recordRoutes.route("/users/like").post(function (req, response){
  let db_connect = dbo.getDb();
  let myobj = {me: req.body.me, book: req.body.book, book_name: req.body.book_name};
  db_connect.collection("likes").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});


recordRoutes.route("/users/like").delete(function (req, response){
  let db_connect = dbo.getDb();
  let myquery = {me: req.body.me, book: req.body.book};
  db_connect.collection("likes").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted " + req.params.id);
    response.json(obj);
  });
});

recordRoutes.route("/users/likes").post(function (req, res) {
  let db_connect = dbo.getDb("webProj");
  let my_query = {me: req.body.me}
  db_connect
    .collection("likes")
    .find(my_query)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);

    });
});

recordRoutes.route("/users/follows").post(function (req, res) {
  let db_connect = dbo.getDb("webProj");
  let my_query = {me: req.body.me}
  db_connect
    .collection("follows")
    .find(my_query)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/books/search").post(function (req, res) {
  let db_connect = dbo.getDb("webProj");
  let my_query = req.body;
  db_connect
    .collection("books")
    .find(my_query)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});


module.exports = recordRoutes;
