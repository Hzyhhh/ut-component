import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  ColumnsBase,
  ColumnsType,
  DataSourceType,
  UTableCommonItemBase,
  UTableMethods,
} from './type'
import ItemRendered from './ItemRendered'
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native'

export interface UTableProps<T extends UTableCommonItemBase> {
  /**
   * 边框宽度
   */
  borderWidth?: number
  /**
   * 边框颜色
   */
  borderColor?: string
  /**
   * 刷新标题
   */
  refreshTitle?: string
  /**
   * 下拉刷新时
   */
  onRefresh?: () => Promise<void>
  /**
   * 当前刷新状态
   */
  loading?: boolean
  /**
   * 表单配置定义
   */
  columns: ColumnsType<T>
  /**
   * 当前票Id 存数据的主键
   */
  ticketId?: string
  wrapperComponentRef?: React.Ref<UTableMethods<T>>
  persistKey?: string
  /**
   * TODO:
   * 允许选择 -> 表单前面多个复选框
   */
  enableSelect?: boolean
  /**
   * 表单主要信息
   */
  header: (instance?: UTableMethods<T>) => React.ReactElement
  /**
   * 底部信息
   */
  footer?: (instance?: UTableMethods<T>) => React.ReactElement
  /**
   * 外部定义弹窗提示方式
   */
  onToast?: (str: string) => void
  /**
   * 受控模式
   */
  value?: {
    [key: string]: DataSourceType<T>
  }
  onChange?: (v: {[key: string]: T[]}) => void

  /**
   * 外部触发事件
   */
  onTrigger?: (
    type: string,
    defaultParams: any,
    instance: UTableMethods<T>,
  ) => void

  children?: React.ReactElement
}

function UTable<T extends UTableCommonItemBase>(props: UTableProps<T>) {
  const {
    borderWidth,
    borderColor,
    loading = false,
    refreshTitle = 'refreshTitle',
    ticketId,
    wrapperComponentRef,
    // persistKey = 'UTable',
    value,
    columns: column,
    onToast,
    header,
    footer,
    onTrigger,
    onRefresh,
  } = props
  // const {setItem, getItem} = useAsyncStorage(persistKey);
  const [dataSource, setDataSource] = useState<{
    [key: string]: DataSourceType<T>
  }>({})
  const [columns, setColumns] = useState<ColumnsType<T>>({})
  const [UTableRef, setUTableRef] = useState<UTableMethods<T>>()
  const [refreshing, setRefreshing] = useState(false)

  useImperativeHandle(wrapperComponentRef, () => UTableRef!, [UTableRef])

  // 下拉刷新
  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await onRefresh?.()
    setRefreshing(false)
  }, [])

  /**
   *
   */
  const handleUpdateCurrentList = (key: string, item: T): T => {
    setDataSource(prevList => {
      const list = prevList[key]?.list ?? []
      list.splice(
        list.findIndex(i => i.id === item.id),
        1,
        item,
      )
      // handleSetCurrentOfflineItem({...prevList})
      return {...prevList}
    })
    return item
  }

  /**
   * 更新所有离线数据
   */
  // const handleSetCurrentOfflineItem = (item: {[key: string]: DataSourceType<T>}) => {
  //   const recoverMap = recoverOfflineData()
  //   recoverMap.set(ticketId, item)

  //   AsyncStorage.setItem(persistKey, JSON.stringify(Array.from(recoverMap.entries())))
  // }

  /**
   *  获取离线数据
   */
  // const handleCurrentOfflineList: (key: string) => T[] = (key) => {
  //   const recoverMap = recoverOfflineData()
  //   const payload = recoverMap.get(ticketId)
  //   return payload?.[key]?.list ?? []
  // }

  // const recoverOfflineData: () => Map<string, {[key: string]: DataSourceType<T>}> = () => {
  //   let map = new Map<string, {[key: string]: DataSourceType<T>}>()

  //   AsyncStorage.getItem(persistKey, (err, str) => {
  //     if (err) {
  //       onToast?.(err.message)
  //       return
  //     }
  //     if (!str) {
  //       onToast?.(persistKey + ' 不存在缓存数据')
  //     }
  //     console.log('str', persistKey, str)

  //     const parseData = str ? JSON.parse(str) : new Map()
  //     console.log('parseData', parseData)
  //     map = new Map(parseData)
  //   })
  //   return map
  // }

  /**
   * 渲染表单主要信息
   */
  const renderHeader: () => React.ReactElement = useCallback(() => {
    if (header) {
      return header(UTableRef)
    }
    return <></>
  }, [UTableRef])

  /**
   * 渲染表单底部信息
   */
  const renderFooter: () => React.ReactElement = useCallback(() => {
    if (footer) {
      return (
        <View
          style={{borderTopWidth: borderWidth ?? 1, borderTopColor: '#ccc'}}>
          {footer(UTableRef)}
        </View>
      )
    }
    return (
      <View
        style={{borderTopWidth: borderWidth ?? 1, borderTopColor: '#ccc'}}
      />
    )
  }, [UTableRef])

  useEffect(() => {
    // const coverMap = recoverOfflineData()
    setColumns(column)
    if (value) {
      setDataSource(value)

      // handleSetCurrentOfflineItem(value)
    }
    // else {
    // if (coverMap.get(ticketId)) {
    //   setDataSource(coverMap.get(ticketId)!)
    // }
    // }
  }, [value, column, ticketId])

  // 数据变动时将钩子方法更新
  useEffect(() => {
    setUTableRef({
      getList: (key: string) => dataSource?.[key]?.list,
      // getCurrentOfflineList: handleCurrentOfflineList,
      setItem: handleUpdateCurrentList,
      trigger: (...params) => onTrigger?.(...params, UTableRef!),
    })
  }, [dataSource])

  useEffect(() => {
    setRefreshing(loading)
  }, [loading])

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          title={refreshTitle}
          onRefresh={handleRefresh}
        />
      }>
      <View style={styles.container}>
        {renderHeader()}
        <View style={{marginTop: -1}} />
        {Object.keys(dataSource).map(i => {
          return (
            <ItemRendered
              key={i}
              borderWidth={borderWidth}
              borderColor={borderColor}
              instance={UTableRef}
              title={dataSource[i]?.title}
              dataSource={dataSource[i]?.list}
              column={columns?.[i]}
              // header={dataSource[i].header}
              // footer={dataSource[i].footer}
            />
          )
        })}
        {renderFooter()}
      </View>
    </ScrollView>
  )
}

export default UTable

export function createProps<T extends {}>(
  props: ColumnsBase<T>[],
): ColumnsBase<T>[] {
  return props
}

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 12},
})
