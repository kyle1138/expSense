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







var arrayProducts = function(arr){
  var beforeSum = 1;
  var output = [1];
  for(var i = 1; i<arr.length;i++){
    output[0] = output[0] * arr[i]
  }

  for(var i2 = 0; i2 < arr.length;i++){
    beforeSum *= arr[i2];
  }



}
