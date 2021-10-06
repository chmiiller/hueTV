import React from 'react';

const styles = {
    contact: {
        padding: '50px',
        textAlign: 'center',
        backgroundColor: '#46282d',
        color: 'white',
    },
};

const Contact = () => {
    const name = 'Carlos';
    return (
        <div style={styles.contact}>
            <h1>Contact Us Page</h1>
            <p>Some text about how to contact us.</p>
        </div>
    );
};

export default Contact;
