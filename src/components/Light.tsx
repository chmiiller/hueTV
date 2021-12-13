import Box from '@mui/material/Box';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

type FocusedProps = {
    node: HTMLElement,
};

type LightProps = {
    id: string,
    onFocus: ({ node }: FocusedProps) => void,
};

type SwitchButtonProps = {
    focused: boolean
};

const Light = ({ id, onFocus }: LightProps): JSX.Element => {
    const SwitchButton = ({ focused }: SwitchButtonProps) => {
        return (
            <Box
                sx={{
                    bgcolor: 'primary.main',
                    border: focused ? 2 : 0,
                    borderColor: 'white',
                    borderRadius: 2,
                    width: 1/2,
                    height: 250
                }}
            />
        );
    };
    const FocusableComponent = withFocusable()(SwitchButton);

    return (
        <FocusableComponent
            focusKey={`light_${id}`}
            onBecameFocused={onFocus}
            onEnterPress={() => {
                console.log(` -------------------->>>>>>>>>>> ON ENTER: ${id}`);
            }}
        />
    );
};

export default Light;
