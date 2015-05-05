var nums = [44,32,62,32,34,58,38,12,29,84];

var proNums =   [1, 7, 3, 4];


var find = function(arr){

var highest;
var lowest;
  arr.forEach(function(num){
    if(!lowest){
       lowest = num;
    }else{
      if(lowest > num){lowest = num};
    }

    if(!highest){
      highest = num;
    }else{
      if(highest < num){highest = num};
    }

    console.log(num);


  })
 console.log(highest - lowest);

}


find(nums);









// var producter = function(arr){
//   var ans = [];
//   for(var i = 0; i < arr.length; i ++){
//     var pro = 'x';
//
//     for(var index = 2; index < arr.length; index ++){
//
//       if(pro === 'x'){
//         if(i === 0){
//           pro = arr[1] * arr[2];
//         }else if(i === 1){
//           pro = arr[0] * arr[2];
//         }else{ pro = arr[0] * arr[1];}
//       }
//
//     else{
//       if(index != i){
//         pro = pro * arr[index];
//     }
// }
//
//
//
//     }
//
//     ans.push(pro);
//
//   }
//
// return ans;
// }




var producter2 = function(arr){
  var ans = [];

  arr.forEach(function(n){

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

  });
  return ans;
};






// console.log(producter(proNums));
console.log(producter2(proNums));
