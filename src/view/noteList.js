import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import dayjs from 'dayjs';
import getMarkColor from '../lib/getMarkColor';
import db from '../lib/sowenNotesDB';
/**
 * Render note list
 * @param {Object[]} notes
 * @param {String} notes.id
 * @param {String} notes.title
 * @param {Date} notes.date
 */
export default function noteList(notes, navigation) {
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
                <View style={styles.noteItemDelete}>
                    <TouchableOpacity onPress={() => db.delete([id]).then(() => navigation.navigate('Home'))}>
                        <Text style={styles.noteItemDelete}>delete</Text>
                    </TouchableOpacity>
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
    },
    noteItemDelete: {
        flex: 1,
        flexDirection: 'row-reverse',
        right: 5,
        textTransform: "uppercase",
        fontFamily: "sans-serif-medium",
        color: "#B85450"
    }
});