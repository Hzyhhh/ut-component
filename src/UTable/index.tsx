import React from 'react'

import UTable, {createProps, UTableProps} from './UTable'
import ItemRendered from './ItemRendered'

import {useImproveSuggestTable} from './hooks'

import {
  UTableCommonItemBase,
  ColumnsBase,
  UTableMethods,
  ItemRenderedProps,
  ElementCellRendered,
  ElementTitleCellRendered,
  DataSourceType,
  ColumnsType,
  TriggerFunction,
} from './type'
import * as UTableTypes from './type'

/**
 * 导出hooks
 */
export {useImproveSuggestTable}

/**
 * 导出类型
 */
export type {
  // 全局类型
  UTableTypes,
  // 局部类型
  UTableProps,
  UTableCommonItemBase,
  ColumnsBase,
  UTableMethods,
  ItemRenderedProps,
  ElementCellRendered,
  ElementTitleCellRendered,
  DataSourceType,
  ColumnsType,
  TriggerFunction,
}

/**
 * 组件导出
 */
export default class _UTable<T extends {}> extends React.Component<
  UTableProps<T>
> {
  public static createProps = createProps
  public static ItemRendered = ItemRendered
  render() {
    return <UTable {...this.props} />
  }
}
