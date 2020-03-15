# HTML Music Player SoundCloud API
A simple stylish HTML Player with jQuery that controls the player through the SoundCloud API.
Just change the iframe src to the one you are interested from soundcloud and you are ready to use this player to any website you like. Preferably use this in an ajax based technology so that it doesnt reload and interrupt the player playing.

## Features
- Shows information from each track of Soundcloud (artwork, track name, track duration)
- Controls the track being played from SoundCloud by assigning the html player buttons to the widget from soundcloud.
- Next, Previous, Play, Pause, Volume On/Off, Volume sliders and Track Position.
- Jquery effects that opens and closes the player iframe.
- Scroll to top button with scroll effect.
 
## How it looks like
![Alt text](https://github.com/Alexookah/HTML-Player-SoundCloud-API/blob/master/screenshot.png "ScreenShot of player")

## Implementation

### HTML HEADER
Insert the below code in the Header of your HTML document.
```html
<script type="text/javascript"  src="https://code.jquery.com/jquery-3.2.0.min.js" type="text/javascript"></script>
<!--SOUNDCLOUD API -->
<script type="text/javascript" src="https://w.soundcloud.com/player/api.js"></script>
<!--- Sliders -->
<script type="text/javascript"  src="js/jquery.nouislider.min.js"></script>
<script type="text/javascript"  src="js/jquery.nouislider.min2.js"></script>
<link rel="stylesheet" href="css/nouislider.css" />
<!-- PLAYER JAVASCRIPT -->
<script type="text/javascript" src="js/player.js"></script>
<!--- CSS FILE PLAYER -->
<link rel="stylesheet" try href="css/player.css" type="text/css" media="screen" />
```

### HTML BODY
Insert this html code anywhere in the Body of your HTML document. 
```html
<div id="player-bottom-wrapper">
    <div id="middle">
        <div id="current_playlist">
            <div id="current_playlist_header">
                <div id="current_playlist_close"></div>
                <div class="current_playlist_header_item"></div>
            </div>
            <iframe id="so" width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Fplaylists%2F1711002&amp;show_artwork=true&amp;color=000000&amp;auto_play=false"></iframe>
        </div>
        <div id="bottom">
            <div id="bottom_controls">
                <div id="prev_button" class="controls_button"></div>
                <div id="playpause">
                    <div id="play_button" button class="play_button controls_button" style="display:block" ></div>
                    <div id="pause_button" button class="play_button controls_button" style="display:none" ></div>
                </div>
                <div id="next_button" class="controls_button"></div>
            </div>
            <div id="volume">
                <div id="volume_speaker" class="volume_on"></div>
                <div id="volume_back"></div>
            </div>
            <div id="display">
                <div class="display_song_container">
                    <div id="display_coverart"></div>
                    <div id="display_text">
                        <a id="display_song"></a>
                    </div>
                    <div id="display_time">
                        <div id="display_time_count">0:00</div>
                        <div id="display_progress"><div id="display_progress_loading"></div></div>
                        <div id="display_time_total"></div>
                    </div>
                </div>
            </div>
            <div id="playlist_button"></div>
            <div id="top_button">
                <div id="top_text">TOP</div>
            </div>
        </div>
    </div>
</div>
```

## Live Demo
- [View Demo](https://alexookah.github.io/HTML-Music-Player-SoundCloud-API/index.html)

## Feedback and Contributions
If you experience any errors or if you have ideas for improvement, please feel free to open an issue or send a pull request.
