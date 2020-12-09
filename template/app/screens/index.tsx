import React from 'react';
import {Navigation} from 'react-native-navigation';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {SafeAreaProvider, initialWindowMetrics} from 'react-native-safe-area-context';

import {Screen} from "../types";

// Screens
import SplashScreen from './Splash';

// Wrapper
function wrapped(Component: Screen<any>) {
    function Inject(props: any) {
        // TODO: Add more providers
        return (
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <Component {...props} />
            </SafeAreaProvider>
        )
    }
    if (Component.options) {
        Inject.options = Component.options;
    }
    return gestureHandlerRootHOC(Inject);
}

// Registration
export function registerScreens() {
    // Default screens
    [SplashScreen].forEach((screen: Screen<any>) => {
        if (!screen.screenName) {
            return console.error(
                `Screen by class "${screen?.constructor?.name}" has't static constant "screenName" for use in navigation stack!`,
            );
        }
        Navigation.registerComponent(screen.screenName!, () => wrapped(screen));
    });

    // Lazy registrations
    Navigation.setLazyComponentRegistrator((componentName) => {
        switch (componentName) {
            default:
                console.warn("Can't find lazy screen for component name ", componentName);
                break;
        }
    });
}
