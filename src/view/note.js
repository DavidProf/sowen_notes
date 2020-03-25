import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Image,
    Picker
} from 'react-native';
import dayjs from 'dayjs';
import Toast from 'react-native-simple-toast';
import getMarkColor from '../lib/getMarkColor';
import db from '../lib/sowenNotesDB';

/**
 * Render note list
 * @param {Object} note
 * @param {String} note.id
 * @param {String} note.title
 * @param {Date} note.date
 * @param {String} note.content
 * @param {Number} note.mark
 */
export default function note({ route: { params }, navigation }) {
    const [note, setNote] = useState({
        title: dayjs().format('YYYY-MM-DD HH:mm'),
        content: '',
        mark: 0
    });

    if (!note.founded)
        db
            .selectById(params ? params.id : '')
            .then(foundedNote => setNote({ ...note, ...foundedNote, founded: true }));

    async function save() {
        try {
            if (note.id)
                await db.update(note.id, note.title, note.content, note.mark);
            else
                await db.insert(note.title, note.content, note.mark);
            return true;
        } catch (e) { Toast.showWithGravity(e.message, Toast.SHORT, Toast.CENTER) }
    }

    return note.founded ? (
        <SafeAreaView style={{ flex: 1, padding: 15, backgroundColor: getMarkColor(note.mark) }}>
            <TextInput
                style={styles.title}
                defaultValue={note.title}
                onChangeText={text => setNote({ ...note, title: text })} />
            <TextInput
                style={styles.content}
                multiline={true}
                numberOfLines={10000}
                defaultValue={note.content}
                onChangeText={text => setNote({ ...note, content: text })} />
            <View style={[styles.picker, { backgroundColor: getMarkColor(note.mark) }]}>
                <Picker
                    selectedValue={note.mark}
                    onValueChange={choice => { setNote({ ...note, mark: choice }); }}>
                    <Picker.Item label="White" value={0} />
                    <Picker.Item label="Pink" value={1} />
                    <Picker.Item label="Yellow" value={2} />
                    <Picker.Item label="Blue" value={3} />
                    <Picker.Item label="Green" value={4} />
                    <Picker.Item label="Grey" value={5} />
                </Picker>
            </View>
            <TouchableOpacity style={styles.back}
                onPressOut={async () => await save() && navigation.navigate('Home')}>
                <Image source={require('../../assets/done.png')} style={styles.icon} />
            </TouchableOpacity>
        </SafeAreaView>
    ) : (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Wait a moment</Text></View>);
}

const styles = StyleSheet.create({
    title: {
        height: 50,
        borderColor: '#000',
        borderRadius: 8,
        backgroundColor: '#FFF',
        textAlign: 'center',
        marginBottom: 15,
        fontSize: 25,
        fontWeight: 'bold'
    },
    content: {
        flex: 1,
        borderColor: '#000',
        borderRadius: 8,
        backgroundColor: '#FFF',
        textAlignVertical: 'top',
        padding: 15
    },
    picker: {
        height: 50,
        width: 200,
        margin: 15,
        borderRadius: 15
    },
    back: {
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