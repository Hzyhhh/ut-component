import UTable from '../'
import {ColumnsBase, ColumnsType, DataSourceType} from '../type'

const useImproveSuggestTable = (keygen: string[]) => {
  /**
   * ts类型加持构造形如
   * {[key: string]: ColumnsBase<T>[]}的对象
   */
  function createColumnsConfig<T extends {}>(
    columnsConfig: ColumnsBase<T>[],
  ): ColumnsType<T> {
    const target: ColumnsType<T> = {}

    keygen.forEach(i => {
      target[i] = UTable.createProps<T>(columnsConfig)
    })

    return target
  }

  /**
   * 创建单个valueConfig对象
   */
  function createValueConfig<T extends {}>(
    key: string,
    options: DataSourceType<T>,
  ): {
    [key: string]: DataSourceType<T>
  } {
    const target: {
      [key: string]: DataSourceType<T>
    } = {}

    target[key] = options

    return target
  }

  /**
   * 合并valueConfig
   */
  function mergeValueConfig<T extends {}>(
    ...rest: {
      [key: string]: DataSourceType<T>
    }[]
  ): {
    [key: string]: DataSourceType<T>
  } {
    let target: {
      [key: string]: DataSourceType<T>
    } = {}

    rest.forEach(i => {
      target = {...target, ...i}
    })

    return target
  }

  return {createColumnsConfig, createValueConfig, mergeValueConfig}
}

export default useImproveSuggestTable
