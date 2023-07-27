import {
  MenuItemProps,
  OverflowMenu,
  TopNavigationAction,
  useTheme,
  Icon,
  IconProps,
} from '@ui-kitten/components'
import {ChildrenWithProps} from '@ui-kitten/components/devsupport'
import MainStyle from '../MainStyle'
import React, {FC, useMemo, useRef} from 'react'
import MenuItem from './MenuItem'
import {MenuItemDescriptor} from '@ui-kitten/components/ui/menu/menu.service'
import {GestureResponderEvent} from 'react-native'

/* ...icon */
const MoreHorizontalIcon: FC<IconProps> = props => (
  <Icon {...props} name="more-horizontal" pack={'feather'} />
)

interface RightActionsRenderedProps {
  children: ChildrenWithProps<MenuItemProps>
}
export interface RightActionsRenderedMethods {
  switch?: () => void
}

const _RightActionsRendered: FC<RightActionsRenderedProps> = props => {
  const theme = useTheme()
  const _overflowMenuRef = useRef<OverflowMenu>(null)

  const iconStyled = useMemo(
    () => ({fontSize: 22, color: theme['color-basic-100']}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  const menuItems = React.Children.map(props.children, element => {
    if (!React.isValidElement<MenuItemProps>(element)) {
      return element
    }
    const paneClick = (
      descriptor: MenuItemDescriptor,
      event?: GestureResponderEvent,
    ) => {
      _overflowMenuRef.current?.hide()

      element.props?.onPress?.(descriptor, event)
    }
    return React.cloneElement(element, {
      ...element.props,
      onPress: paneClick,
    })
  })

  return (
    <OverflowMenu
      ref={_overflowMenuRef}
      anchor={() => (
        <TopNavigationAction
          icon={iconProps => (
            <MoreHorizontalIcon {...iconProps} style={iconStyled} />
          )}
          onPress={() => _overflowMenuRef.current?.show()}
          style={MainStyle.headerRight}
        />
      )}
      onBackdropPress={() => _overflowMenuRef.current?.hide()}
      backdropStyle={MainStyle.overFlowMenuBackdropColor}>
      {menuItems as React.ReactElement<MenuItemProps>[]}
    </OverflowMenu>
  )
}

function RightActionsRendered(props: RightActionsRenderedProps) {
  return <_RightActionsRendered {...props} />
}

RightActionsRendered.MenuItem = MenuItem

export default RightActionsRendered
