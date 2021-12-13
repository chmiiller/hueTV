import Box from '@mui/material/Box';
import Light from '../components/Light';

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

const Home = (): JSX.Element => {
    const handleScrolling = ({ node }: FocusedProps) => {
        node.scrollIntoView({ behavior: "smooth", block: 'center' });
    };

    return (
        <div style={{padding: 100}}>
            <Box sx={{ display: 'grid', rowGap: 5, gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {lightsArray.map(item => <Light key={item.id} id={item.id} onFocus={handleScrolling} />)}
            </Box>
        </div>
    );
};

export default Home;
