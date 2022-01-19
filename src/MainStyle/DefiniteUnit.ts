/**
 * Created by PengYuJing on 2020-04-22  9:27.
 * file description: 全局样式定值
 */

import {StyleSheet, Dimensions, Platform} from 'react-native'

const DefiniteUnit = {
  deviceHeight: Dimensions.get('window').height,
  deviceWidth: Dimensions.get('window').width,
  // 弧度
  borderRadiusBase: 6,
  borderRadius4: 4,
  // border的粗细
  borderWidthBase: StyleSheet.hairlineWidth * 2,
  borderWidthHair1: StyleSheet.hairlineWidth,
  // 左右内、外边距
  listMargin: 10,
  listPadding: 10,
  // 左右内、外边距
  listMargin15: 15,
  listPadding15: 15,
  primaryColor: '#1991FB',
  // 补充颜色
  purpleColor: '#9c27b0',
  //  字体大小
  defaultFontCategory: Platform.OS === 'android' ? 'p2' : 'p1',
}

export default DefiniteUnit
