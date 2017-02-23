/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RCTBridgeModule.h"

@interface AppDelegate () <RCTBridgeModule>
  
  @property (nonatomic, strong) SPTAuth *auth;
  @property (nonatomic, strong) SPTAudioStreamingController *player;
  @property (nonatomic, strong) UIViewController *authViewController;
  
@end


@implementation AppDelegate

RCT_EXPORT_MODULE();
  
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"SuperDuperMusic"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  // Spotify credentials
  
  self.auth = [SPTAuth defaultInstance];
  self.player = [SPTAudioStreamingController sharedInstance];
  
  // The client ID you got from the developer site
  self.auth.clientID = @"Your-Client-Id";
  // The redirect URL as you entered it at the developer site
  self.auth.redirectURL = [NSURL URLWithString:@"Your-Callback-URL"];
  // Setting the `sessionUserDefaultsKey` enables SPTAuth to automatically store the session object for future use.
  self.auth.sessionUserDefaultsKey = @"current session";
  // Set the scopes you need the user to authorize. `SPTAuthStreamingScope` is required for playing audio.
  self.auth.requestedScopes = @[SPTAuthStreamingScope];
  
  // Become the streaming controller delegate
  self.player.delegate = self;
  
  // Start up the streaming controller.
  NSError *audioStreamingInitError;
  NSAssert([self.player startWithClientId:self.auth.clientID error:&audioStreamingInitError],
           @"There was a problem starting the Spotify SDK: %@", audioStreamingInitError.description);
  
  
  // Uncomment to start Spotify authentication on app launch
//  dispatch_async(dispatch_get_main_queue(), ^{
//    [self startAuthenticationFlow];
//  });
  
  
  return YES;
}

  // Start Spotify athentication from React method call
RCT_EXPORT_METHOD(startSpotifyAuthorization)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    [self startAuthenticationFlow];
  });
}

- (void)startAuthenticationFlow
  {
    // Check if we could use the access token we already have
    if ([self.auth.session isValid]) {
      // Use it to log in
      [self.player loginWithAccessToken:self.auth.session.accessToken];
    } else {
      // Get the URL to the Spotify authorization portal
      NSURL *authURL = [self.auth spotifyWebAuthenticationURL];
      // Present in a SafariViewController
      self.authViewController = [[SFSafariViewController alloc] initWithURL:authURL];
      [self.window.rootViewController presentViewController:self.authViewController animated:YES completion:nil];
    }
  }
  
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary *)options
  {
    // If the incoming url is what we expect we handle it
    if ([self.auth canHandleURL:url]) {
      // Close the authentication window
      [self.authViewController.presentingViewController dismissViewControllerAnimated:YES completion:nil];
      self.authViewController = nil;
      // Parse the incoming url to a session object
      [self.auth handleAuthCallbackWithTriggeredAuthURL:url callback:^(NSError *error, SPTSession *session) {
        if (session) {
          // login to the player
          [self.player loginWithAccessToken:self.auth.session.accessToken];
        }
      }];
      return YES;
    }
    return NO;
  }
  
- (void)audioStreamingDidLogin:(SPTAudioStreamingController *)audioStreaming
  {
    [self.player playSpotifyURI:@"spotify:track:58s6EuEYJdlb0kO7awm3Vp" startingWithIndex:0 startingWithPosition:0 callback:^(NSError *error) {
      if (error != nil) {
        NSLog(@"*** failed to play: %@", error);
        return;
      }
    }];
  }
  
@end
