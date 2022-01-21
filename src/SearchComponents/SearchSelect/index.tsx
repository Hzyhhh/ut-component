import {
  Icon,
  IndexPath,
  Select,
  SelectItem,
  SelectProps,
  Text,
  useStyleSheet,
} from '@ui-kitten/components'
import React, {FC, useEffect} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {MainStyle} from '../../MainStyle'
import {styles} from '../styles'

/**
 * 下拉选择框
 */
export interface SearchSelectOptionProps extends Omit<SelectProps, 'onSelect'> {
  // 回传值 resetFields时会传空
  value?: string
  // 标题
  title: string
  // 数据源
  list: {text: string; value: string}[]
  // 选择回调
  onSelect?: (value: string) => void
  // 校验错误信息
  error?: string[]
}

export const SearchSelectOption: FC<SearchSelectOptionProps> = props => {
  const {title, value, list = [], error, onSelect, ...other} = props
  const pageStyle = useStyleSheet(styles)
  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>(
    new IndexPath(-1),
  )

  useEffect(() => {
    if (value) {
      const idx = list.findIndex(i => i.value === value)
      if (idx > -1) {
        setSelectedIndex(new IndexPath(idx))
      }
    } else {
      setSelectedIndex(new IndexPath(-1))
    }
  }, [list, value])

  const handleSelect = (index: IndexPath | IndexPath[]) => {
    if (Array.isArray(index)) return

    setSelectedIndex(index)
    if (onSelect) {
      onSelect(list[index.row]?.value)
    }
  }

  return (
    <View style={[MainStyle.rowStartStart, {marginBottom: 13}]}>
      <Icon name="chevron-right" pack={'feather'} style={pageStyle.itemIcon} />
      <View style={pageStyle.itemRight}>
        <Text
          style={[pageStyle.itemTitle, {marginBottom: 5}]}
          appearance={'hint'}>
          {title}:
        </Text>
        <View
          style={[
            pageStyle.searchParamView,
            MainStyle.rowStartCenter,
            {flexWrap: 'wrap', paddingBottom: 5},
          ]}>
          <Select
            {...other}
            style={StyleSheet.flatten([
              {width: '100%'},
              MainStyle.rowCenterCenter,
            ])}
            size="small"
            status={error?.length ? 'danger' : 'basic'}
            value={list[selectedIndex?.row]?.text}
            accessoryRight={
              selectedIndex.row > -1 ? (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedIndex(new IndexPath(-1))
                  }}>
                  <Icon
                    name="x"
                    pack={'feather'}
                    style={StyleSheet.flatten([
                      pageStyle.itemIcon,
                      {color: 'red', marginLeft: 2},
                    ])}
                  />
                </TouchableOpacity>
              ) : undefined
            }
            onSelect={handleSelect}>
            {list.map(i => (
              <SelectItem key={i.value} title={i.text} />
            ))}
          </Select>
        </View>
        {!!error?.length && (
          <Text style={pageStyle.errorText} status="danger">
            {error.join('')}
          </Text>
        )}
      </View>
    </View>
  )
}

SearchSelectOption.displayName = 'SearchSelectOption'

export default SearchSelectOption
