import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import noteList from './noteList';
import db from '../lib/sowenNotesDB';
import styles from './styles';

export default function Home({ navigation }) {
    const [notes, setNotes] = useState([]);

    db.selectAll().then(rows => setNotes(rows));

    return (
        <View style={styles.container}>
            {noteList(notes, navigation)}
            <TouchableOpacity style={styles.roundedButton}
                onPressOut={() => navigation.navigate('Note')}>
                <Image source={require('../../assets/add.png')} style={styles.icon} />
            </TouchableOpacity>
        </View >
    );
}