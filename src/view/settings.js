import React from 'react';
import {
    TouchableOpacity,
    Text,
    Image,
    View
} from 'react-native';

import styles from './styles';

export default function Settings({ route: { params }, navigation }) {


    return (
        <View style={[styles.container, { justifyContent: "flex-start" }]}>
            <TouchableOpacity style={styles.itemButton}>
                <Text style={styles.itemButtonText}>Backup</Text>
                <Image source={icons.upload} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemButton}>
                <Text style={styles.itemButtonText}>Restore</Text>
                <Image source={icons.download} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemButton}>
                <Text style={styles.itemButtonText}>Change theme</Text>
                <Image source={icons.sun} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const icons = {
    upload: require('../../assets/upload.png'),
    download: require('../../assets/download.png'),
    sun: require('../../assets/sun.png'),
    moon: require('../../assets/moon.png'),
}