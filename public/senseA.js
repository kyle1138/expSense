
var main = document.getElementById('main');
var userList = document.getElementById('userList');
var userNumbers = [];
var cannedMessages = ["Hello, and welcome to Sense", "Thanks! Let me take that information into consideration",
"Movies are great entertainment, don't you agree?", "Example of a canned message to send"];



var mGet = function(){
  var url = "http://kyle.princesspeach.nyc:1337/messages";
  var xhr = new XMLHttpRequest();

  xhr.open("GET", url);
  xhr.addEventListener('load', function(e) {
    msgObj = JSON.parse(xhr.responseText);
    console.log(msgObj);
    msgObj.forEach(msgDisplay);
    // msgDisplay(msgObj);
  });

  xhr.send();

};


var msgDisplay = function(user){
    var chatDiv = document.createElement('div');
    var msgContainerDiv = document.createElement('div');
    chatDiv.className = 'convo';
    // chatDiv.id = msg['phone'];c
    main.appendChild(chatDiv);
    chatDiv.appendChild(msgContainerDiv);
    var phoneLi = document.createElement('li');
    phoneLi.innerText = user["phone"];
    phoneLi.id = "user" + user["phone"];
    userList.appendChild(phoneLi);


    if (user['messages']){
      user['messages'].forEach(function(msg){
        var msgDiv = document.createElement('div');
        msgContainerDiv.id = '+' + msg['phone'];
        msgDiv.innerText = msg['handle'] +"-"+msg['phone'] + ' : ' +  msg['body'];
        console.log(msg['received']);
        if(msg['received'] == true){
          msgDiv.className = 'user';
        }else{msgDiv.className = 'operator';}
        msgContainerDiv.appendChild(msgDiv);
      })
    }else{
      var msgDiv = document.createElement('div');
      msgContainerDiv.id = '+' + user['phone'];
      msgDiv.innerText = user['handle'] + "-" + user['phone'] + ' : ' +  user['message'];
      console.log(user);
      msgDiv.className = 'user';
      msgContainerDiv.appendChild(msgDiv);

    }
    var chatArea = document.createElement('textarea');
    chatArea.className = 'chatArea';
    var sendButton = document.createElement('button');
    sendButton.innerHTML = 'Send Message';

    sendButton.addEventListener('click', function(){
      console.log('click');
      console.log(chatArea.value.trim() + ' > # ' + user['phone']);
      msgWSSend(chatArea.value.trim() , user['phone']);
      chatArea.value = '';
      chatArea.style.height = 20;
      phoneLi.className = 'userRepliedMessage';
    });

    chatArea.addEventListener('input' , function(){
      chatArea.style.height = Math.ceil((chatArea.value.length+1)/65) * 20;
      console.log('hi');
      console.log(Math.ceil(chatArea.value.length + 1/65) * 20);
    });

    chatDiv.addEventListener('click' , function(){
      if(phoneLi.className === 'userNewMessage'){
      phoneLi.className = 'userSeenMessage';}
    })

    chatArea.type = 'textarea';
    chatDiv.appendChild(chatArea);
    chatDiv.appendChild(sendButton);

};



var sendDisplay = function(user){
  var chatDiv = document.getElementById(msgObj.phone);
  if(chatDiv){
  var mBody = document.createElement('li');
  mBody.className = classString;
  mBody.innerText = msgObj.message;
  chatDiv.appendChild(mBody);
}else{
  msgDisplay(msgObj);
    var mDiv = document.createElement('div');
}


};


var msgDropDown = function(){
  var dropDown = document.createElement('dropdown');
  cannedMessages.forEach(function(msg){

  })

}





mGet();


// ws addition


var chatToo = new WebSocket("ws://kyle.princesspeach.nyc:4000");
// var chatToo = new WebSocket("ws://localhost:4000");




var wsMessage =  function(msgObj , classString){
  var chatDiv = document.getElementById('+' + msgObj.phone);
  if(chatDiv){
  var mBody = document.createElement('div');
  mBody.className = classString;
  mBody.innerText = msgObj.handle + "-" + msgObj.phone + ' : ' +  msgObj.message;
  chatDiv.appendChild(mBody);
  var userToAlert = document.getElementById("user" + msgObj.phone);
  userToAlert.className = "userNewMessage";
}else{
  msgDisplay(msgObj);
    // var mDiv = document.createElement('div');


}
};

