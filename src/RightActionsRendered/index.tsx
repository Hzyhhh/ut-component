import {
  MenuItem,
  MenuItemProps,
  OverflowMenu,
  TopNavigationAction,
  useTheme,
  Icon,
  IconProps,
} from '@ui-kitten/components';
import {ChildrenWithProps} from '@ui-kitten/components/devsupport';
import MainStyle from '../MainStyle';
import React, {FC, forwardRef, useImperativeHandle, useState} from 'react';

/* ...icon */
const MoreHorizontalIcon: FC<IconProps> = props => (
  <Icon {...props} name="more-horizontal" pack={'feather'} />
);

interface RightActionsRenderedProps {
  children: ChildrenWithProps<MenuItemProps>;
}
export interface RightActionsRenderedMethods {
  switch: () => void;
}

const _RightActionsRendered = forwardRef<
  RightActionsRenderedMethods,
  RightActionsRenderedProps
>((props, ref) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const theme = useTheme();

  useImperativeHandle(ref, () => ({
    switch: () => setMenuVisible(false),
  }));

  return (
    <OverflowMenu
      anchor={() => (
        <TopNavigationAction
          icon={props => (
            <MoreHorizontalIcon
              {...props}
              style={{fontSize: 22, color: theme['color-basic-100']}}
            />
          )}
          onPress={() => setMenuVisible(v => !v)}
          style={MainStyle.headerRight}
        />
      )}
      visible={menuVisible}
      onBackdropPress={() => setMenuVisible(v => !v)}
      backdropStyle={MainStyle.overFlowMenuBackdropColor}>
      {props.children}
    </OverflowMenu>
  );
});

export interface SelfRightActionsRenderedProps
  extends RightActionsRenderedProps {
  wrapperComponentRef?: React.Ref<RightActionsRenderedMethods>;
}

function RightActionsRendered(props: SelfRightActionsRenderedProps) {
  const {wrapperComponentRef, ...other} = props;

  return <_RightActionsRendered {...other} ref={wrapperComponentRef} />;
}

RightActionsRendered.MenuItem = MenuItem;

export default RightActionsRendered;
