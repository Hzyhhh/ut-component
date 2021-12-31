import UTable, {UTableProps} from './UTable'
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

// @ts-ignore
UTable.ItemRendered = ItemRendered

export {UTable, ItemRendered}
export default UTable
