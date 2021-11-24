import CSS from 'csstype';

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

const Contact2 = (): JSX.Element => {
    return (
        <div style={styles.contact}>
            <h1>Contact PAGE NUMBER 2</h1>
            <p>Some text about how to contact us.</p>
        </div>
    );
};

export default Contact2;
