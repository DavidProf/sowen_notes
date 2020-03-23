import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import dayjs from 'dayjs';

/**
 * Render note list
 * @param {Object} note
 * @param {String} note.id
 * @param {String} note.title
 * @param {Date} note.date
 * @param {String} note.content
 * @param {Number} note.mark
 */
export default function note({ navigation }) {
    return (
        <SafeAreaView>
            <View>
                <Text>
                    teste {dayjs().toISOString()}
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}>
                    <Text>hi</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
});