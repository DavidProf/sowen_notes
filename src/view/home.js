import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import noteList from './noteList';
import db from '../lib/sowenNotesDB';

export default function Home({ navigation }) {
    const [notes, setNotes] = useState([]);

    db.selectAll().then(rows => setNotes(rows));

    return (
        <View style={styles.container}>
            {noteList(notes, navigation)}
            <TouchableOpacity style={styles.addNote}
                onPressOut={() => navigation.navigate('Note')}>
                <Image source={require('../../assets/add.png')} style={styles.icon} />
            </TouchableOpacity>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        padding: 15
    },
    addNote: {
        position: 'absolute',
        height: 65,
        width: 65,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2A7AFA',
        borderRadius: 50,
        right: 15,
        bottom: 15,
        borderColor: '#CCC',
        borderWidth: 1,
    },
    icon: { width: 30, height: 30, tintColor: "#FFF" }
});