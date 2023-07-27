import React, {useEffect, useImperativeHandle, useRef, useState} from 'react'
import {
  ColumnsBase,
  ColumnsType,
  DataSourceType,
  UTableCommonItemBase,
  UTableMethods,
} from './type'
import ItemRendered from './ItemRendered'
import {
  ColorValue,
  RefreshControl,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import {useMemoizedFn} from './hooks'

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
   * 是否展示下拉刷新
   */
  showRefresh?: boolean
  /**
   * 外部传入样式
   */
  style?: StyleProp<ViewStyle>
  /**
   * 刷新标题
   */
  refreshTitle?: string
  /**
   * 下拉loading颜色
   */
  refreshControlColor?: ColorValue
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
    showRefresh,
    loading = false,
    refreshTitle = 'refreshTitle',
    refreshControlColor = '',
    ticketId,
    wrapperComponentRef,
    value,
    columns: column,
    header,
    footer,
    onTrigger,
    onRefresh,
  } = props
  const [dataSource, setDataSource] = useState<{
    [key: string]: DataSourceType<T>
  }>({})
  const [columns, setColumns] = useState<ColumnsType<T>>({})
  const [UTableRef, setUTableRef] = useState<UTableMethods<T>>()
  const [refreshing, setRefreshing] = useState(false)
  const _scroll = useRef<ScrollView>(null)

  useImperativeHandle(wrapperComponentRef, () => UTableRef!, [UTableRef])

  // 下拉刷新
  const handleRefresh = useMemoizedFn(async () => {
    setRefreshing(true)
    await onRefresh?.()
    setRefreshing(false)
  })

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
   * 渲染表单主要信息
   */
  const renderHeader: () => React.ReactElement = useMemoizedFn(() => {
    if (header) {
      return header(UTableRef)
    }
    return <></>
  })

  /**
   * 渲染表单底部信息
   */
  const renderFooter: () => React.ReactElement = useMemoizedFn(() => {
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
  })

  useEffect(() => {
    setColumns(column)
    if (value) {
      setDataSource(value)
    }
  }, [value, column, ticketId])

  // 数据变动时将钩子方法更新
  useEffect(() => {
    setUTableRef({
      scrollTo: _scroll.current?.scrollTo,
      getList: (key: string) => dataSource?.[key]?.list,
      setItem: handleUpdateCurrentList,
      trigger: (...params) => onTrigger?.(...params, UTableRef!),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource])

  useEffect(() => {
    setRefreshing(loading)
  }, [loading])

  return (
    <ScrollView
      ref={_scroll}
      refreshControl={
        showRefresh ? (
          <RefreshControl
            colors={[refreshControlColor]}
            refreshing={refreshing}
            title={refreshTitle}
            onRefresh={handleRefresh}
          />
        ) : undefined
      }>
      <View
        style={StyleSheet.flatten([
          props.style,
          {
            marginLeft: borderWidth
              ? -borderWidth
              : styles.container.marginLeft,
          },
        ])}>
        {renderHeader()}
        <View style={{marginTop: -1}} />
        {Object.keys(dataSource).map(i => {
          return (
            <ItemRendered
              key={i}
              borderWidth={borderWidth}
              borderColor={borderColor}
              instance={UTableRef}
              dataSource={dataSource[i]}
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
  container: {
    marginLeft: -1,
  },
})
