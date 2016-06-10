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
        name: '',
        surname: 'Бернард',
        info: '«Динамо» – «Шахтер» – 0:2',
        month: 'Июль',
        src: 'Bernard'
      },
      {
        name: 'Александр',
        surname: 'Гладкий',
        info: '«Шахтер» – «Рапид» – 2:2',
        month: 'Август',
        src: 'Gladkyy'
      },
      {
        name: 'Ярослав',
        surname: 'Ракицкий',
        info: '«Металлист» – «Шахтер» – 0:5',
        month: 'Сентябрь',
        src: 'Rakitskyy'
      },
      {
        name: 'Тарас',
        surname: 'Степаненко',
        info: '«Заря» – «Шахтер» – 1:7',
        month: 'Октябрь',
        src: 'Stepanenko'
      },
      {
        name: 'Ярослав',
        surname: 'Ракицкий',
        info: '«Говерла» – «Шахтер» – 1:6',
        month: 'Ноябрь',
        src: 'Rakitskyy2'
      },
      {
        name: '',
        surname: 'Эдуардо',
        info: '«Шахтер» – «Карпаты» – 3:0',
        month: 'Декабрь',
        src: 'Eduardo'
      },
      {
        name: '',
        surname: 'Тайсон',
        info: '«Коринтианс» – «Шахтер» – 3:2',
        month: 'Январь',
        src: 'Tayson'
      },
      {
        name: '',
        surname: 'Марлос',
        info: '«Шальке» – «Шахтер» – 0:3',
        month: 'Февраль',
        src: 'Marlos'
      },
      {
        name: 'Дарио',
        surname: 'Срна',
        info: '«Шахтер» – «Ворскла» – 3:1',
        month: 'Март',
        src: 'Srna'
      },
      {
        name: 'Тарас',
        surname: 'Степаненко',
        info: '«Шахтер» – «Севилья» – 2:2',
        month: 'Апрель',
        src: 'Stepanenko2'
      },
      {
        name: '',
        surname: 'Эдуардо',
        info: '«Севилья» - «Шахтер» - 3:1',
        month: 'Май',
        src: 'Eduardo2'
      }
    ];

    return {
      players: players
    }
  });