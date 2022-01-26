import React, {ReactElement} from 'react'

export interface UTableCommonItemBase {
  id?: string
  sortId?: number
  /**
   * 未完成 未上传 => 未执行
   * 已完成 未上传 => 离线已执行
   * 未完成 已上传 => 不存在这种情况
   * 已完成 已上传 => 已调接口执行
   */
  isFinished?: boolean
  isUploaded?: boolean

  /**
   * Other
   */
  [key: string]: any
}
export interface ColumnsBase<T extends {}> {
  /**
   * 数据字段
   */
  dataIndex?: string
  /**
   * 表头
   */
  title?: string | React.ReactNode
  /**
   * padding
   */
  padding?: number
  /**
   *  对齐
   */
  align?: 'center' | 'left' | 'right'
  /**
   * 宽度
   */
  width?: number
  /**
   * 自定义渲染
   */
  render?: (
    row: T,
    index?: number,
    instance?: UTableMethods<T>,
    option?: {innerHeight: number},
  ) => React.ReactElement

  /**
   * 底部渲染
   */
  footer?: (
    row: T,
    index?: number,
    instance?: UTableMethods<T>,
  ) => React.ReactElement
}

export interface UTableMethods<T> {
  getList: (key: string) => T[]
  getCurrentOfflineList?: (key: string) => T[]
  setItem: (key: string, item: T) => T
  /**
   *
   */
  trigger: (type: string, defaultParams: any) => void
}

export interface ItemRenderedProps<T extends UTableCommonItemBase> {
  title?: string
  dataSource: T[]
  column: ColumnsBase<T>[]
  instance?: UTableMethods<T>
  borderWidth?: number
  borderColor?: string

  header?: ColumnsBase<T>[]
  footer?: ColumnsBase<T>[]
  TableHeaderComponent?: () => React.ReactElement
  TableFooterComponent?: () => React.ReactElement
}

export type ElementCellRendered<T extends UTableCommonItemBase> = (
  columnData: T,
  columnConfig: ColumnsBase<T>,
  index: number,
) => ReactElement

export type ElementTitleCellRendered<T extends UTableCommonItemBase> = (
  columnData: ColumnsBase<T>,
  index: number,
) => React.ReactElement

export type ElementCustomRendered<T extends UTableCommonItemBase> = (
  columnData: ColumnsBase<T>,
) => React.ReactElement

export type TriggerFunction<T extends UTableCommonItemBase> = (
  type: string,
  defaultParams: any,
  instance: UTableMethods<T>,
) => void

export interface DataSourceType<T extends UTableCommonItemBase> {
  title?: string
  /**
   * 定义表单列表
   */
  list: T[]
  /**
   * 自定义该表单的头部(标题下一行)
   */
  header?: ColumnsBase<T>[]
  /**
   * 自定义该表单的底部
   */
  footer?: ColumnsBase<T>[]
}

export interface ColumnsType<T extends UTableCommonItemBase> {
  /**
   * 定义多个表单字段
   */
  [key: string]: ColumnsBase<T>[]
}
