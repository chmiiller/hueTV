import React from 'react';
import CSS from 'csstype';
import { useNavigate } from 'react-router-dom';

import FocusableButton from '../components/FocusableButton';
import { getBridgeIpAddress, askUsername } from '../api/hueapi';

type Styles = {
    contact: CSS.Properties
};
const styles : Styles = {
    contact: {
        padding: '50px',
        textAlign: 'center',
        backgroundColor: '#46282d',
        color: 'white',
    },
};

const TOTAL_AUTH_TRIES = 20;

const Settings = (): JSX.Element => {
    const navigate = useNavigate();
    const [message, setMessage] = React.useState('Welcome');
    const [debug, setDebug] = React.useState('');
    // React.useEffect(() => {
    //     settingsGetBridgeAddress();
    // }, []);
    
    const settingsGetBridgeAddress = async () => {
        const bridgeAddress = await getBridgeIpAddress();
        console.log(`>>>>>>>>>>>>> bridgeAddress: ${JSON.stringify(bridgeAddress, null, '    ')}`);
        setDebug(`\n bridge address: ${JSON.stringify(bridgeAddress, null, '    ')}`);
    };
    
    const stepGetUsername = async() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const tizenId = window.tizen ? window.tizen.systeminfo.getCapability('http://tizen.org/system/tizenid') : 'huetv';
        setMessage(`TizenId ${tizenId}`);
        const userRes = await askUsername(tizenId);
        if (userRes.data.error && userRes.data.error.type && userRes.data.error.type === 101) {
            let count = TOTAL_AUTH_TRIES;
            const countInterval = setInterval(async () => {
                // ask for username
                const intervalRes = await askUsername(tizenId);
                if (intervalRes && intervalRes.data.success && intervalRes.data.success.username) {
                    clearInterval(countInterval);
                    setMessage('GOT LAMPS');                    
                    setTimeout(() => {
                        navigate('/home');
                    }, 1000);
                    return;
                } else {
                    setMessage(`Please press Hue Bridge button in: ${count} second(s)`);
                    // on error, keep trying for 20 seconds
                    if (count === 0) {
                        clearInterval(countInterval);
                        setMessage('Welcome');
                    }
                    count--;
                }
            }, 1100);
        }
    };

    return (
        <div style={styles.contact}>
            <h1>Settings</h1>
            <p>{`${message}`}</p>
            <FocusableButton title={'Find Bridge'} onEnterPress={() => {
                settingsGetBridgeAddress();
            }}/>
            <FocusableButton title={'Setup Bridge'} onEnterPress={() => {
                stepGetUsername();
            }}/>
            <FocusableButton title={'Go Home'} onEnterPress={() => {
                navigate('/home');
            }}/>
            <p>{debug}</p>
        </div>
    );
};

export default Settings;
