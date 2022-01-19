import {Icon, Layout, Text, useStyleSheet} from '@ui-kitten/components'
import React, {FC} from 'react'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native'
import {MainStyle} from '../../MainStyle'
import {styles} from '../styles'

export interface TagType {
  value: string
  text: string
}

export interface SearchTagsProps {
  title: string
  titleStyle?: StyleProp<TextStyle>
  tagList?: TagType[]
  selectedValue?: string
  onChange?: (value: string) => void
}

/** 标签选择 */
export const SearchTags: FC<SearchTagsProps> = ({
  title,
  titleStyle = null,
  tagList = [],
  selectedValue,
  onChange,
}) => {
  const pageStyle = useStyleSheet(styles)
  return (
    <View style={[MainStyle.rowStartStart, {marginBottom: 13}]}>
      <Icon name="chevron-right" pack={'feather'} style={pageStyle.itemIcon} />
      <View style={pageStyle.itemRight}>
        <Text
          style={StyleSheet.flatten([
            pageStyle.itemTitle,
            {marginBottom: 5},
            titleStyle,
          ])}
          appearance={'hint'}>
          {title}:
        </Text>
        <View
          style={[
            pageStyle.searchParamView,
            MainStyle.rowStartCenter,
            {flexWrap: 'wrap', paddingBottom: 5},
          ]}>
          {tagList.map((tag, index) => (
            <SearchTagItem
              tag={tag}
              key={index + tag.value + '_SearchTagItem'}
              selectedValue={selectedValue}
              onChoose={onChange}
            />
          ))}
        </View>
      </View>
    </View>
  )
}

const SearchTagItem: FC<{
  tag: TagType
  selectedValue?: SearchTagsProps['selectedValue']
  onChoose?: SearchTagsProps['onChange']
}> = ({tag, selectedValue, onChoose}) => {
  const pageStyle = useStyleSheet(styles)
  const selectedStyle =
    selectedValue === tag.value ? pageStyle.selectedTag : null
  return (
    <TouchableOpacity
      style={pageStyle.tag}
      activeOpacity={0.5}
      onPress={() => onChoose?.(tag.value)}>
      <Layout
        level={'3'}
        style={StyleSheet.flatten([pageStyle.tagIn, selectedStyle])}>
        <Text style={pageStyle.tagValue}>{tag.text}</Text>
      </Layout>
    </TouchableOpacity>
  )
}

SearchTags.displayName = 'SearchTags'

export default SearchTags
