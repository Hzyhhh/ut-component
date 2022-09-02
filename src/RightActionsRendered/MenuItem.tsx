import React, {FC, useContext} from 'react'
import {
  MenuItem as _MenuItem,
  MenuItemProps as _MenuItemProps,
} from '@ui-kitten/components'
import {MenuItemDescriptor} from '@ui-kitten/components/ui/menu/menu.service'
import {GestureResponderEvent} from 'react-native'
import RightRenderedWrapper from './Context'

export interface MenuItemProps extends _MenuItemProps {}

export const MenuItem: FC<MenuItemProps> = props => {
  const context = useContext(RightRenderedWrapper)

  const handlePress = (
    descriptor: MenuItemDescriptor,
    event?: GestureResponderEvent,
  ) => {
    context.switch?.()
    props.onPress?.(descriptor, event)
  }

  return <_MenuItem {...props} onPress={handlePress} />
}

export default MenuItem
