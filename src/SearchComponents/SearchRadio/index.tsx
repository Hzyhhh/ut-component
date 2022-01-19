import {
  Icon,
  Radio,
  RadioGroup,
  Text,
  useStyleSheet,
} from '@ui-kitten/components'
import React, {FC, useEffect, useState} from 'react'
import {View} from 'react-native'
import {MainStyle} from '../../MainStyle'
import {styles} from '../styles'

export interface SearchRadioProps {
  title: string
  radioList: {value: string; title: string}[]
  selectedValue?: string
  onChange?: (value: any) => void
}

/**
 * 单选
 */
const SearchRadio: FC<SearchRadioProps> = props => {
  const {title, radioList, selectedValue, onChange} = props
  const pageStyle = useStyleSheet(styles)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleChange = (index: number) => {
    setSelectedIndex(index)

    if (onChange) {
      onChange(radioList?.[index].value)
    }
  }

  useEffect(() => {
    const index = radioList.findIndex(item => item.value === selectedValue)
    setSelectedIndex(index >= 0 ? index : 0)
  }, [radioList, selectedValue])

  return (
    <View style={[MainStyle.rowStartStart, {marginBottom: 13}]}>
      <Icon name="chevron-right" pack={'feather'} style={pageStyle.itemIcon} />
      <View style={pageStyle.itemRight}>
        <Text style={[pageStyle.itemTitle]} appearance={'hint'}>
          {title}:
        </Text>
        <View style={[pageStyle.searchParamView, MainStyle.rowStartCenter]}>
          <RadioGroup
            style={[
              MainStyle.rowStartCenter,
              {flexWrap: 'wrap', paddingBottom: 5},
            ]}
            selectedIndex={selectedIndex}
            onChange={handleChange}>
            {radioList.map(i => {
              return <Radio key={i.value}>{i.title}</Radio>
            })}
          </RadioGroup>
        </View>
      </View>
    </View>
  )
}

SearchRadio.displayName = 'SearchRadio'

export default SearchRadio
