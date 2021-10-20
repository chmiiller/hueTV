import CSS from 'csstype';

type Styles = {
    contact: CSS.Properties
};
const styles : Styles = {
    contact: {
        textAlign: 'center',
        backgroundColor: '#000',
        color: 'white',
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
};

const Modal = (): JSX.Element => {
    return (
        <div style={styles.contact}>
            <h1>Close app</h1>
        </div>
    );
};

export default Modal;
