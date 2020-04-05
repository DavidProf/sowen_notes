import React, { useState } from 'react';
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

    db.selectAll().then(rows => setNotes(rows));

    function showOptions() {
        Animated.timing(pX, { toValue: show ? 15 : 90, duration: 250 }).start();
        Animated.timing(pY, { toValue: show ? 15 : 90, duration: 250 }).start();
        setShow(!show);
    }

    return (
        <View style={styles.container}>
            {noteList(notes, navigation)}
            <Animated.View style={[styles.roundedButton, { right: pX }]}>
                <TouchableOpacity
                    onPressOut={() => alert('backup')}>
                    <Image source={require('../../assets/cloud.png')} style={styles.icon} />
                </TouchableOpacity>
            </Animated.View>


            <Animated.View style={[styles.roundedButton, { bottom: pY }]}>
                <TouchableOpacity
                    onPressOut={() => navigation.navigate('Note')}>
                    <Image source={require('../../assets/add.png')} style={styles.icon} />
                </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity style={[styles.roundedButton]}
                onPressOut={() => showOptions()}>
                <Image source={show ? require('../../assets/x.png') : require('../../assets/burguer.png')} style={styles.icon} />
            </TouchableOpacity>
        </View >
    );
}