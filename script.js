// Code goes here

angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
  $scope.user1 = {
    name: "Ece ERCAN",
    address: {
      street: 'adatepe st',
      city: 'Izmir',
      planet: 'Yavin 4'
    },
    friends: [
      'seher',
      'simge',
      'mustafa'
    ]
  }
  $scope.user2 = {
    name: "Kamile ERCAN",
    address: {
      street: 'adatepe st',
      city: 'Izmir',
      planet: 'Yavin 4'
    },
    friends: [
      'bahar',
      'zerrin',
      'gül'
    ]
  }

  // knightMe() function'ı directive'in içinde kullanılıyor olmasına rağmen, biz bunu controller'a yazdık
  // bu doğru bir durum değildir. Onun yerine directive'in içine controller vermemiz lazım
  // aksi halde encapsulation bozulur
  //$scope.knightMe = function(user){
  //user.rank = "Knight";
  //}

  $scope.header = "Welcome to Custom Directives";

});

// directive name userInfoCard is caseSensitive. But HTML is non-casesensitive
// so in HTML file we name the directive as user-info-card or user:info:card or user_info_card. 
// This technique is called snake-casing
angular.module('app').directive('userInfoCard', function() {

  return {
    templateUrl: "userInfoFile.html",
    restrict: "E", // A means attribute like alt attribute of img tag <img alt='' />,
    //E means element like <title>Ece</title>, C means class, M means comment
    //scope: true, // inherited scope. bu şekilde esas controller parent scope, 
    // directive'e ait controller ise child scope haline gelir. Bu sayede 
    // directive'in controller'ı üstteki genel controller'daki datayı görebilirken,
    // directive'ın controller'ında olan birşeyi
    // üstteki controller yani parent göremez
    scope: {
      user: '=', // when passing data, use '='
      collapsed: '@', // when passing a simple value use '@', fakat bu durumda sadece string geçirebiliriz
      // html içerisinde collapsed'e true değerini vermiş olsakta bu bool değil stringtir

      myTest: '@test'
        // eğerhtmlde test isimli değeri, farklı bir isimle 
        // kullanmak istiyorsak '@test' şeklinde yazıp başka bir variable'a assign ederiz

    }, // isolated scope, bu şekilde yapınca parenttaki userobjeti buradan göremeyiz
    //
    controller: function($scope) { // give directive its own controller
        // $scope.collapsed = false; // yukarıdaki collapsed ile karışmasın diye kapatıldı.
        $scope.collapsedState = ($scope.collapsed === 'true'); // collapsed aslında string olduğu için bool bir değişken yarattık
        $scope.knightMe = function(user) {
          user.rank = "Knight";
        }

        $scope.collapse = function() {
          $scope.collapsedState = !$scope.collapsedState;
        }


        $scope.removeFriend = function(friend) {
          var idx = $scope.user.friends.indexOf(friend);
          if (idx > -1) {
            $scope.user.friends.splice(idx, 1);
          }
        }


      }
      // replace:true eklersek bu durumda f12 ile DOM'a bakınca  <user-info-card> </user-info-card> diye bir tag görmek
      // yerine sadece div taglarini ng-binding ile görürüz, bunun için ayrıca userInfoFile.html içerisinde,
      // dışa bir adet <div> eklemek gerek
  }
});


angular.module('app').directive('removeFriend', function() {
  return {
    templateUrl: 'removeFriend.html',
    restrict: 'E',
    scope: {
      notifyParent: '&method' // eğer scope'a bir value ya da object değilde method geçirilecekse & kullan
    },
    controller: function($scope) {
      $scope.removing = false;
      $scope.startRemove = function() {
        $scope.removing = true;
      },
      $scope.cancelRemove = function() {
        $scope.removing = false;
      },
      $scope.confirmRemove = function() {
        $scope.notifyParent();
      }
    }

  };
});

angular.module('app').directive('address', function() {
  return {
    templateUrl: 'address.html',
    restrict: 'E',
    scope: true, // inherited scope yaptık
    controller: function($scope) {
      $scope.collapsed = false;
      // address directive'inin collapsed variable'ı ile userInfoCard'ınki karışıyor
      // bu sorunu address directivinin scope'unu inherited yaparak düzeltiriz 
      $scope.collapseAddress = function() {
        $scope.collapsed = true;
      }
      $scope.expandAddress = function() {
        $scope.collapsed = false;
      }
    }
  }
});