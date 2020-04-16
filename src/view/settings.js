import React from 'react';
import {
    TouchableOpacity,
    Text,
    Image,
    View
} from 'react-native';
import styles from './styles';

import uploadIcon from '../../assets/upload.png';
import downloadIcon from '../../assets/download.png';
import sunIcon from '../../assets/sun.png';
import moonIcon from '../../assets/moon.png';

export default function Settings({ route: { params }, navigation }) {


    return (
        <View style={[styles.container, { justifyContent: "flex-start" }]}>
            <TouchableOpacity style={styles.itemButton}>
                <Text style={styles.itemButtonText}>Backup</Text>
                <Image source={uploadIcon} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemButton}>
                <Text style={styles.itemButtonText}>Restore</Text>
                <Image source={downloadIcon} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemButton}>
                <Text style={styles.itemButtonText}>Change theme</Text>
                <Image source={sunIcon} style={styles.icon} />
            </TouchableOpacity>
        </View>
    )
};