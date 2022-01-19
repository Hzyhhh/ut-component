import {Icon, useTheme, Text, useStyleSheet} from '@ui-kitten/components'
import React, {FC, useMemo} from 'react'
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native'
import {MainStyle} from '../../MainStyle'
import {FormatTime} from '../../utils'
import {styles} from '../styles'

/**
 * 从外部控制点击事件的组件, 解决以下问题：
 * 1. 跳转到新路由展示数据
 * 2. 某些搜索组件不能满足现场要求，定制功能
 */

export interface NavigatorSelectProps {
  placeholderText?: string
  title: string
  error?: any[]

  value?: any
  onClick?: () => void
}

const NavigatorSelect: FC<NavigatorSelectProps> = props => {
  const {title, value, error, onClick, placeholderText} = props
  const pageStyle = useStyleSheet(styles)

  const theme = useTheme()

  const handleSelect = () => {
    onClick?.()
  }

  const formatValue = useMemo(() => {
    switch (Object.prototype.toString.call(value)) {
      case '[object Date]':
        return FormatTime(value, 'yyyy-MM-dd HH:mm')

      default:
        return value
    }
  }, [value])

  return (
    <View style={{marginBottom: 13}}>
      <View style={MainStyle.rowStartStart}>
        <Icon
          name="chevron-right"
          pack={'feather'}
          style={pageStyle.itemIcon}
        />
        <View style={{flex: 1}}>
          <Text
            style={StyleSheet.flatten([pageStyle.itemTitle, {marginLeft: 5}])}
            appearance={'hint'}>
            {title}:
          </Text>

          <TouchableOpacity onPress={handleSelect}>
            <View
              style={[
                MainStyle.rowBetweenCenter,
                pageStyle.searchParamView,
                {marginLeft: 5},
              ]}>
              <TextInput
                keyboardType="default"
                style={[pageStyle.searchInput, {flex: 1}]}
                placeholder={placeholderText}
                placeholderTextColor={theme['text-hint-color']}
                underlineColorAndroid="transparent"
                multiline
                value={formatValue}
                editable={false}
              />
              <Icon
                name="chevron-right"
                pack={'feather'}
                style={{
                  color: theme['color-basic-500'],
                  fontSize: 20,
                }}
              />
            </View>
          </TouchableOpacity>
          {!!error?.length && (
            <Text
              style={StyleSheet.flatten([pageStyle.errorText, {marginLeft: 5}])}
              status="danger">
              {error.join('')}
            </Text>
          )}
        </View>
      </View>
    </View>
  )
}

NavigatorSelect.displayName = 'NavigatorSelect'

export default NavigatorSelect
