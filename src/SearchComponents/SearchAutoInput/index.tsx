import {
  Autocomplete,
  AutocompleteItem,
  Icon,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components'
import React, {FC, useEffect} from 'react'
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
} from 'react-native'
import {MainStyle} from '../../MainStyle'
import {styles} from '../styles'

export interface AutoItemType {
  title: string
  value: string
}

export interface SearchAutoInputProps {
  title: string
  titleStyle?: StyleProp<TextStyle>
  autoList: AutoItemType[]
  value?: string
  onChange?: (val: string) => void
  placeholderText?: string
  editable?: boolean
  keyboardType?: KeyboardTypeOptions
  disabled?: boolean
}

/** 自动填补输入框 */
export const SearchAutoInput: FC<SearchAutoInputProps> = ({
  title,
  titleStyle = null,
  autoList,
  value,
  onChange,
  placeholderText,
  editable = true,
  keyboardType = 'default',
  disabled = false,
}) => {
  const theme = useTheme()
  const pageStyle = useStyleSheet(styles)

  const [currentValue, setCurrentValue] = React.useState(value)
  const [data, setData] = React.useState(autoList)

  const filter = (item: AutoItemType, query: string) =>
    item.title.toLowerCase().includes(query.toLowerCase())

  const onSelect = (index: number) => {
    setCurrentValue(autoList[index].title)
    onChange?.(autoList[index].title)
  }

  const handleChangeText = (val: string) => {
    setCurrentValue(val)
    setData(autoList.filter(item => filter(item, val)))
    onChange?.(val)
  }

  const renderOption = (item: AutoItemType, index: number) => (
    <AutocompleteItem key={index} title={item.title} />
  )

  useEffect(() => {
    setCurrentValue(value)
    setData(autoList)
  }, [autoList, value])

  return (
    <View style={[MainStyle.rowStartStart, {marginBottom: 13}]}>
      <Icon name="chevron-right" pack={'feather'} style={pageStyle.itemIcon} />
      <View style={pageStyle.itemRight}>
        <Text
          style={StyleSheet.flatten([pageStyle.itemTitle, titleStyle])}
          appearance={'hint'}>
          {title}:
        </Text>
        <Autocomplete
          size="small"
          disabled={disabled}
          keyboardType={keyboardType}
          style={[pageStyle.searchParamView, pageStyle.searchInput]}
          placeholder={placeholderText}
          placeholderTextColor={theme['text-hint-color']}
          underlineColorAndroid="transparent"
          value={currentValue}
          editable={editable}
          onSelect={onSelect}
          onChangeText={handleChangeText}>
          {data.map(renderOption)}
        </Autocomplete>
      </View>
    </View>
  )
}

SearchAutoInput.displayName = 'SearchAutoInput'

export default SearchAutoInput
