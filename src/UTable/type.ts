import React, {ReactElement} from 'react';

export interface UTableCommonItemBase {
  id: string;
  sortId: number;
  /**
   * 未完成 未上传 => 未执行
   * 已完成 未上传 => 离线已执行
   * 未完成 已上传 => 不存在这种情况
   * 已完成 已上传 => 已调接口执行
   */
  isFinished: boolean;
  isUploaded: boolean;

  /**
   * Other
   */
  [key: string]: any;
}
export interface ColumnsBase<T extends UTableCommonItemBase> {
  /**
   * 数据字段
   */
  dataIndex: string;
  /**
   * 表头
   */
  title?: string | React.ReactNode;
  /**
   *  对齐
   */
  align?: 'center' | 'left' | 'right';
  /**
   * 宽度
   */
  width?: number;
  /**
   * 自定义渲染
   */
  render?: (
    row: T,
    index?: number,
    instance?: UTableMethods<T>,
  ) => React.ReactElement;
}

export interface UTableMethods<T> {
  getList: () => T[];
}

export interface ItemRenderedProps<T extends UTableCommonItemBase> {
  title?: string;
  dataSource: T[];
  column: ColumnsBase<T>[];
  instance?: UTableMethods<T>;
}

export type ElementCellRendered<T extends UTableCommonItemBase> = (
  columnData: T,
  columnConfig: ColumnsBase<T>,
  index: number,
) => ReactElement;

export type ElementTitleCellRendered<T extends UTableCommonItemBase> = (
  columnData: ColumnsBase<T>,
  index: number,
) => React.ReactElement;
