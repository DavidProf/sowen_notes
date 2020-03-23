import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import dayjs from 'dayjs';

/**
 * Render note list
 * @param {Object[]} notes
 * @param {String} notes.id
 * @param {String} notes.title
 * @param {Date} notes.date
 */
export default function noteList(notes, navigation) {

    function goToNote(id) {
        navigation.navigate('Note', id);
    }

    /**
     * render a note info
     * @param {String} id 
     * @param {String} title 
     * @param {Date} date 
     * @param {Number} mark 
     */
    function noteItem(id, title, date, mark) {
        let backgroundColor = '#F5F5F5';
        switch (mark) {
            case 1:
                backgroundColor = '#F8CECC'
                break;
            case 2:
                backgroundColor = '#FFF2CC'
                break;
            case 3:
                backgroundColor = '#DAE8FC'
                break;
            case 4:
                backgroundColor = '#D5E8D4'
                break;
            case 5:
                backgroundColor = '#CCCCCC'
                break;
        }
        let pressTime = 0;
        return (
            <View
                id={id}
                style={[styles.noteItem, { backgroundColor }]}
                onTouchStart={() => pressTime = new Date()}
                onTouchEnd={() => goToNote(id)/* exibir opções on long press 120*/}
            >
                <View>
                    <Text style={styles.noteItemTitle}>{title}</Text>
                </View>
                <View>
                    <Text style={styles.noteItemLastUpdate}>Last update: {dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</Text>
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