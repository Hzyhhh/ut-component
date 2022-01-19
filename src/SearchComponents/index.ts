import SearchBase, {SearchBaseProps} from './SearchBase'
import SearchInput, {SearchInputProps} from './SearchInput'
import SearchRadio, {SearchRadioProps} from './SearchRadio'
import SearchSelect, {SearchSelectOptionProps} from './SearchSelect'
import SearchTags, {SearchTagsProps, TagType} from './SearchTags'
import SearchAutoInput, {
  SearchAutoInputProps,
  AutoItemType,
} from './SearchAutoInput'
import NavigatorSelect, {NavigatorSelectProps} from './NavigatorSelect'
import {styles as SearchComponentsStyles} from './styles'

export {
  SearchInput,
  SearchRadio,
  SearchSelect,
  SearchTags,
  SearchAutoInput,
  NavigatorSelect,
  SearchComponentsStyles,
}

export type {
  SearchBaseProps,
  SearchInputProps,
  SearchRadioProps,
  SearchSelectOptionProps,
  TagType,
  SearchTagsProps,
  SearchAutoInputProps,
  AutoItemType,
  NavigatorSelectProps,
}

const SearchComponent = Object.assign(SearchBase, {
  Input: SearchInput,
  Radio: SearchRadio,
  Select: SearchSelect,
  Tags: SearchTags,
  AutoInput: SearchAutoInput,
  NavigatorSelect,
})

export default SearchComponent
