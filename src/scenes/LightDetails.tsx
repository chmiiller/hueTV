import React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

import Light from '../components/Light';
import { getLights } from '../api/hueapi';
import { type Light as LightType } from '../api/types';

type FocusedProps = {
    node: HTMLElement,
};

type LightData = {
    id: string
};

const lightsArray: Array<LightData> = [];
for (let index = 0; index < 50; index++) {
    lightsArray.push({ id: `item_${index}` });
}

const LightDetails = (): JSX.Element => {
    const handleScrolling = ({ node }: FocusedProps) => {
        node.scrollIntoView({ behavior: "smooth", block: 'center' });
    };

    const [lights, setLights] = React.useState<Array<LightType>>([]);
    React.useEffect(() => {
        homeGetGroups();
    }, []);

    const homeGetGroups = async () => {
        const _lights = await getLights();
        if (_lights !== null) {
            setLights(_lights);
        }
    };
    
    return (
        <div style={{padding: 100}}>
            <Fade in timeout={600}>
                <Box sx={{ display: 'grid', rowGap: 5, gridTemplateColumns: 'repeat(3, 1fr)' }}>   
                    {lights.map((light: LightType) => (
                        <Light
                            key={light.id}
                            id={light.id}
                            name={light.name}
                            brightness={light.brightPercentage}
                            onFocus={handleScrolling}
                            isGroup={false}
                            isOn={light.isOn}
                        />
                    ))}
                </Box>
            </Fade>
        </div>
    );
};

export default LightDetails;
