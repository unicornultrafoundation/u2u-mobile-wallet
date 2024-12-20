#import "AppDelegate.h"
#import "RNFBAppCheckModule.h"
#import <Firebase.h>

#import <React/RCTBundleURLProvider.h>
#import "RNFBMessagingModule.h"
#import <React/RCTLinkingManager.h>

/**
 Deletes all Keychain items accessible by this app if this is the first time the user launches the app
 */
static void ClearKeychainIfNecessary() {
  // Checks wether or not this is the first time the app is run
  if ([[NSUserDefaults standardUserDefaults] boolForKey:@"HAS_RUN_BEFORE"] == NO) {
    // Set the appropriate value so we don't clear next time the app is launched
    [[NSUserDefaults standardUserDefaults] setBool:YES forKey:@"HAS_RUN_BEFORE"];

    NSArray *secItemClasses = @[
      (__bridge id)kSecClassGenericPassword,
      (__bridge id)kSecClassInternetPassword,
      (__bridge id)kSecClassCertificate,
      (__bridge id)kSecClassKey,
      (__bridge id)kSecClassIdentity
    ];

    // Maps through all Keychain classes and deletes all items that match
    for (id secItemClass in secItemClasses) {
      NSDictionary *spec = @{(__bridge id)kSecClass: secItemClass};
      SecItemDelete((__bridge CFDictionaryRef)spec);
    }
  }
}

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // ClearKeychainIfNecessary();
  [RNFBAppCheckModule sharedInstance];
  [FIRApp configure];
  self.moduleName = @"U2UMobileWallet";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  // self.initialProps = @{};
  self.initialProps = [RNFBMessagingModule addCustomPropsToUserProps:nil withLaunchOptions:launchOptions];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// Add this inside `@implementation AppDelegate` above `@end`:
- (BOOL)application:(UIApplication *)application
  openURL:(NSURL *)url
  options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

// Add this inside `@implementation AppDelegate` above `@end`:
- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}

- (void)applicationWillResignActive:(UIApplication *)application {
  UIView *blurView = [[UIView alloc] initWithFrame:self.window.bounds];
  blurView.tag = 1234; // Arbitrary tag to identify the view
  blurView.backgroundColor = [UIColor whiteColor]; // Semi-transparent cover
  [self.window addSubview:blurView];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  UIView *blurView = [self.window viewWithTag:1234];
  if (blurView) {
    [blurView removeFromSuperview]; // Remove the cover when app becomes active
  }
}

@end
