var $jq = jQuery.noConflict();
$jq(document).ready(function() {
    var widget = SC.Widget(document.getElementById('so'));
    var allSongs;
    widget.bind(SC.Widget.Events.READY, function() {
        //widget.play();
        console.log('Ready...');
        widget.getSounds(function(allSounds) {
            $jq('#display_song').text(allSounds[0]['title']);

            allSongs = allSounds
            var imageUrl = "";
            if (allSounds[0]['artwork_url'] == null) {
                imageUrl = allSongs[0]['user']['avatar_url'];
            } else {
                imageUrl = allSongs[0]['artwork_url'];
            }

            $jq('#display_coverart').css("background-image", 'url('+imageUrl+')'); 
            $jq('.current_playlist_header_item').text(allSounds[0]['user']['username'] + " PLAYLIST");
            var duration = allSounds[0]['duration'];
            var seconds = Math.floor((duration / 1000) % 60);
            var minutes = Math.floor((duration / (60 * 1000)) % 60);

            if (seconds < 10) {
                $jq('#display_time_total').text(minutes + ':0' + seconds);
            } else {
                $jq('#display_time_total').text(minutes + ':' + seconds);
            };
        });

        /*widget.getPosition(function(position) {
            console.log('position is: ' + position);
        });*/

        widget.isPaused(function(paused){
            if (paused == false){
                document.getElementById('pause_button').style.display = 'block';
                document.getElementById('play_button').style.display = 'none';
            }
            else{
                document.getElementById('pause_button').style.display = 'none';
                document.getElementById('play_button').style.display = 'block';
            }
        });

        $jq(function(){
            var nav = $jq('#current_playlist');
            nav.addClass('showing');});
        $jq('#current_playlist').delay(500).fadeTo(1000, 1).delay(500).queue(function(){
            var nav = $jq('#current_playlist');
            nav.removeClass('showing').addClass('hiding');
        });
    });
    
    //EVENT PLAY
    widget.bind(SC.Widget.Events.PLAY, function() {
        console.log('Play');
        widget.isPaused(function(paused){
            if (paused == false){
                document.getElementById('pause_button').style.display = 'block';
                document.getElementById('play_button').style.display = 'none';
            }
            else{
                document.getElementById('pause_button').style.display = 'none';
                document.getElementById('play_button').style.display = 'block';
            }
        });

        //SLIDER FOR PROGRESS BAR
        $jq(function() {
            var init = function() {
                var widget = SC.Widget(document.getElementById('so'));
                widget.getDuration(function(duration) {
                    console.log('duration: ' + duration);
                    //Create a slider 
                    //var duration = Math.round(duration / 1000);
                    $jq('#display_progress').noUiSlider2('init', {
                        start: [0],
                        scale: [0, duration],
                        handles: 1,
                        connect: "lower",
                        change: function() {
                            var values = $jq('#display_progress').noUiSlider2('value');
                            widget.getPosition(function(position) {
                                widget.seekTo(values[1]);
                            });
                        },
                    });
                });
            };
            init.call();
        });
        //Remove previous Progress Bar
        $jq(".noUi-midBar2").remove();
        $jq(".noUi-handle2").remove();

        var values = $jq('#volume_back').noUiSlider('value');
        widget.setVolume(values[1]);	
        widget.getCurrentSound(function(currentSound) {
            //console.log(currentSound);
            $jq('#display_song').text(currentSound['title']);
            var imageUrl = "";
            if (currentSound['artwork_url'] == null) {
                imageUrl = currentSound['user']['avatar_url'];
            } else {
                imageUrl = currentSound['artwork_url'];
            }
            $jq('#display_coverart').css("background-image", 'url('+imageUrl+')'); 
        });

        //display_time_total
        widget.getDuration(function(duration) {
            var seconds = Math.floor((duration / 1000) % 60);
            var minutes = Math.floor((duration / (60 * 1000)) % 60);
            if (seconds < 10) {
                $jq('#display_time_total').text(minutes + ':0' + seconds);
            } else {
                $jq('#display_time_total').text(minutes + ':' + seconds);
            };
        });

    });
    widget.bind(SC.Widget.Events.PAUSE, function() {
        console.log('Pause');
        widget.isPaused(function(paused){
            if (paused == false){
                document.getElementById('pause_button').style.display = 'block';
                document.getElementById('play_button').style.display = 'none';
            }
            else{
                document.getElementById('pause_button').style.display = 'none';
                document.getElementById('play_button').style.display = 'block';
            }
        });

    })
    
    widget.bind(SC.Widget.Events.LOAD_PROGRESS, function() {
        //console.log('Loading...');
    });

    $jq('#play_button').click(function() {
        widget.play();
    });
    
    $jq('#pause_button').click(function() {
        widget.pause();
        document.getElementById('display_progress').style.background = 'none';
    });
    
    $jq('#prev_button').click(function() {
        widget.getDuration(function(duration) {
            widget.getPosition(function(position) {
                widget.getCurrentSoundIndex(function(soundindex){
                    //display_time_count
                    var seconds = Math.floor((position / 1000) % 60);
                    var minutes = Math.floor((position / (60 * 1000)) % 60);
                    if ((seconds < 5) && (minutes==0))
                    {
                        if(soundindex == 0)
                        {
                            widget.skip(allSongs.length-1); //Go to last Song of playlist
                        }
                        else
                        {
                            widget.prev();
                        }
                    }
                    else
                    {
                        //Go to the beginning of the song if the song has past the first 5 seconds
                        widget.seekTo(0); 
                    }
                });
            });
        });

    });
    $jq('#next_button').click(function() {
        widget.getCurrentSoundIndex(function(soundindex){
            if (soundindex == allSongs.length-1){
                console.log("playlist  go to start")
                widget.skip(0);
            } else {
                widget.next();
            }
        });
    });

    //SKIP To 0 Only if its the last song
    widget.bind(SC.Widget.Events.FINISH, function() {
            widget.getCurrentSoundIndex(function(soundindex){
                widget.isPaused(function(paused){
                    if ((soundindex == allSongs.length-1) && (paused == true)) {
                        console.log("playlist  go to start")
                        widget.skip(0);
                    };
                });
            });
    });

    //WHILE PLAYING
    widget.bind(SC.Widget.Events.PLAY_PROGRESS, function(data) {
        widget.getDuration(function(duration) {
            widget.getPosition(function(position) {
                //display_time_count
                var seconds = Math.floor((position / 1000) % 60);
                var minutes = Math.floor((position / (60 * 1000)) % 60);
                if (seconds < 10) {
                    $jq('#display_time_count').text(minutes + ':0' + seconds);
                } else {
                    $jq('#display_time_count').text(minutes + ':' + seconds);
                };

                if ((seconds<=1)&&(minutes===0)) {				
                    var values = $jq('#volume_back').noUiSlider('value');
                    widget.setVolume(values[1]);
                    widget.getCurrentSound(function(currentSound) {
                        //console.log(currentSound);
                        $jq('#display_song').text(currentSound['title']);
                        var imageUrl = "";
                        if (currentSound['artwork_url'] == null) {
                            imageUrl = currentSound['user']['avatar_url'];
                        } else {
                            imageUrl = currentSound['artwork_url'];
                        }
                        $jq('#display_coverart').css("background-image", 'url('+imageUrl+')'); 
                    });
                    
                    //display_time_total
                    widget.getDuration(function(duration) {
                        var seconds = Math.floor((duration / 1000) % 60);
                        var minutes = Math.floor((duration / (60 * 1000)) % 60);
                        if (seconds < 10) {
                            $jq('#display_time_total').text(minutes + ':0' + seconds);
                        } else {
                            $jq('#display_time_total').text(minutes + ':' + seconds);
                        };
                    });
                }
                
                if (position==0) {
                    document.getElementById('display_progress').style.background = 'url("images/progress.gif") repeat-x scroll 0 0 #333333';
                } else if (position>0) {
                    document.getElementById('display_progress').style.background = 'none';
                }

                $jq("#display_progress").noUiSlider2('move', {
                    // moving the knob selected in the dropdown...
                    scale: [0, duration],
                    // to the position in the input field.
                    to: position
                })
            });
        });
    });
});

