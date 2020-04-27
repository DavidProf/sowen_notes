import React from 'react';
import {
    TouchableOpacity,
    Text,
    Image,
    View
} from 'react-native';

import styles from './styles';
import theme from './theme';

export default function Settings({ route: { params }, navigation }) {

    function toggleTheme() {
        process.env.THEME = process.env.THEME != 'night' ? 'night' : 'sun';
        theme.setTheme(process.env.THEME);
    }

    return (
        <View style={[styles.container, { justifyContent: "flex-start", backgroundColor: theme.colors.background }]}>
            <TouchableOpacity
                style={[styles.itemButton, { backgroundColor: theme.colors.itemButton }]}
                onPress={toggleTheme}>
                <Text style={styles.itemButtonText}>Change theme</Text>
                <Image source={process.env.THEME != 'night' ? icons.sun : icons.moon} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const icons = {
    sun: require('../../assets/sun.png'),
    moon: require('../../assets/moon.png'),
}