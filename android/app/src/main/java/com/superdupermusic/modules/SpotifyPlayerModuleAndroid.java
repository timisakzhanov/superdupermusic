package com.superdupermusic.modules;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.spotify.sdk.android.player.Config;
import com.spotify.sdk.android.player.ConnectionStateCallback;
import com.spotify.sdk.android.player.Error;
import com.spotify.sdk.android.player.Player;
import com.spotify.sdk.android.player.PlayerEvent;
import com.spotify.sdk.android.player.Spotify;
import com.spotify.sdk.android.player.SpotifyPlayer;

/**
 * Created on 2/27/17.
 */

public class SpotifyPlayerModuleAndroid extends ReactContextBaseJavaModule implements
        ConnectionStateCallback,
        Player.NotificationCallback {


    private static final String TAG = "SPOTIFY_PLAYER_MODULE";

    private Player mPlayer;

    public SpotifyPlayerModuleAndroid(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SpotifyPlayerModuleAndroid";
    }

    @ReactMethod
    public void initPlayer(String accessToken) {
        Config playerConfig = new Config(getCurrentActivity(), accessToken, SpotifyData.SPOTIFY_CLIENT_ID);

        Spotify.getPlayer(playerConfig, this, new SpotifyPlayer.InitializationObserver() {
            @Override
            public void onInitialized(SpotifyPlayer spotifyPlayer) {
                mPlayer = spotifyPlayer;
                mPlayer.addConnectionStateCallback(SpotifyPlayerModuleAndroid.this);
                mPlayer.addNotificationCallback(SpotifyPlayerModuleAndroid.this);
            }

            @Override
            public void onError(Throwable throwable) {
                Log.e(TAG, "Could not initialize player: " + throwable.getMessage());
            }
        });
    }

    @ReactMethod
    public void play(String uri) {
        mPlayer.playUri(uri, 0, 0);
    }

    @ReactMethod
    public void pause() {
        mPlayer.pause();
    }

    @ReactMethod
    public void destroyPlayer() {
        Spotify.destroyPlayer(this);
    }

    @Override
    public void onLoggedIn() {

    }

    @Override
    public void onLoggedOut() {

    }

    @Override
    public void onLoginFailed(int i) {

    }

    @Override
    public void onTemporaryError() {

    }

    @Override
    public void onConnectionMessage(String s) {

    }

    @Override
    public void onPlaybackEvent(PlayerEvent playerEvent) {

    }

    @Override
    public void onPlaybackError(Error error) {

    }
}
