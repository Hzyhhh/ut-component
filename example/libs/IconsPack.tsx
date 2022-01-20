import React from 'react';
import {StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const MaterialIconsPack = {
  name: 'material',
  icons: createIconsMap(MaterialIcons),
};
export const FeatherIconsPack = {
  name: 'feather',
  icons: createIconsMap(Feather),
};
export const FontAwesomeIconsPack = {
  name: 'fontAwesome',
  icons: createIconsMap(FontAwesome),
};
export const IoniconsPack = {
  name: 'ionicons',
  icons: createIconsMap(Ionicons),
};
export const SimpleLineIconsPack = {
  name: 'simpleLine',
  icons: createIconsMap(SimpleLineIcons),
};
export const MaterialCommunityIconsPack = {
  name: 'materialCommunityIcons',
  icons: createIconsMap(MaterialCommunityIcons),
};

function createIconsMap(Icon) {
  return new Proxy(
    {},
    {
      get(target, name) {
        return {
          toReactElement: ({style = {height: 55, width: 55}}) => {
            const {height, tintColor, ...iconStyle} = StyleSheet.flatten(style);
            return (
              <Icon
                name={name}
                size={height}
                color={tintColor}
                style={iconStyle}
              />
            );
          },
        };
      },
    },
  );
}
