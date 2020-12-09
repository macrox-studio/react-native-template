import {Alert} from 'react-native';
import Config from 'react-native-config';
import {Navigation} from 'react-native-navigation';
import NetInfo from '@react-native-community/netinfo';

import {registerScreens} from "./screens";
import {startSplash} from "./navigation";

// Start application
export default function start() {
    // Register screens
    registerScreens();
    // Configure reachability
    NetInfo.configure({
        reachabilityUrl: Config.REACHABILITY_URL || 'https://clients3.google.com/generate_204',
        reachabilityTest: async (response) => response.status === 204,
        reachabilityRequestTimeout: 30 * 1000,
        reachabilityShortTimeout: 10 * 1000,
        reachabilityLongTimeout: 90 * 1000,
    });
    // Splash screen use first init services and call init api
    Navigation.events().registerAppLaunchedListener(() => {
        // Metrika.reportEvent('AppLaunched');
        startSplash().catch((error: any) => {
            Alert.alert('Critical', error?.message || "Can't start application!");
            console.warn("Can't start application", error);
        });
    });
    // Send navigation commands to YandexMetrica
    // noinspection JSUnusedLocalSymbols
    Navigation.events().registerComponentDidAppearListener(({componentName, passProps}) => {
        // Metrika.reportEvent('ComponentDidAppear', {componentName, passProps});
    });
    // noinspection JSUnusedLocalSymbols
    Navigation.events().registerComponentDidDisappearListener((event) => {
        // Metrika.reportEvent('ComponentDidDisappear', event);
    });
    // noinspection JSUnusedLocalSymbols
    Navigation.events().registerBottomTabSelectedListener((event) => {
        // Metrika.reportEvent('BottomTabSelected', event);
    });
}
