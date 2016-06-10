'use strict';

angular
  .module('playerOfTheYear', [])

  .controller('MainController', ['$scope', '$http', 'playersService', function($scope, $http, playersService) {
    $scope.players = playersService.players;

    $scope.send = function(player) {
      var localStorageKey = 'bestPlayerOfTheSeason011';

      if (!store.get(localStorageKey)) {
        swal({
            title: "Лучший игрок сезона: \n" + player.name + ' ' + player.surname,
            text: "Вы уверены?",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Да, отправить!",
            cancelButtonText: "Нет, вернуться к выбору игроков",
            closeOnConfirm: false,
            closeOnCancel: true
          },
          function (isConfirm) {
            if (isConfirm) {
              swal("Отправлено!", "Итоги голосования будут опубликованы на официальном сайте, следите за новостями!", "success");
              store.set(localStorageKey, player.name + ' ' + player.surname);
              $http({
                url: 'http://shakhtar.com/ru/dreamteam/add/',
                method: "POST",
                data: {'bestPlayer' : player.surname}
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

  .factory('playersService', function() {
    var players = [
      {
        name: 'Алекс',
        surname: 'Тейшейра',
        month: 'Лучший в июле, сентябре, октябре, ноябре, декабре',
        count: 5,
        src: 'Teixeira'
      },
      {
        name: '',
        surname: 'Марлос',
        month: 'Лучший в августе, апреле',
        count: 2,
        src: 'Marlos'
      },
      {
        name: 'Виктор',
        surname: 'Коваленко',
        month: 'Лучший в январе',
        count: 1,
        src: 'Kovalenko'
      },
      {
        name: 'Андрей',
        surname: 'Пятов',
        month: 'Лучший в феврале',
        count: 1,
        src: 'Pyatov'
      },
      {
        name: '',
        surname: 'Тайсон',
        month: 'Лучший в марте',
        count: 1,
        src: 'Tayson'
      },
      {
        name: '',
        surname: 'Эдуардо',
        month: 'Лучший в мае',
        count: 1,
        src: 'Eduardo'
      }
    ];

    return {
      players: players
    }
  });