import Moment from 'moment';
import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

// Import Moment locales
import 'moment/min/locales.min';

// Translation resources
import resources from './resources';

export default {
    init: async (locale = 'ru') => {
        try {
            Moment.locale(locale);
            await i18next.use(initReactI18next).init({
                lng: locale,
                resources,
            });
        } catch (e) {
            console.warn("Can't init i18n", e);
        }
        return i18next;
    },
};