var msgWSSend = function(mString,mPhone){

  var msgOut = {body:mString,
  phone:mPhone};
  chatToo.send(JSON.stringify(msgOut));
  var targetDiv = document.getElementById("+" + mPhone);
  var mDiv = document.createElement('div');
  mDiv.className = 'operator';
  console.log(mPhone + ' : ' +  mString);
  mDiv.innerText = mPhone + ' : ' +  mString;
  targetDiv.appendChild(mDiv);
  // wsMessage(msgOut , 'operator');
};




chatToo.addEventListener("message" , function(evt){
  mumble = JSON.parse(evt.data);
  console.log(mumble);
  wsMessage(mumble , 'user');


})


chatToo.addEventListener("open" , function(){
  console.log("connected");

})


chatToo.addEventListener("close" , function(){
  console.log("Disconnected");
  alert("you have been disconnected, try refreshing the browser");
  // talker(info["name"] ,"you have been disconnected");
})




// var mDisplay = function(userArray){
//   userArray.forEach(function(user){
//     var chatDiv = document.createElement('div');
//     chatDiv.className = 'convo';
//     // chatDiv.id = msg['phone'];
//     main.appendChild(chatDiv);
//     user['messages'].forEach(function(msg){
//       var mDiv = document.createElement('div');
//       chatDiv.id = '+' + msg['phone'];
//       mDiv.innerText = msg['phone'] + ' : ' +  msg['body'];
//       console.log(msg['received']);
//       if(msg['received'] == true){
//         mDiv.className = 'user';
//       }else{mDiv.className = 'operator';}
//       chatDiv.appendChild(mDiv);
//     })
//     var chatArea = document.createElement('textarea');
//     chatArea.className = 'chatArea';
//     var sendButton = document.createElement('button');
//     sendButton.innerHTML = 'Send Message';
//
//     sendButton.addEventListener('click', function(){
//       console.log('click');
//       console.log(chatArea.value.trim() + ' > # ' + user['phone']);
//       mSend(chatArea.value.trim() , user['phone']);
//       chatArea.value = '';
//     });
//
//     chatArea.type = 'textarea';
//     chatDiv.appendChild(chatArea);
//     chatDiv.appendChild(sendButton);
//
//   });
//
// };



// var mNewDisplay = function(user){
//     var chatDiv = document.createElement('div');
//     var msgContainerDiv = document.createElement('div');
//     chatDiv.className = 'convo';
//     main.appendChild(chatDiv);
//     chatDiv.appendChild(msgContainerDiv);
//
//
//     var msgDiv = document.createElement('div');
//     msgContainerDiv.id = '+' + user['phone'];
//     msgDiv.innerText = user['phone'] + ' : ' +  user['message'];
//     console.log(user);
//     msgDiv.className = 'user';
//       // if(msg['received'] == true){
//       //   mDiv.className = 'user';
//       // }else{mDiv.className = 'operator';}
//       msgContainerDiv.appendChild(msgDiv);
//
//     var chatArea = document.createElement('textarea');
//     chatArea.className = 'chatArea';
//     var sendButton = document.createElement('button');
//     sendButton.innerHTML = 'Send Message';
//
//     sendButton.addEventListener('click', function(){
//       console.log('click');
//       console.log(chatArea.value.trim() + ' > # ' + user['phone']);
//       msgWSSend(chatArea.value.trim() , user['phone']);
//       chatArea.value = '';
//     });
//
//     chatArea.type = 'textarea';
//     chatDiv.appendChild(chatArea);
//     chatDiv.appendChild(sendButton);
//
//
//
// };
//
//
//
//
//
//
// var msgAjaxSend = function(mString,mPhone){
//   var url = "http://kyle.princesspeach.nyc/operator";
//   var xhr = new XMLHttpRequest();
//
//   xhr.open("POST", url);
//   xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//   xhr.addEventListener('load', function(e) {
//     console.log('sent');
//     console.log(xhr.responseText);
//
//   });
//   var msgOut = {body:mString,
//   phone:mPhone};
//   xhr.send(JSON.stringify(msgOut));
//   var targetDiv = document.getElementById("+" + mPhone);
//   var mDiv = document.createElement('div');
//   mDiv.className = 'operator';
//   console.log(mPhone + ' : ' +  mString);
//   mDiv.innerText = mPhone + ' : ' +  mString;
//   targetDiv.appendChild(mDiv);
//   // wsMessage(msgOut , 'operator');
// };
