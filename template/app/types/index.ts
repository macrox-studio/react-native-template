import {NavigationFunctionComponent} from 'react-native-navigation';

// Screen helper models and types

interface ScreenProps {
    bootstrapped?: boolean;
    merge?: boolean;
    modal?: boolean;
}

export interface Screen<Props = {}> extends NavigationFunctionComponent<Props & ScreenProps> {
    screenName?: string;
}
