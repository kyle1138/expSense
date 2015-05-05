
var main = document.getElementById('main');


var mGet = function(){
  var url = "http://kyle.princesspeach.nyc/messages";
  var xhr = new XMLHttpRequest();

  xhr.open("GET", url);
  xhr.addEventListener('load', function(e) {
    msgObj = JSON.parse(xhr.responseText);
    console.log(msgObj);
    mDisplay(msgObj);
  });

  xhr.send();

};


// var convoBuilder = function(){
//   var
//
// }


var mDisplay = function(userArray){
  userArray.forEach(function(user){
    var cDiv = document.createElement('div');
    cDiv.className = 'convo';
    main.appendChild(cDiv);
    user['messages'].forEach(function(msg){
      var mDiv = document.createElement('div');
      mDiv.innerText = msg['phone'] + ' : ' +  msg['body'];
      console.log(msg['received']);
      if(msg['received'] == true){
        mDiv.className = 'user';
      }else{mDiv.className = 'operator';}
      cDiv.appendChild(mDiv);
    })
    var chatArea = document.createElement('textarea');
    chatArea.className = 'chatArea';
    var sendButton = document.createElement('button');
    sendButton.innerHTML = 'Send Message';

    sendButton.addEventListener('click', function(){
      console.log('click');
      console.log(chatArea.value.trim() + ' > # ' + user['phone']);
      mSend(chatArea.value.trim() , user['phone']);
      chatArea.value = '';
    });

    chatArea.type = 'textarea';
    cDiv.appendChild(chatArea);
    cDiv.appendChild(sendButton);

  });

};





var mSend = function(mString,mPhone){
  var url = "http://kyle.princesspeach.nyc/operator";
  var xhr = new XMLHttpRequest();

  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.addEventListener('load', function(e) {
    console.log('sent');
    console.log(xhr.responseText);
  });
  var msgOut = {body:mString,
  phone:mPhone}
  xhr.send(JSON.stringify(msgOut));
};


intTest = function (){console.log('Test String')}
intTest2 = function(){setInterval(intTest , 10)}

var testH = document.getElementById('test');
testH.addEventListener('click' , function(){

  return intTest2();
})


mGet();


// ws addition


var chatToo = new WebSocket("ws://kyle.princesspeach.nyc:4000");
// var chatToo = new WebSocket("ws://localhost:4000");
var info = {namList:[]};

// var talker = function(name , message){
//
//
//
//   li.innerText = name + " : " + message;
//   var top = msgBox.firstChild;
//   msgBox.insertBefore(li , top);
// }

var userListGen = function(arr){
  usersList.innerHTML = "";
  arr.forEach(function(nam){
  var userNam = document.createElement("li");
  userNam.innerText = nam;
  usersList.appendChild(userNam);
  })


}

chatToo.addEventListener("message" , function(evt){
  mumble = JSON.parse(evt.data);
  console.log(mumble);

  userListGen(mumble.namList);

})







chatToo.addEventListener("open" , function(){
  console.log("connected");
  info["name"] = prompt("What is your username?");
  if(info["name"] === ""){while(info["name"] === "")
  {info["name"] = prompt("You must enter a username to chat.");}
  handle.value = info["name"];
  info.namList.push(info["name"]);
  handle.value = info["name"];
  info["message"] = handle.value + " has joined the chatroom."
  var join = JSON.stringify(info);
  chatToo.send(join);}
  else{
  info.namList.push(info["name"]);
  handle.value = info["name"];
  info["message"] = handle.value + " has joined the chatroom."
  var join = JSON.stringify(info);
  chatToo.send(join);}
})

chatToo.addEventListener("close" , function(){
  console.log("Disconnected");
  // talker(info["name"] ,"you have been disconnected");
})
