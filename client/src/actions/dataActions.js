import {configData} from "../config";


export async function checkFollowed(me_id, other_id, setFollowed) {
    var query = {me: me_id , other: other_id};
    await fetch(`http://${configData.SERVER_IP}:${configData.SERVER_PORT}/users/checkfollow`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(query),
        }).then(response => response.json())
        .then(data => {
        console.log(data);
          if(data){
            setFollowed(true);
          } else {
            setFollowed(false);
          }
        })
        .catch(error => {
          window.alert(error);
          return false;
        });
  }


export async function addFollow(me_id, other_id, other_name){
    var newFollow = {me: me_id , other: other_id, other_name: other_name};
    await fetch(`http://${configData.SERVER_IP}:${configData.SERVER_PORT}/users/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFollow),
    }).then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      window.alert(error);
      return;
    });
}

export async function removeFollow(me_id, other_id){
    var newFollow = {me: me_id , other: other_id};
    await fetch(`http://${configData.SERVER_IP}:${configData.SERVER_PORT}/users/follow`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFollow),
    }).then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      window.alert(error);
      return;
    });
}

export async function checkLiked(me_id, book_id, setLiked) {
  var query = {me: me_id , book: book_id};
  await fetch(`http://${configData.SERVER_IP}:${configData.SERVER_PORT}/users/checklike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      }).then(response => response.json())
      .then(data => {
      console.log(data);
        if(data){
          setLiked(true);
        } else {
          setLiked(false);
        }
      })
      .catch(error => {
        window.alert(error);
        return false;
      });
}


export async function addLike(me_id, book_id, book_name){
  var newLike = {me: me_id , book: book_id, book_name: book_name};
  await fetch(`http://${configData.SERVER_IP}:${configData.SERVER_PORT}/users/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newLike),
  }).then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    window.alert(error);
    return;
  });
}

export async function removeLike(me_id, book_id){
  var newLike = {me: me_id , book: book_id};
  await fetch(`http://${configData.SERVER_IP}:${configData.SERVER_PORT}/users/like`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newLike),
  }).then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    window.alert(error);
    return;
  });
}


export async function getLikes(me_id, setLikes){
  var query = {me: me_id};
  await fetch(`http://${configData.SERVER_IP}:${configData.SERVER_PORT}/users/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      }).then(response => response.json())
      .then(data => {
      console.log(data);
      if(data){
        setLikes(data);
      } else {
        setLikes([]);
      }
      
      })
      .catch(error => {
        window.alert(error);
        return false;
      });
}


export async function getFollows(me_id, setFollows){
  var query = {me: me_id};
  await fetch(`http://${configData.SERVER_IP}:${configData.SERVER_PORT}/users/follows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      }).then(response => response.json())
      .then(data => {
      console.log(data);
      if(data){
        setFollows(data);
      } else {
        setFollows([]);
      }

      })
      .catch(error => {
        window.alert(error);
        return false;
      });
}