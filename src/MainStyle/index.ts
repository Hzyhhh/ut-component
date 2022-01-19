/**
 * file description:
 */
import {StyleSheet} from 'react-native'
import DefiniteUnit from './DefiniteUnit'

const MainStyle = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  rowStartStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  columnStartStart: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  rowStartCenter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  columnStartCenter: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rowCenterStart: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  columnCenterStart: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rowStartStretch: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  columnStartStretch: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  rowCenterCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnCenterCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBetweenCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowBetweenStart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  /* Header右边一个按钮 */
  headerLeft: {
    marginLeft: -7,
    marginVertical: -8,
    minWidth: 50,
    paddingHorizontal: 10,
    height: 56,
    justifyContent: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: -7,
    marginVertical: -8,
    minWidth: 50,
    paddingHorizontal: 10,
    height: 56,
  },
  /* Header右上角popover menu的背景色 */
  overFlowMenuBackdropColor: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
})

export default MainStyle

export {MainStyle, DefiniteUnit}
