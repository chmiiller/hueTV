import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ScrollableBox from '../../components/ScrollableBox';
import {
    WELCOME_TITLE,
    WELCOME_MESSAGE,
    ABOUT_TITLE,
    ABOUT_ME,
    MOTIVATION_TITLE,
    MOTIVATION1,
    MOTIVATION2,
    MOTIVATION3,
    OPEN_SOURCE_TITLE,
    OPEN_SOURCE,
    NOTE,
} from './content';

const QR_COFFEE_URL = `https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/d7/b5/cb/d7b5cbcd-ff98-10d3-5596-5dcc4a8d0eac/source/256x256bb.jpg`;
const QR_REPO_URL = `https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/d7/b5/cb/d7b5cbcd-ff98-10d3-5596-5dcc4a8d0eac/source/256x256bb.jpg`;
const VERSION_DATE = `2022-04-06`;

const About = (): JSX.Element => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '90vw',
            marginLeft: 0,
            marginRight: 12,
            marginTop: 8,
        }}>
            <ScrollableBox>
                <Typography variant={'h4'}>{WELCOME_TITLE}</Typography>
                <p/>
                <Typography variant={'body1'}>{WELCOME_MESSAGE}</Typography>
                <br />
                <Typography variant={'h4'}>{ABOUT_TITLE}</Typography>
                <p/>
                <Typography variant={'body1'}>{ABOUT_ME}</Typography>
                <p/>
                <Typography variant={'body1'}><strong>Buy me a coffee</strong></Typography><p/>
                <Typography variant={'body1'}>
                    <img src={QR_COFFEE_URL} alt="Buy me a coffee" />
                </Typography>
                <br />
                <Typography variant={'h4'}>{MOTIVATION_TITLE}</Typography>
                <p/>
                <Typography variant={'body1'}>{MOTIVATION1}</Typography><p/>
                <Typography variant={'body1'}>{MOTIVATION2}</Typography><p/>
                <Typography variant={'body1'}>{MOTIVATION3}</Typography>
                <br />
                <Typography variant={'h4'}>{OPEN_SOURCE_TITLE}</Typography>
                <p/>
                <Typography variant={'body1'}>{OPEN_SOURCE}</Typography>
                <p/>
                <Typography variant={'body1'}> <strong>GitHub Repository</strong></Typography><p/>
                <Typography variant={'body1'}>
                    <img src={QR_REPO_URL} alt="GitHub Repository" />
                </Typography>
                <br />
                <Typography variant={'body1'}><strong>{`important note: `}</strong>{NOTE}</Typography>
                <br/>
                <Typography variant={'body2'}>{VERSION_DATE}</Typography>
            </ScrollableBox> 
        </Box>
    );
};

export default About;
