(function () {
    "use strict";
    var playSocket = {};
    playSocket.listener = null; 
    playSocket.serverSocket = null;
    playSocket.serverReader = null;
    playSocket.serviceNameAccept = "22122";
    WinJS.UI.Pages.define("index.html", {
        ready: function (element, options) {
            element.querySelector("#cmdPlay").addEventListener("click", doPlay, false);
            element.querySelector("#cmdBackwardMicro").addEventListener("click", doBackMicro, false);
            element.querySelector("#cmdBackwardSmall").addEventListener("click", doBackSmall, false);
            element.querySelector("#cmdBackwardLarge").addEventListener("click", doBackLarge, false);
            element.querySelector("#cmdForwardMicro").addEventListener("click", doForwardMicro, false);
            element.querySelector("#cmdForwardSmall").addEventListener("click", doForwardSmall, false);
            element.querySelector("#cmdForwardLarge").addEventListener("click", doForwardLarge, false);
            var player = document.getElementById('videoPlayer');
            player.width = window.innerWidth;
            player.height = window.innerHeight - appBar.clientHeight;
            startListener();
        }
    });

    function startListener() {
        if (playSocket.listener) {
            return;
        }
        var serviceName = playSocket.serviceNameAccept;
        playSocket.listener = new Windows.Networking.Sockets.StreamSocketListener();
        playSocket.listener.addEventListener("connectionreceived", onServerAccept);
        playSocket.listener.bindServiceNameAsync(serviceName).done(function () {
            //listening
        }, onError);
    }

    function onServerAccept(eventArgument) {
        playSocket.serverSocket = eventArgument.socket;
        playSocket.serverReader = new Windows.Storage.Streams.DataReader(playSocket.serverSocket.inputStream);
        startServerRead();
    }

    function startServerRead() {
        playSocket.serverReader.loadAsync(4).done(function (sizeBytesRead) {
            if (sizeBytesRead !== 4) {
                return;
            }

            var count = playSocket.serverReader.readInt32();
            return playSocket.serverReader.loadAsync(count).then(function (stringBytesRead) {
                if (stringBytesRead !== count) {
                    return;
                }
                var string = playSocket.serverReader.readString(count);
                handleCommand(string);
                startServerRead();
            });
        }, onError);
    }

    function onError(reason) {
        //handle error
    }

    function handleCommand(msg) {
        var cmds = msg.split(",");
        if (0 < cmds.length) {
            switch (cmds[0]) {
                case "playVideo":
                    document.getElementById('videoId').value = cmds[1];
                    doPlay();
                    break;
            }
        }
    }

    function doPlayAt() {
        if (0 > VHaloPlay.Video.approxCurrentLocation) {
            VHaloPlay.Video.approxCurrentLocation = 0;
        }
        var appBar = document.getElementById('appBar');
        var player = document.getElementById('videoPlayer');
        player.width = window.innerWidth;
        player.height = window.innerHeight - appBar.clientHeight;
        player.src = "http://www.youtube.com/embed/" + VHaloPlay.Video.videoId + "?autoplay=1&start=" + VHaloPlay.Video.approxCurrentLocation;
    }

    function doPlay() {
        VHaloPlay.Video.videoId = document.getElementById('videoId').value;
        VHaloPlay.Video.approxCurrentLocation = 0;
        doPlayAt();
    }

    function doBackMicro() {
        VHaloPlay.Video.approxCurrentLocation -= VHaloPlay.Video.microStep;
        doPlayAt();
    }

    function doBackSmall() {
        VHaloPlay.Video.approxCurrentLocation -= VHaloPlay.Video.smallStep;
        doPlayAt();
    }

    function doBackLarge() {
        VHaloPlay.Video.approxCurrentLocation -= VHaloPlay.Video.largeStep
        doPlayAt();
    }

    function doForwardMicro() {
        VHaloPlay.Video.approxCurrentLocation += VHaloPlay.Video.microStep;
        doPlayAt();
    }

    function doForwardSmall() {
        VHaloPlay.Video.approxCurrentLocation += VHaloPlay.Video.smallStep;
        doPlayAt();
    }

    function doForwardLarge() {
        VHaloPlay.Video.approxCurrentLocation += VHaloPlay.Video.largeStep;
        doPlayAt();
    }


})();
