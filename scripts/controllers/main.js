'use strict';

angular.module('serverlessApp')
    .controller('MainController', MainController);

MainController.$inject = ['$scope', '$rootScope'];

function MainController($scope, $rootScope) {

    // create a random peer_id
    var user = new User($rootScope.name);
    var peer = new Peer(user.id);

    // Show this peer's ID.
    peer.on('open', function(id) {
        $scope.user_id = id;
        $scope.user_avatar = user.avatar;
        $scope.user_name = user.name;
        $scope.$apply();
    });

    // Await connections from others
    peer.on('connection', connect);

    peer.on('error', function(err) {
      console.log(err);
    });

    // keep a map of all connected peers
    var connectedPeers = {};

    // chat messages to be stored
    $scope.chat_messages = []
    $scope.myname = "";

    // send message
    $scope.sendMessage = function() {
        if($scope.message){
            $scope.chat_messages.push(new Message($scope.message, user, ""));

            for(var k in peer.connections){
                var c = peer.connections[k][0];
                if (c.label === 'chat') {
                    c.send(new Message($scope.message, user, "").string());
                    $scope.message = "";
                }
            }
        }


    }

    function connect(c) {
        console.log(c);
        if (c.label === 'chat') {
            //c.open = true;
            if(c.metadata) {
                $scope.chat_messages.push(new Message(c.metadata.name + " joined the chat", user, "notification"));
                $scope.$apply();
            }

            c.on('data', function(data) {
                $scope.chat_messages.push(JSON.parse(data));
                $scope.$apply();
            });

            c.on('close', function() {
                delete connectedPeers[c.peer];
            });

            connectedPeers[c.peer] = 1;
        }
    }

    $scope.connecttopeer = function() {
        if (!connectedPeers[$scope.connectto]) {
            var c = peer.connect($scope.connectto, {
                label: 'chat',
                serialization: 'none',
                metadata: user
            });

            c.on('open', function() {
                connect(c);
            });

            c.on('error', function(err) {
                console.log(err);
            });

            connectedPeers[$scope.connectto] = 1;
        }
    }

    $scope.goBackHome = function(){
        localStorage.removeItem("name");
        window.location.reload();
    }
};