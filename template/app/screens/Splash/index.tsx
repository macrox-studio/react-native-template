import React from 'react';
import {View, StyleSheet} from 'react-native';

import {MIN_SCREEN_SIZE, SPLASH_SCREEN} from '../../constants';
import {Screen} from '../../types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: MIN_SCREEN_SIZE * 0.3,
        width: MIN_SCREEN_SIZE * 0.3,
    },
});

const SplashScreen: Screen<{}> = () => {
    return (
        <View style={styles.container} />
    );
};

SplashScreen.options = {
    topBar: {
        visible: false,
    },
    statusBar: {
        // backgroundColor: splashBackground,
        style: 'light',
    },
    layout: {
        orientation: ['portrait', 'landscape'],
        // componentBackgroundColor: splashBackground,
        // backgroundColor: splashBackground,
    },
};

SplashScreen.screenName = SPLASH_SCREEN;

export default SplashScreen;
