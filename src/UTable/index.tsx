import UTable, {createProps, UTableProps} from './UTable'
import ItemRendered from './ItemRendered'
import {
  UTableCommonItemBase,
  ColumnsBase,
  UTableMethods,
  ItemRenderedProps,
  ElementCellRendered,
  ElementTitleCellRendered,
  DataSourceType,
  ColumnsType,
} from './type'
import React from 'react'

export type {UTableProps}

export type {
  UTableCommonItemBase,
  ColumnsBase,
  UTableMethods,
  ItemRenderedProps,
  ElementCellRendered,
  ElementTitleCellRendered,
  DataSourceType,
  ColumnsType,
}

export default class _UTable<T extends {}> extends React.Component<
  UTableProps<T>
> {
  public static createProps = createProps
  public static ItemRendered = ItemRendered
  render() {
    return <UTable {...this.props} />
  }
}
