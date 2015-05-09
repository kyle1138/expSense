
var main = document.getElementById('main');


var mGet = function(){
  var url = "http://kyle.princesspeach.nyc/messages";
  var xhr = new XMLHttpRequest();

  xhr.open("GET", url);
  xhr.addEventListener('load', function(e) {
    msgObj = JSON.parse(xhr.responseText);
    console.log(msgObj);
    msgObj.forEach(mDisplay);
    // mDisplay(msgObj);
  });

  xhr.send();

};


// var convoBuilder = function(){
//   var
//
// }


var mDisplay = function(user){
    var cDiv = document.createElement('div');
    var msgSubDiv = document.createElement('div');
    cDiv.className = 'convo';
    // cDiv.id = msg['phone'];
    main.appendChild(cDiv);
    cDiv.appendChild(msgSubDiv);
    user['messages'].forEach(function(msg){
      var mDiv = document.createElement('div');
      msgSubDiv.id = '+' + msg['phone'];
      mDiv.innerText = msg['phone'] + ' : ' +  msg['body'];
      console.log(msg['received']);
      if(msg['received'] == true){
        mDiv.className = 'user';
      }else{mDiv.className = 'operator';}
      msgSubDiv.appendChild(mDiv);
    })
    var chatArea = document.createElement('textarea');
    chatArea.className = 'chatArea';
    var sendButton = document.createElement('button');
    sendButton.innerHTML = 'Send Message';

    sendButton.addEventListener('click', function(){
      console.log('click');
      console.log(chatArea.value.trim() + ' > # ' + user['phone']);
      msgWSSend(chatArea.value.trim() , user['phone']);
      chatArea.value = '';
    });

    chatArea.type = 'textarea';
    cDiv.appendChild(chatArea);
    cDiv.appendChild(sendButton);



};

var mNewDisplay = function(user){
    var cDiv = document.createElement('div');
    var msgSubDiv = document.createElement('div');
    cDiv.className = 'convo';
    main.appendChild(cDiv);
    cDiv.appendChild(msgSubDiv);
    var msgDiv = document.createElement('div');
    msgSubDiv.id = '+' + user['phone'];
    msgDiv.innerText = user['phone'] + ' : ' +  user['message'];
    console.log(user);
    msgDiv.className = 'user';
      // if(msg['received'] == true){
      //   mDiv.className = 'user';
      // }else{mDiv.className = 'operator';}
      msgSubDiv.appendChild(msgDiv);

    var chatArea = document.createElement('textarea');
    chatArea.className = 'chatArea';
    var sendButton = document.createElement('button');
    sendButton.innerHTML = 'Send Message';

    sendButton.addEventListener('click', function(){
      console.log('click');
      console.log(chatArea.value.trim() + ' > # ' + user['phone']);
      msgWSSend(chatArea.value.trim() , user['phone']);
      chatArea.value = '';
    });

    chatArea.type = 'textarea';
    cDiv.appendChild(chatArea);
    cDiv.appendChild(sendButton);



};





var sendDisplay = function(user){
  var cDiv = document.getElementById(msgObj.phone);
  if(cDiv){
  var mBody = document.createElement('li');
  mBody.className = classString;
  mBody.innerText = msgObj.message;
  cDiv.appendChild(mBody);
}else{
  mDisplay(msgObj);
    var mDiv = document.createElement('div');


}


};






// var mDisplay = function(userArray){
//   userArray.forEach(function(user){
//     var cDiv = document.createElement('div');
//     cDiv.className = 'convo';
//     // cDiv.id = msg['phone'];
//     main.appendChild(cDiv);
//     user['messages'].forEach(function(msg){
//       var mDiv = document.createElement('div');
//       cDiv.id = '+' + msg['phone'];
//       mDiv.innerText = msg['phone'] + ' : ' +  msg['body'];
//       console.log(msg['received']);
//       if(msg['received'] == true){
//         mDiv.className = 'user';
//       }else{mDiv.className = 'operator';}
//       cDiv.appendChild(mDiv);
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
//     cDiv.appendChild(chatArea);
//     cDiv.appendChild(sendButton);
//
//   });
//
// };




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
  phone:mPhone};
  xhr.send(JSON.stringify(msgOut));
  var targetDiv = document.getElementById("+" + mPhone);
  var mDiv = document.createElement('div');
  mDiv.className = 'operator';
  console.log(mPhone + ' : ' +  mString);
  mDiv.innerText = mPhone + ' : ' +  mString;
  targetDiv.appendChild(mDiv);
  // wsMessage(msgOut , 'operator');
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




var wsMessage =  function(msgObj , classString){
  var cDiv = document.getElementById(msgObj.phone);
  if(cDiv){
  var mBody = document.createElement('div');
  mBody.className = classString;
  mBody.innerText = msgObj.phone + ' : ' +  msgObj.message;
  cDiv.appendChild(mBody);
}else{
  mNewDisplay(msgObj);
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
  // talker(info["name"] ,"you have been disconnected");
})
