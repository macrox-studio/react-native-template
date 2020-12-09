#import "AppDelegate.h"

#import "ReactNativeConfig.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <ReactNativeNavigation/ReactNativeNavigation.h>

#import <UserNotifications/UserNotifications.h>
// #import <YandexMobileMetrica/YandexMobileMetrica.h>
// #import <YandexMobileMetricaPush/YandexMobileMetricaPush.h>

// #import <RNFSManager.h>

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper =
  [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc]
                     initWithRootNode:application
                     withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc]
                     initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  // Init yandex metrica
  // [YMMYandexMetrica activateWithConfiguration:[[YMMYandexMetricaConfiguration alloc] initWithApiKey:[ReactNativeConfig envFor:@"YANDEX_METRICA_KEY"]]];
  if ([UNUserNotificationCenter class] != Nil) {
    // id<YMPUserNotificationCenterDelegate> delegate = [YMPYandexMetricaPush userNotificationCenterDelegate];
    // [UNUserNotificationCenter currentNotificationCenter].delegate = delegate;
  }
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif
  // [YMPYandexMetricaPush handleApplicationDidFinishLaunchingWithOptions:launchOptions];
  // [self registerForPushNotificationsWithApplication:application];

  // Run RNN Application
  [ReactNativeNavigation bootstrapWithDelegate:self launchOptions:launchOptions];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (NSArray<id<RCTBridgeModule>> *)extraModulesForBridge:(RCTBridge *)bridge {
  return [ReactNativeNavigation extraModulesForBridge:bridge];
}

- (void)registerForPushNotificationsWithApplication:(UIApplication *)application
{
  // Register for push notifications
  if ([application respondsToSelector:@selector(registerForRemoteNotifications)]) {
    if (NSClassFromString(@"UNUserNotificationCenter") != Nil) {
      // iOS 10.0 and above
      UNAuthorizationOptions options =
      UNAuthorizationOptionAlert |
      UNAuthorizationOptionBadge |
      UNAuthorizationOptionSound;
      UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
      UNNotificationCategory *category = [UNNotificationCategory
                                          categoryWithIdentifier:@"Custom category"
                                          actions:@[]
                                          intentIdentifiers:@[]
                                          options:UNNotificationCategoryOptionCustomDismissAction];
      // Only for push notifications of this category dismiss action will be tracked.
      [center setNotificationCategories:[NSSet setWithObject:category]];
      [center requestAuthorizationWithOptions:options completionHandler:^(BOOL granted, NSError *error) {
        // Enable or disable features based on authorization.
      }];
    }
    else {
      // iOS 8 and iOS 9
      UIUserNotificationType userNotificationTypes =
      UIUserNotificationTypeAlert |
      UIUserNotificationTypeBadge |
      UIUserNotificationTypeSound;
      UIUserNotificationSettings *settings =
      [UIUserNotificationSettings settingsForTypes:userNotificationTypes categories:nil];
      [application registerUserNotificationSettings:settings];
    }
    [application registerForRemoteNotifications];
    return;
  }
  // iOS 7
  UIRemoteNotificationType notificationTypes =
  UIRemoteNotificationTypeBadge |
  UIRemoteNotificationTypeSound |
  UIRemoteNotificationTypeAlert;
  [application registerForRemoteNotificationTypes:notificationTypes];

}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
#ifdef DEBUG
  // YMPYandexMetricaPushEnvironment pushEnvironment = YMPYandexMetricaPushEnvironmentDevelopment;
#else
  // YMPYandexMetricaPushEnvironment pushEnvironment = YMPYandexMetricaPushEnvironmentProduction;
#endif
  // [YMPYandexMetricaPush setDeviceTokenFromData:deviceToken pushEnvironment:pushEnvironment];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  completionHandler(UIBackgroundFetchResultNewData);
}

- (void)handleRemoteNotification:(NSDictionary *)userInfo
{
  // [YMPYandexMetricaPush handleRemoteNotification:userInfo];
  // if (![YMPYandexMetricaPush isNotificationRelatedToSDK:userInfo]) {
    // Use it
  // }
}

- (void)application:(UIApplication *)application handleEventsForBackgroundURLSession:(NSString *)identifier completionHandler:(void (^)())completionHandler
{
  // [RNFSManager setCompletionHandlerForIdentifier:identifier completionHandler:completionHandler];
}

@end
