// @ts-nocheck
import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  StyleSheetProperties,
  ViewStyle,
  TextStyle,
} from 'react-native'
import {Cell} from './cell'
import {sum} from '../utils'

export class Col extends Component<
  Partial<{
    data
    height
    heightArr
    flex
    width: number
    style: ViewStyle
    textStyle: TextStyle
  }>
> {
  render() {
    const {data, style, width, height, heightArr, flex, textStyle, ...props} =
      this.props

    return data ? (
      <View
        style={[
          width && {width},
          flex && {flex},
          !width && !flex && {flex: 1},
          style,
        ]}>
        {data?.map((item, i) => {
          const height = heightArr && heightArr[i]
          return (
            <Cell
              key={i}
              data={item}
              width={width}
              height={height}
              textStyle={textStyle}
              {...props}
            />
          )
        })}
      </View>
    ) : null
  }
}

export class Cols extends Component<
  Partial<{
    data
    heightArr
    flex
    widthArr
    flexArr
    style: StyleSheetProperties
    textStyle: TextStyle
  }>
> {
  render() {
    const {data, style, widthArr, heightArr, flexArr, textStyle, ...props} =
      this.props
    let width = widthArr ? sum(widthArr) : 0

    return data ? (
      <View style={[styles.cols, width && {width}]}>
        {data?.map((item, i) => {
          const flex = flexArr && flexArr[i]
          const wth = widthArr && widthArr[i]
          return (
            <Col
              key={i}
              data={item}
              width={wth}
              heightArr={heightArr}
              flex={flex}
              style={style}
              textStyle={textStyle}
              {...props}
            />
          )
        })}
      </View>
    ) : null
  }
}

const styles = StyleSheet.create({
  cols: {flexDirection: 'row'},
})
