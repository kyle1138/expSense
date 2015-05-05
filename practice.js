var proNums =   [1, 7, 3, 4];

var producter2 = function(arr){

  var ans = [];

  arr.forEach(function(n){
  //
    var index = arr.indexOf(n);
    if(index === 0){
      var pro = arr[1] * arr[2];
    }else if(index === 1){
      var pro = arr[0] * arr[2];
    }else{
      var pro = arr[0] * arr[1];
      }



    for(var i = 2; i < arr.length; i ++){
      if(i != index){
        pro = pro * arr[i];
      }

    };

    ans.push(pro);

})
}




var newPro = function(arr){
  var ans = [];
  for(var i = 0; i < arr.length; i++){
    var newArr = 




  }






}
