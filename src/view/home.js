import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    Animated
} from 'react-native';

import noteList from './noteList';
import db from '../lib/sowenNotesDB';
import styles from './styles';
import theme from './theme';

export default function Home({ navigation }) {
    const [notes, setNotes] = useState([]);
    const [show, setShow] = useState(false);
    const [pX] = useState(new Animated.Value(15));
    const [pY] = useState(new Animated.Value(15));
    
    theme.configTheme();
    
    useEffect(() => navigation.addListener('focus', () => db.selectAll().then(rows => setNotes(rows))), [navigation]);

    function showOptions() {
        Animated.timing(pX, { toValue: show ? 15 : 90, duration: 200, useNativeDriver: false }).start();
        Animated.timing(pY, { toValue: show ? 15 : 90, duration: 200, useNativeDriver: false }).start();
        setShow(!show);
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {noteList(notes, navigation)}
            <Animated.View style={[styles.roundedButton, { right: pX, backgroundColor: theme.colors.roundedButton }]}>
                <TouchableOpacity
                    onPressOut={() => navigation.navigate('Settings')}>
                    <Image source={icons.settings} style={styles.icon} />
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.roundedButton, { bottom: pY, backgroundColor: theme.colors.roundedButton }]}>
                <TouchableOpacity
                    onPressOut={() => navigation.navigate('Note')}>
                    <Image source={icons.add} style={styles.icon} />
                </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity style={[styles.roundedButton, { backgroundColor: theme.colors.roundedButton }]}
                onPressOut={() => showOptions()}>
                <Image source={show ? icons.x : icons.burguer} style={styles.icon} />
            </TouchableOpacity>
        </View >
    );
};

const icons = {
    burguer: require('../../assets/burguer.png'),
    x: require('../../assets/x.png'),
    add: require('../../assets/add.png'),
    settings: require('../../assets/settings.png')
};