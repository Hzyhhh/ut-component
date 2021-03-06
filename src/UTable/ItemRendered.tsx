import React, {useMemo, useState, useCallback} from 'react'
import {
  Dimensions,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {Cell, Row, Table, TableWrapper} from '../table-component'
import {
  ElementCellRendered,
  ElementTitleCellRendered,
  ItemRenderedProps,
  UTableCommonItemBase,
} from '../UTable'

function ItemRendered<T extends UTableCommonItemBase>(
  props: ItemRenderedProps<T>,
) {
  const {
    title,
    dataSource,
    column,
    borderWidth = 0.5,
    borderColor = '#ccc',
    instance: ref,
  } = props
  const [innerHeight, setInnerHeight] = useState(0)
  const [isFirstRender, setIsFirstRender] = useState(true)
  /**
   * 表单头部渲染
   */
  const renderElementTitleCell: ElementTitleCellRendered<T> = (
    columnData,
    index,
  ) => {
    return (
      <View style={[styles.titleCellWrapper]}>
        {columnData.title ? (
          <Text style={styles.headerTitle}>{columnData.title}</Text>
        ) : (
          columnData.render?.({} as T, index, ref)
        )}
      </View>
    )
  }

  /**
   * hack
   */
  const handleLayoutChange = useCallback(
    (e: LayoutChangeEvent) => {
      if (isFirstRender) {
        setIsFirstRender(false)
        setInnerHeight(e.nativeEvent.layout.height)
      }
    },
    [isFirstRender],
  )

  /**
   * 表单项渲染
   */
  const renderElementCell: ElementCellRendered<T> = useCallback(
    (columnData, columnConfig, index) => {
      const alignItems =
        columnConfig?.align === 'center'
          ? 'center'
          : columnConfig?.align === 'right'
          ? 'flex-end'
          : 'flex-start'

      return columnConfig.render ? (
        <View
          onLayout={handleLayoutChange}
          style={{
            paddingVertical: columnConfig?.padding ?? 8,
            alignItems,
            justifyContent: 'center',
            flex: 1,
          }}>
          {columnConfig.render(columnData, index, ref, {innerHeight})}
          {columnConfig.footer && columnConfig.footer?.(columnData, index, ref)}
        </View>
      ) : (
        <View
          style={{
            alignItems,
            justifyContent: 'center',
            flex: 1,
          }}>
          {columnConfig?.dataIndex && (
            <Text style={{padding: 8, flexGrow: columnConfig.footer ? 1 : 0}}>
              {columnData[columnConfig?.dataIndex]}
            </Text>
          )}
          {columnConfig.footer && columnConfig.footer?.(columnData, index, ref)}
        </View>
      )
    },
    [innerHeight],
  )

  const isHorizontalScroll: boolean = useMemo(() => {
    return (
      column.reduce((prev, curr) => prev + (curr?.width ?? 60), 0) >
      Dimensions.get('window').width
    )
  }, [column])

  return (
    <ScrollView horizontal={isHorizontalScroll}>
      {/* 表单渲染 */}
      <Table
        borderStyle={{
          borderWidth,
          borderColor,
        }}>
        {!!title && (
          <TableWrapper style={[styles.row, styles.formBackground]}>
            {/* 标题 */}
            <Row
              style={styles.formTitleWrapper}
              textStyle={styles.formTitle}
              data={[title]}
            />
          </TableWrapper>
        )}

        {column.every(i => !!i.title) && (
          <TableWrapper style={[styles.row, styles.formBackground]}>
            {/* 表头 */}
            {column.map((rowData, index) => {
              return (
                <Cell
                  key={rowData.dataIndex}
                  width={rowData.width}
                  data={renderElementTitleCell(rowData, index)}
                />
              )
            })}
          </TableWrapper>
        )}

        {/* 表格 */}
        {dataSource?.map(rowData => (
          <TableWrapper key={rowData.id ?? rowData.sortId} style={styles.row}>
            {/* 表项 */}
            {column.map((colConfig, index) => {
              return (
                <Cell
                  key={`${rowData.id ?? rowData.sortId}-${index}`}
                  width={colConfig.width}
                  data={renderElementCell(rowData, colConfig, index)}
                />
              )
            })}
          </TableWrapper>
        ))}

        {/* 这里规定常规表单项(有表头、有标题)没数据的情况才显示暂无数据 */}
        {!dataSource?.length && !!title && column.every(i => !!i.title) && (
          <TableWrapper style={styles.row}>
            <Row
              style={styles.formTitleWrapper}
              textStyle={styles.formTitle}
              data={['暂无数据']}
            />
          </TableWrapper>
        )}
      </Table>
    </ScrollView>
  )
}

export default ItemRendered

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 16},
  row: {flexDirection: 'row'},
  formBackground: {
    backgroundColor: '#ffffff',
  },
  formTitleWrapper: {
    flex: 1,
  },
  formTitle: {
    paddingVertical: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleCellWrapper: {
    paddingVertical: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
  },
})
