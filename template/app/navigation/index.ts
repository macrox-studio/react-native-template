import {Navigation} from 'react-native-navigation';

import {SPLASH_SCREEN} from '../constants';

export function startSplash() {
    return Navigation.setRoot({
        root: {
            component: {
                name: SPLASH_SCREEN,
            },
        },
    });
}
