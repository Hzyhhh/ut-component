import React, {FC} from 'react'
import {
  MenuItem as _MenuItem,
  MenuItemProps as _MenuItemProps,
  Text,
  TextProps,
} from '@ui-kitten/components'
import {RenderProp} from '@ui-kitten/components/devsupport'

export interface MenuItemProps extends Omit<_MenuItemProps, 'title'> {
  // 重写 title 类型
  title?: React.ReactElement
}

export const MenuItem: FC<MenuItemProps> = props => {
  const _title: RenderProp<TextProps> = titleProps => (
    <Text {...titleProps}>{props.title}</Text>
  )

  return <_MenuItem {...props} title={_title} />
}

export default MenuItem
