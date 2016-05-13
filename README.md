# VHaloPlay
VHaloPlay - Help play video on HoloLens

Was trying to watch the [Developing Universal Windows Apps with HTML and JavaScript](https://www.youtube.com/watch?v=ItYWZTkWToA) on the HoloLens and it was a pain skipping using the focus and click. Using cortana to search and play the video was very easy on edge but skipping the ahead was a problem. So i created this app with standard butons for micro(5s), small(30s) and large(10 min) jumps in the video. Unfortunately the Youtube videos cannot be played using the video control so for now i am using the [YouTube Player API Reference for iframe Embeds] (https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player) with just the URL navigation to the manipulate the video starting points for now. Will see if the postMessage works later when i have sometime.

With this it was much easier to skip the known areas, however searching and loading another video became a problem. So i created a companion app [VHaloPlayCompanian](https://github.com/perusworld/VHaloPlayCompanian), that i run on my desktop to send the video id; that i would to play on my HoloLens. For now it just has a simple UI to get the hostname of the HoloLens and the Youtube video id to play. Will change this later to use the search api.

