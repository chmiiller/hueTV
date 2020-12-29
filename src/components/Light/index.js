import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'renative';

import { turnLightOff, turnLightOn } from '../../hueapi';
import Theme, { themeStyles, hasWebFocusableUI } from '../../config';

const LightItem = ({ light, switchCallback }) => {
    const { id, isOn, name } = light;
    const indication = isOn ? `💡` : `🙅‍♀️`;

    const switchLight = async(isOn, lightId) => {
        const result = await (isOn) ? turnLightOff(lightId) : turnLightOn(lightId);
        switchCallback(result);
    };

    const SwitchButton = ({ isOn, lightId }) => {
        const buttonLabel = isOn === true ? `TURN OFF` : `TURN ON`;
        return (
            <View>
                <Button
                    iconFont="fontAwesome"
                    className="focusable"
                    focusKey={`lamp-button-${lightId}`}
                    iconName="lightbulb-o"
                    iconColor={Theme.color4}
                    iconSize={Theme.iconSizeMedium}
                    style={themeStyles.icon}
                    onEnterPress={() => {
                        switchLight(isOn, lightId);
                    }}
                />
                <Text style={{color: Theme.color4}}>{buttonLabel}</Text>
            </View>
        );
    }

    
    return(
        <View>
            <Text style={{color: Theme.color4}}>{`${name} ${indication}  `}</Text>
            <SwitchButton isOn={isOn} lightId={id}/>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: 'pink',
      width: 200,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default LightItem;