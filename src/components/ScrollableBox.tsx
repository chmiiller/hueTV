import React, { useRef } from 'react';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

type ScrollableBoxProps = {
    onArrowPress: (arrow: string) => void,
    focused: boolean,
};

const ScrollableBox = (): JSX.Element => {
    const paperRef = useRef<HTMLHeadingElement>(null);
    
    const onArrow = (direction: string) => {
        switch (direction) {
        case 'up':
            paperRef.current?.scrollTo({
                top: paperRef.current?.scrollTop - 60,
                left: 0,
                behavior: 'smooth'
            });
            break;
            
        case 'down':
            paperRef.current?.scrollTo({
                top: paperRef.current?.scrollTop + 60,
                left: 0,
                behavior: 'smooth'
            });
            break;
        }
    };

    const ScrollableComponent = ( { focused, onArrowPress }: ScrollableBoxProps ) => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Paper
                    ref={paperRef}
                    elevation={20}
                    sx={{
                        background: '#22242b',
                        width: '33%',
                        height: '75vh',
                        marginTop: 12,
                        marginBottom: 12,
                        border: focused ? 1 : 0,
                        borderColor: '#3f444a',
                        overflowY: 'auto'
                    }}
                >
                    <Typography sx={{ marginTop: 1 }} gutterBottom variant={'h6'}>{
                        `# Welcome to HueTV!

                        Hi there, first of all, **thank you so much** for downloading my app!
                        The HueTV app was made for those who want to dim the living room lights just before start watching their favorite TV show and are too lazy to unlock their phone and open the (sometimes slow) lights app, or for those who just want to show off that they can control all the lights in their house using the TV remote.
                        
                        ## Motivation
                        
                        Like mentioned above I was just curious to see if I could dim the lights in my apartment, just before pressing play in a movie or show from my recently bought Samsung TV and for my surprise there was no app available on the Samsung store. As a developer I decided to give it a try and see how difficult it would be to create and run a TV app by myself and after a couple of hours downloading SDKs and Simulators another side project was kicked off.
                        
                        This means that it'll be forever free and there's no reason for it to collect analytics or any other private information from your TV, lights or house, in fact this app doesn't even connect to the internet, everything happens inside your private Wi-Fi network!
                        
                        I hope it becomes useful and fun to use for you as it became to me.
                        
                        ## The name is Carlos
                        
                        I'm Carlos Zinato, software engineer living in The Netherlands and like every developer I have started 196 side projects on the last four months and this is the one that finally sees the light of day. I've been working as a software engineer for 12 years now, making mobile apps for iOS and Android and a little of web with ReactJS for the past three years.
                        If you like this app and it makes you happy please consider buying me a coffee. It will definitely motivate me to keep it up-to-date and adding more features!
                        
                        **Buy me a coffee**
                        
                        ![Buy me a coffee](https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/d7/b5/cb/d7b5cbcd-ff98-10d3-5596-5dcc4a8d0eac/source/256x256bb.jpg)
                        
                        
                        ## Open source
                        
                        For those interested in how you can build and deploy an app to the Samsung TV and control your Philips Hue lights using JavaScript and ReactJS this project is available on GitHub as open source. There you can clone the project, learn how to run it locally, ask questions, give some feedback, open issues and of course - contribute!
                        
                        **GitHub Repository**
                        
                        ![GitHub Repository](https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/d7/b5/cb/d7b5cbcd-ff98-10d3-5596-5dcc4a8d0eac/source/256x256bb.jpg)
                        
                        **important note:** this is an unofficial and independent app, with no affiliations with Philips Hue, Signify or Samsung.`
                    }</Typography>
                </Paper>
            </Box>
        );
    };

    const FocusableSrollBox = withFocusable()(ScrollableComponent);

    return (        
        <FocusableSrollBox onArrowPress={onArrow}/>
    );
};

export default ScrollableBox;
