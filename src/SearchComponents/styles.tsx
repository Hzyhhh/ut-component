import {StyleService} from '@ui-kitten/components'
import {DefiniteUnit} from '../MainStyle'

export const styles = StyleService.create({
  itemIcon: {
    color: 'color-primary-500',
    fontSize: 20,
    marginLeft: -6,
  },
  itemRight: {
    flex: 1,
    marginLeft: 5,
  },
  itemTitle: {
    fontSize: 14,
    // minWidth: 56,
    // paddingTop: 9,
  },
  searchParamView: {
    // flex: 1,
    borderBottomWidth: DefiniteUnit.borderWidthBase,
    borderBottomColor: 'border-basic-color-5',
  },
  searchInput: {
    fontSize: 14,
    color: 'text-basic-color',
    paddingHorizontal: 0,
    paddingVertical: 5,
    marginVertical: 0,
  },
  searchAutoComplete: {
    fontSize: 14,
    color: 'text-basic-color',
    paddingHorizontal: 0,
    paddingVertical: 5,
    marginVertical: 0,
    borderColor: 'transparent',
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  searchAutoCompleteText: {
    marginLeft: -7,
    paddingHorizontal: 0,
    fontSize: 14,
  },
  placeText: {
    fontSize: 14,
    color: 'color-basic-500',
  },
  searchSelect: {
    paddingVertical: 10,
  },
  chevronIcon: {
    color: 'color-basic-500',
    fontSize: 22,
  },
  searchValueText: {
    fontSize: 14,
  },
  tag: {
    width: '33.3%',
    paddingRight: 7,
    paddingVertical: 5,
  },
  tagIn: {
    padding: 6,
    borderRadius: 3,
  },
  tagValue: {
    fontSize: 12,
    textAlign: 'center',
  },
  selectedTag: {
    backgroundColor: 'color-primary-transparent-400',
  },
  timeResetIcon: {
    color: 'color-danger-500',
    fontSize: 20,
    paddingLeft: 15,
  },
  errorText: {
    fontSize: 12,
  },
})
