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
import React, {FC, forwardRef, useMemo, useRef} from 'react'
import RightRenderedWrapper from './Context'
import MenuItem from './MenuItem'

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

const _RightActionsRendered = forwardRef<
  RightActionsRenderedMethods,
  RightActionsRenderedProps
>((props, ref) => {
  const theme = useTheme()
  const _overflowMenuRef = useRef<OverflowMenu>(null)

  const value = useMemo(() => {
    return {switch: () => _overflowMenuRef.current?.hide}
  }, [])

  const iconStyled = useMemo(
    () => ({fontSize: 22, color: theme['color-basic-100']}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <RightRenderedWrapper.Provider value={value}>
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
        {props.children}
      </OverflowMenu>
    </RightRenderedWrapper.Provider>
  )
})

export interface SelfRightActionsRenderedProps
  extends RightActionsRenderedProps {
  wrapperComponentRef?: React.Ref<RightActionsRenderedMethods>
}

function RightActionsRendered(props: SelfRightActionsRenderedProps) {
  const {wrapperComponentRef, ...other} = props

  return <_RightActionsRendered {...other} ref={wrapperComponentRef} />
}

RightActionsRendered.MenuItem = MenuItem

export default RightActionsRendered
