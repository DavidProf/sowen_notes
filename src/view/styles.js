const styles = {
    // noteList.js
    noteItem: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        borderRadius: 8,
        padding: 5,
        margin: 5
    },
    noteItemTitle: {
        color: '#282829',
        fontWeight: 'bold'
    },
    noteItemDelete: {
        flex: 1,
        flexDirection: 'row-reverse',
        right: 5,
        textTransform: "uppercase",
        fontFamily: "sans-serif-medium"
    },
    // note.js
    title: {
        height: 50,
        borderColor: '#000',
        borderRadius: 8,
        backgroundColor: '#FFF',
        textAlign: 'center',
        marginBottom: 15,
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 26
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
    // home.js & settings.js
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 15,
        paddingTop: 26
    },
    // home.js & note.js
    icon: { width: 30, height: 30, tintColor: "#FFF" },
    roundedButton: {
        position: 'absolute',
        height: 65,
        width: 65,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        right: 15,
        bottom: 15,
        borderColor: '#CCC',
        borderWidth: 1,
    },
    // settings.js
    itemButton: {
        marginVertical: 5,
        padding: 12,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemButtonText: {
        marginTop: 5,
        color: '#fff'
    }
};

export default styles;