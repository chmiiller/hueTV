import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const KeyDebug = () => {
    const [lastKeyCode, setLastKeyCode] = useState('');

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            setLastKeyCode(e.keyCode);
        });
    }, []);

    return (
        <View style={{
            width: 300, height: 50, position: 'absolute', bottom: 0, right: 0, backgroundColor: 'white', justifyContent: 'center', padding: 20
        }}
        >
            <Text style={{ fontSize: 20 }}>
                {`Last Key: ${lastKeyCode}`}
            </Text>
        </View>
    );
};

export default KeyDebug;