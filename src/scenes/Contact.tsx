import React from 'react';
import CSS from 'csstype';
import { RouteComponentProps } from 'react-router-dom';

import FocusableButton from '../components/FocusableButton';

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

const Contact = (props: RouteComponentProps): JSX.Element => {
    const [message, setMessage] = React.useState('first');
    return (
        <div style={styles.contact}>
            <h1>Contact Us Page!</h1>
            <p>{`This is my ${message} visit to this app`}</p>
            <FocusableButton title={'First'} onEnterPress={() => {
                setMessage('first');
            }}/>
            <FocusableButton title={'Second'} onEnterPress={() => {
                setMessage('second');
            }}/>
        </div>
    );
};

export default Contact;
