import React from 'react';
import {View} from 'react-native';
import {Screen} from '../../types';

const TemplateScreen: Screen = () => {
    return <View />;
};

TemplateScreen.options = () => {
    return {
        topBar: {
            visible: false,
        },
        layout: {},
    };
};

TemplateScreen.screenName = 'template';

export default TemplateScreen;