$jq(document).ready(function() {
    //first hide #scroll to top
    // hide #back-top first
    $jq("#top_button").hide();
    $jq(window).scroll(function() {
        if ($jq(this).scrollTop() > 250) {
            $jq('#top_button').fadeIn();
        } else {
            $jq('#top_button').fadeOut();
        }
    });
    
    //#SCROLL TO TOP
    $jq('#top_button').click(function() {
        if ($jq(document).scrollTop() < 400) {
            $jq("html, body").animate({
                scrollTop: 0
            }, 300);
            return false;
        } else if ($jq(document).scrollTop() < 1000) {
            $jq("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        } else {
            $jq("html, body").animate({
                scrollTop: 0
            }, 1000);
            return false;
        }
    });
    
    $jq('#playlist_button, #display_coverart').bind("click", function() {
        var nav = $jq('#current_playlist');
        if (nav.hasClass('showing')) {
            nav.removeClass('showing').addClass('hiding');
        } else {
            nav.removeClass('hiding').addClass('showing');
        }
    });
    
    $jq('#current_playlist_header').bind("click", function() {
        var nav = $jq('#current_playlist');
        if (nav.hasClass('showing')) {
            nav.removeClass('showing').addClass('hiding');
        } else {
            nav.removeClass('hiding').addClass('showing');
        }
    });

    //SLIDER FOR VOLUME_BACK
    $jq(function() {
        var oldVolume=100;
        var init = function() { /* Create a slider */
            $jq('#volume_back').noUiSlider('init', {
                start: [100],
                scale: [0, 100],
                handles: 1,
                connect: "lower",
                change: function() {
                    var values = $jq(this).noUiSlider('value');
                    var widget = SC.Widget(document.getElementById('so'));
                    widget.getVolume(function(volume) {
                        widget.setVolume(values[1]/100);
                        //console.log('current volume value is ' + volume);
                        oldVolume = values[1];
                        //console.log('OLD VOLUME:' + oldVolume);
                        if (values[1] > 50) $jq("#volume_speaker").attr("class", "volume_on");
                        else if ((values[1] <= 50) && (values[1] >= 1)) $jq("#volume_speaker").attr("class", "volume_middle");
                        else $jq("#volume_speaker").attr("class", "volume_off");
                    });
                },
            });
        };
        init.call();
        
        //ON/OFF SPEAKER BUTTON
        $jq('#volume_speaker').bind("click", function() {
            var widget = SC.Widget(document.getElementById('so'));
            widget.getVolume(function(volume) {
                var values = $jq('#volume_back').noUiSlider('value');
                if (values[1] > 0) {
                    $jq('#volume_back').noUiSlider('move', {
                        // moving the knob selected in the dropdown...
                        scale: [0, 100],
                        // to the position in the input field.
                        to: 0
                    })
                    //VOLUME OFF IN SOUNDCLOUD    
                    widget.setVolume(0);
                    $jq('#volume_speaker').attr("class", "volume_off");
                } else {
                    if ((oldVolume>0) && (oldVolume<=50)) {
                        widget.setVolume(oldVolume/100);			
                        $jq("#volume_speaker").attr("class", "volume_middle");
                        $jq("#volume_back").noUiSlider('move', {
                            // moving the knob selected in the dropdown...
                            scale: [0, 100],
                            // to the position in the input field.
                            to: oldVolume
                        });
                    } else if (oldVolume>50) {
                        widget.setVolume(oldVolume/100);			
                        $jq("#volume_speaker").attr("class", "volume_on");
                        $jq("#volume_back").noUiSlider('move', {
                            // moving the knob selected in the dropdown...
                            scale: [0, 100],
                            // to the position in the input field.
                            to: oldVolume
                        });
                    } else if (oldVolume==0) {
                        $jq("#volume_back").noUiSlider('move', {
                            // moving the knob selected in the dropdown...
                            scale: [0, 100],
                            // to the position in the input field.
                            to: 100
                        });
                        $jq("#volume_speaker").attr("class", "volume_on");
                        widget.setVolume(1);
                    }
                }
            });
        });
    });
});