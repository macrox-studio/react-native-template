package com.macrox;

import android.content.Context;

// import com.yandex.metrica.YandexMetrica;
// import com.actionsheet.ActionSheetPackage;
// import com.yandex.metrica.YandexMetricaConfig;
// import com.yandex.metrica.push.YandexMetricaPush;

import com.facebook.react.ReactPackage;
import com.facebook.react.PackageList;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactInstanceManager;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends NavigationApplication {

    private final ReactNativeHost mReactNativeHost =
            new NavigationReactNativeHost(this) {
                @Override
                public boolean getUseDeveloperSupport() {
                    return BuildConfig.DEBUG;
                }

                @Override
                protected List<ReactPackage> getPackages() {
                    @SuppressWarnings("UnnecessaryLocalVariable")
                    List<ReactPackage> packages = new PackageList(this).getPackages();
                    // Packages that cannot be autolinked yet can be added manually here, for example:
                    // packages.add(new ActionSheetPackage());
                    return packages;
                }

                @Override
                protected String getJSMainModuleName() {
                    return "index";
                }
            };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        // Creating an extended library configuration.
        /*
        YandexMetricaConfig config = YandexMetricaConfig
                .newConfigBuilder(BuildConfig.YANDEX_METRICA_KEY)
                .withInstalledAppCollecting(true)
                .withStatisticsSending(true)
                .withLocationTracking(true)
                .withCrashReporting(true)
                .build();
        */
        // Initializing the SDK.
        // YandexMetrica.activate(getApplicationContext(), config);
        // Automatic tracking of user activity.
        // YandexMetrica.enableActivityAutoTracking(this);
        // Init pushes
        // YandexMetricaPush.init(getApplicationContext());
        // Init flipper for debug
        initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    }

    /**
     * Loads Flipper in React Native templates. Call this in the onCreate method with something like
     * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
     */
    private static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
        if (BuildConfig.DEBUG) {
            try {
                Class<?> aClass = Class.forName("com.macrox.ReactNativeFlipper");
                aClass.getMethod("initializeFlipper", Context.class, ReactInstanceManager.class).invoke(null, context, reactInstanceManager);
            } catch (ClassNotFoundException | InvocationTargetException | IllegalAccessException | NoSuchMethodException e) {
                e.printStackTrace();
            }
        }
    }
}
