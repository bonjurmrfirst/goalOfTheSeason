'use strict';

angular
  .module('playerOfTheYear', [
    "ngSanitize",
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster"
  ])

  .controller('MainController', ['$scope', '$http', 'playersService', function($scope, $http, playersService) {
    var localStorageKey = 'bestGoalOfTheSeason012';

    $scope.players = playersService.players;

    $scope.currentPlayer = null;

    $scope.showVideoPlayer = false;

    $scope.onPortraitClickHandler = function (player) {
      $scope.showVideoPlayer = true;
      $scope.currentPlayer = player;
      $scope.currentPlayerInfo = $scope.currentPlayer.month + ', ' + $scope.currentPlayer.info + ', ' +  $scope.currentPlayer.minute;
      $scope.$broadcast('currentPlayerChanged');
      $("html, body").animate({scrollTop:$(document).height()}, 'slow');
    };

    $scope.isStored = function() {
      return (store.get(localStorageKey)) ? true : false
    };

    $scope.send = function() {

      if (!store.get(localStorageKey)) {
        swal({
            title: "Лучший гол сезона: \n" + $scope.currentPlayer.name + ' ' + $scope.currentPlayer.surname,
            text:  $scope.currentPlayerInfo,
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Да, отправить!",
            cancelButtonText: "Нет, вернуться к выбору голов",
            closeOnConfirm: false,
            closeOnCancel: true
          },
          function (isConfirm) {
            if (isConfirm) {
              swal("Отправлено!", "Итоги голосования будут опубликованы на официальном сайте, следите за новостями!", "success");
              store.set(localStorageKey, $scope.currentPlayer.name + ' ' + $scope.currentPlayer.surname + ', ' + $scope.currentPlayerInfo);
              $http({
                url: 'http://shakhtar.com/ru/dreamteam/add/',
                method: "POST",
                data: {'bestGoal': $scope.currentPlayer.name + ' ' + $scope.currentPlayer.surname + ', ' + $scope.currentPlayerInfo}
              });
            } else {
              //swal("Отменено!", "", "error");
            }
          });
      } else {
        swal({
          title: "Ваш голос учтен!",
          text: "Вы выбрали: " + store.get(localStorageKey),
          type: "info",
          showCancelButton: false,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Закрыть",
          closeOnConfirm: true
        });
      }
    };

  }])

  .controller('VideoController',
  ["$sce", "$scope", function ($sce, $scope) {
    var ROOT_PATH = "assets/video/";

      $scope.$on('currentPlayerChanged', function() {

          $scope.config = {
            sources: [
              {src: $sce.trustAsResourceUrl(ROOT_PATH + $scope.currentPlayer.src + ".mp4"), type: "video/mp4"}/*,
               {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
               {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}*/
            ],
            tracks: [
              {
                src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                kind: "subtitles",
                srclang: "en",
                label: "English",
                default: ""
              }
            ],
            theme: "assets/css/videogular.css"/*,
             plugins: {
             poster: "http://www.videogular.com/assets/images/videogular.png"
             }*/
          };
      });



  }]
)

.factory('playersService', function() {
  var players = [
    {
      name: '',
      surname: 'Бернард',
      info: '«Динамо» – «Шахтер» – 0:2',
      month: 'Июль',
      minute: '90\' минута',
      src: 'BernardJuly'
    },
    {
      name: 'Александр',
      surname: 'Гладкий',
      info: '«Шахтер» – «Рапид» – 2:2',
      month: 'Август',
      minute: '27\' минута',
      src: 'GladkyyAug'
    },
    {
      name: 'Ярослав',
      surname: 'Ракицкий',
      info: '«Металлист» – «Шахтер» – 0:5',
      month: 'Сентябрь',
      minute: '35\' минута',
      src: 'RakitskyySept'
    },
    {
      name: 'Тарас',
      surname: 'Степаненко',
      info: '«Заря» – «Шахтер» – 1:7',
      month: 'Октябрь',
      minute: '90\' минута',
      src: 'StepanenkoOct'
    },
    {
      name: 'Ярослав',
      surname: 'Ракицкий',
      info: '«Говерла» – «Шахтер» – 1:6',
      month: 'Ноябрь',
      minute: '9\' минута',
      src: 'RakitskyyNov'
    },
    {
      name: '',
      surname: 'Эдуардо',
      info: '«Шахтер» – «Карпаты» – 3:0',
      month: 'Декабрь',
      minute: '56\' минута',
      src: 'EduardoDec'
    },
    {
      name: '',
      surname: 'Тайсон',
      info: '«Коринтианс» – «Шахтер» – 3:2',
      month: 'Январь',
      minute: '23\' минута',
      src: 'TaysonJan'
    },
    {
      name: '',
      surname: 'Марлос',
      info: '«Шальке» – «Шахтер» – 0:3',
      month: 'Февраль',
      minute: '27\' минута',
      src: 'MarlosFeb'
    },
    {
      name: 'Дарио',
      surname: 'Срна',
      info: '«Шахтер» – «Ворскла» – 3:1',
      month: 'Март',
      minute: '9\' минута',
      src: 'SrnaMarch'
    },
    {
      name: 'Тарас',
      surname: 'Степаненко',
      info: '«Шахтер» – «Севилья» – 2:2',
      month: 'Апрель',
      minute: '35\' минута',
      src: 'StepanenkoApril'
    },
    {
      name: '',
      surname: 'Эдуардо',
      info: '«Севилья» - «Шахтер» - 3:1',
      month: 'Май',
      minute: '44\' минута',
      src: 'EduardoMay'
    }
  ];

  return {
    players: players
  }
});