/**
 * Created by PengYuJing on 2020-04-22  10:09.
 * file description:
 */
import React from 'react'
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native'

export type IWhiteSpace = {
  size?: 'lg' | 'bg' | 'xl' | 'md' | 'sm' | 'xs'
  contentStyle?: StyleProp<ViewStyle>
}

export default class WhiteSpace extends React.PureComponent<IWhiteSpace> {
  render() {
    const {size = 'md', contentStyle = null} = this.props
    let style
    switch (size) {
      case 'lg':
        style = PageStyle.lg
        break
      case 'bg':
        style = PageStyle.bg
        break
      case 'xl':
        style = PageStyle.xl
        break
      case 'md':
        style = PageStyle.md
        break
      case 'sm':
        style = PageStyle.sm
        break
      case 'xs':
        style = PageStyle.xs
        break
    }
    return <View style={[style, contentStyle]} />
  }
}

const PageStyle = StyleSheet.create({
  lg: {
    height: 30,
  },
  bg: {
    height: 20,
  },
  xl: {
    height: 15,
  },
  md: {
    height: 10,
  },
  sm: {
    height: 8,
  },
  xs: {
    height: 5,
  },
})
