import {Layout} from '@ui-kitten/components'
import React, {FC} from 'react'
import {StyleSheet} from 'react-native'

export interface SearchBaseProps {}

/**
 * 这个组件应该用来布局
 */

const SearchBase: FC<SearchBaseProps> = props => {
  return (
    <Layout level="1" style={StyleSheet.flatten([styles.layoutWrapper])}>
      {props.children}
    </Layout>
  )
}

SearchBase.displayName = 'SearchBase'

export default SearchBase

const styles = StyleSheet.create({
  layoutWrapper: {
    paddingHorizontal: 16,
    paddingTop: 13,
  },
})
