import {Icon, Text, useStyleSheet, useTheme} from '@ui-kitten/components'
import React, {FC} from 'react'
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native'
import {MainStyle} from '../../MainStyle'
import {styles} from '../styles'

export interface SearchInputProps extends Omit<TextInputProps, 'onChange'> {
  title: string
  titleStyle?: StyleProp<TextStyle>
  secureTextEntry?: boolean
  multiline?: boolean
  value?: string
  onChange?: (text: string) => void
  placeholderText?: string
  editable?: boolean
  keyboardType?: KeyboardTypeOptions
  error?: any[]
}

/** 输入框 */
const SearchInput: FC<SearchInputProps> = props => {
  const {
    title,
    titleStyle = null,
    secureTextEntry = false,
    multiline = true,
    value,
    onChange,
    placeholderText,
    editable = true,
    keyboardType = 'default',
    error = [],
    ...restProps
  } = props
  const theme = useTheme()
  const pageStyle = useStyleSheet(styles)
  return (
    <View style={[MainStyle.rowStartStart, {marginBottom: 13}]}>
      <Icon name="chevron-right" pack={'feather'} style={pageStyle.itemIcon} />
      <View style={pageStyle.itemRight}>
        <Text
          style={StyleSheet.flatten([pageStyle.itemTitle, titleStyle])}
          appearance={'hint'}>
          {title}:
        </Text>
        <TextInput
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          style={[pageStyle.searchParamView, pageStyle.searchInput]}
          placeholder={placeholderText}
          placeholderTextColor={theme['text-hint-color']}
          underlineColorAndroid="transparent"
          multiline={multiline}
          value={value}
          editable={editable}
          onChangeText={onChange}
          {...restProps}
        />
        {!!error?.length && (
          <Text style={pageStyle.errorText} status="danger">
            {error.join('')}
          </Text>
        )}
      </View>
    </View>
  )
}

SearchInput.displayName = 'SearchInput'

export default SearchInput
