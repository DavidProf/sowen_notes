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

export default function Home({ navigation }) {
    const [notes, setNotes] = useState([]);
    const [show, setShow] = useState(false);
    const [pX] = useState(new Animated.Value(15));
    const [pY] = useState(new Animated.Value(15));

    useEffect(() => navigation.addListener('focus', () => db.selectAll().then(rows => setNotes(rows))), [navigation]);

    function showOptions() {
        Animated.timing(pX, { toValue: show ? 15 : 90, duration: 200, useNativeDriver: false }).start();
        Animated.timing(pY, { toValue: show ? 15 : 90, duration: 200, useNativeDriver: false }).start();
        setShow(!show);
    }

    return (
        <View style={styles.container}>
            {noteList(notes, navigation)}
            <Animated.View style={[styles.roundedButton, { right: pX }]}>
                <TouchableOpacity
                    onPressOut={() => navigation.navigate('Settings')}>
                    <Image source={icons.settings} style={styles.icon} />
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.roundedButton, { bottom: pY }]}>
                <TouchableOpacity
                    onPressOut={() => navigation.navigate('Note')}>
                    <Image source={icons.add} style={styles.icon} />
                </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity style={[styles.roundedButton]}
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