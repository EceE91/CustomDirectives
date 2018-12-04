// Code goes here

angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
  $scope.user = {
    name: "Ece ERCAN",
    address: { 
      street: 'adatepe cd',
      city: 'Izmir',
      planet: 'Yavin 4'
    },
    friends: [
      'seher',
      'simge',
      'mustafa'
      ]
  }
  
  // knightMe() function'ı directive'in içinde kullanılıyor olmasına rağmen, biz bunu controller'a yazdık
  // bu doğru bir durum değildir. Onun yerine directive'in içine controller vermemiz lazım
  // aksi halde encapsulation bozulur
  //$scope.knightMe = function(user){
    //user.rank = "Knight";
  //}
  
  $scope.header ="Welcome to Custom Directives";
  
});

// directive name userInfoCard is caseSensitive. But HTML is non-casesensitive
// so in HTML file we name the directive as user-info-card or user:info:card or user_info_card. 
// This technique is called snake-casing
angular.module('app').directive('userInfoCard', function() {

  return {
    templateUrl:"userInfoFile.html",
    restrict: "E", // A means attribute like alt attribute of img tag <img alt='' />,
    //E means element like <title>Ece</title>, C means class, M means comment
    scope: true, // inherited scope. bu şekilde esas controller parent scope, 
    // directive'e ait controller ise child scope haline gelir. Bu sayede 
    // directive'in controller'ı üstteki genel controller'daki datayı görebilirken,
    // directive'ın controller'ında olan birşeyi
    // üstteki controller yani parent göremez
    controller: function($scope){ // give directive its own controller
        $scope.knightMe = function(user){
          user.rank = "Knight";
        }
    }
    // replace:true eklersek bu durumda f12 ile DOM'a bakınca  <user-info-card> </user-info-card> diye bir tag görmek
    // yerine sadece div taglarini ng-binding ile görürüz, bunun için ayrıca userInfoFile.html içerisinde,
    // dışa bir adet <div> eklemek gerek
  }

});

// thanks to <div ng-show='!!user.address'> directive, if user does not contain an object called address
// the whole div dissappears