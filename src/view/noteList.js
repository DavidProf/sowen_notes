import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import dayjs from 'dayjs';
import getMarkColor from '../lib/getMarkColor';

/**
 * Render note list
 * @param {Object[]} notes
 * @param {String} notes.id
 * @param {String} notes.title
 * @param {Date} notes.date
 */
export default function noteList(notes, navigation) {
    let [options, setOptions] = useState({});

    function goToNote(id) {
        navigation.navigate('Note', { id });
    }

    /**
     * render a note info
     * @param {String} id 
     * @param {String} title 
     * @param {Date} date 
     * @param {Number} mark 
     */
    function noteItem(id, title, date, mark) {

        let backgroundColor = getMarkColor(mark);

        return (
            <View
                id={id}
                style={[styles.noteItem, { backgroundColor }]}
                onTouchEnd={() => goToNote(id)}>
                <View>
                    <Text style={styles.noteItemTitle}>{title}</Text>
                </View>
                <View>
                    <Text style={styles.noteItemLastUpdate}>Last update: {dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                    
                </View>
            </View>
        );
    }

    return (
        <FlatList
            data={notes}
            renderItem={({ item: { id, title, date, mark } }) => noteItem(id, title, date, mark)}
            keyExtractor={note => note.id}
        />
    );
}
const styles = StyleSheet.create({
    noteItem: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: 8,
        padding: 5,
        margin: 5
    },
    noteItemTitle: {
        color: '#282829',
        fontWeight: 'bold'
    },
    noteItemLastUpdate: {
        color: '#7c7d80'
    }
});