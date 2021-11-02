// @ts-nocheck
import React, {Component} from 'react';
import {StyleProp, StyleSheetProperties, TextStyle, View, ViewStyle} from 'react-native';

export class Table extends Component<
  Partial<{style: StyleSheetProperties; borderStyle: TextStyle}>
> {
  _renderChildren(props) {
    return React.Children.map(props.children, child =>
      React.cloneElement(
        child,
        props.borderStyle && child.type.displayName !== 'ScrollView'
          ? {borderStyle: props.borderStyle}
          : {},
      ),
    );
  }

  render() {
    const {borderStyle} = this.props;
    const borderLeftWidth = (borderStyle && borderStyle.borderWidth) || 0;
    const borderBottomWidth = borderLeftWidth;
    const borderColor = (borderStyle && borderStyle.borderColor) || '#000';

    return (
      <View
        style={[
          this.props.style,
          {
            borderLeftWidth,
            borderBottomWidth,
            borderColor,
          },
        ]}>
        {this._renderChildren(this.props)}
      </View>
    );
  }
}

export class TableWrapper extends Component<
  Partial<{style: StyleProp<ViewStyle>}>
> {
  _renderChildren(props) {
    return React.Children.map(props.children, child =>
      React.cloneElement(
        child,
        props.borderStyle ? {borderStyle: props.borderStyle} : {},
      ),
    );
  }

  render() {
    const {style} = this.props;
    return <View style={style}>{this._renderChildren(this.props)}</View>;
  }
}
