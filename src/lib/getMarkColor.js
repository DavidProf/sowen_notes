const colors = {
    sun: {
        1: '#F8CECC',
        2: '#FFF2CC',
        3: '#DAE8FC',
        4: '#D5E8D4',
        5: '#CCCCCC',
    },
    night: {
        1: '#E30E6E',
        2: '#f2be00',
        3: '#001eff',
        4: '#00b81f',
        5: '#636363',
    }
};

export default (mark, theme = 'sun') => colors[theme][mark] ?? '#F5F5F5';
