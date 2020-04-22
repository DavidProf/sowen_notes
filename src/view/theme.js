import { AsyncStorage } from 'react-native';

const theme = {
    configTheme: async () => {
        let name = await AsyncStorage.getItem('theme');
        theme.setTheme(name);
        process.env.THEME = name;
    },
    setTheme: name => {
        if (name == 'night') {
            theme.colors.background = '#4F4F4F';
            theme.colors.itemButton = theme.colors.roundedButton = '#0F0F0F';
            theme.colors.textLastUpdate = theme.colors.textDelete = '#000';
        } else {
            theme.colors.background = '#FFF';
            theme.colors.itemButton = theme.colors.roundedButton = '#2A7AFA';
            theme.colors.textLastUpdate = '#7C7D80';
            theme.colors.textDelete = '#B85450';
        }
        AsyncStorage.setItem('theme', name).catch(console.error);
    },
    colors: {
        background: '#FFF',
        itemButton: '#2A7AFA',
        roundedButton: '#2A7AFA',
        textLastUpdate: '#7C7D80',
        textDelete: '#B85450'
    }
};

export default theme;