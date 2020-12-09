import _ from 'lodash';
import {useEffect, useRef, useState} from 'react';
import {Dimensions, Platform, StatusBar} from 'react-native';

export function isIphoneX(): boolean {
    const {height, width} = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (height === 812 || width === 812 || height === 896 || width === 896)
    );
}

export function ifIphoneX(iphoneXStyle: any, regularStyle: any): any {
    if (isIphoneX()) {
        return iphoneXStyle;
    }
    return regularStyle;
}

export function getStatusBarHeight(safe: boolean, translucent: boolean = false): number {
    return Platform.select({
        ios: ifIphoneX(safe ? 44 : 30, 20),
        android: translucent ? StatusBar.currentHeight : 0,
        default: 0,
    });
}

export function getBottomSpace(): number {
    return isIphoneX() ? 34 : 0;
}

export function useDelay(delay: number = 334) {
    const [complete, setComplete] = useState(false);
    const timeOutRef = useRef<any>(null);
    useEffect(() => {
        if (complete || timeOutRef.current !== null) {
            return;
        }
        timeOutRef.current = setTimeout(() => {
            timeOutRef.current = null;
            setComplete(true);
        }, delay);
    }, [delay, complete]);
    useEffect(
        () => () => {
            if (timeOutRef.current !== null) {
                clearTimeout(timeOutRef.current);
                timeOutRef.current = null;
            }
        },
        [],
    );
    return complete;
}

export function chunkWithPadEnd(array: any[], count: number, pad: any = null): any[] {
    const parts: any[][] = _.chunk(array, count);
    if (parts.length > 0 && parts[parts.length - 1].length < count) {
        parts[parts.length - 1].push(..._.fill(Array(count - parts[parts.length - 1].length), pad));
    }
    return parts as any[];
}
