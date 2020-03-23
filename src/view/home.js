import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import {
    Icon
} from 'react-native-elements';
import noteList from './noteList';

let notes = [
    { id: '1', title: 'first title', date: new Date(), mark: 0 },
    { id: '2', title: 'first title', date: new Date(), mark: 1 }
];

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            {noteList(notes, navigation)}
            <TouchableOpacity style={styles.addNote}
                onPressOut={() => navigation.navigate('Note')}
            >
                <Icon name={"add"} size={30} color="#FFF" />
            </TouchableOpacity>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
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
    }
});