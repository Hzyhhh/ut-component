import React, {useMemo, useState, useCallback} from 'react'
import {
  Dimensions,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {Cell, Col, Row, Table, TableWrapper} from '../table-component'
import {
  ElementCellRendered,
  ElementTitleCellRendered,
  ItemRenderedProps,
  UTableCommonItemBase,
} from './type'
import {useMemoizedFn} from './hooks'

function ItemRendered<T extends UTableCommonItemBase>(
  props: ItemRenderedProps<T>,
) {
  const {
    dataSource,
    column,
    borderWidth = 0.5,
    borderColor = '#ccc',
    instance: ref,
  } = props
  const {
    title,
    list,
    groupList,
    rowStyle,
    rowHeight = 40,
    rowBgColor = '#F7F9FC',
    titleRightRendered,
  } = dataSource || {}

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
  const handleLayoutChange = useMemoizedFn((e: LayoutChangeEvent) => {
    if (isFirstRender) {
      setIsFirstRender(false)
      setInnerHeight(e.nativeEvent.layout.height)
    }
  })

  /**
   * 表单项渲染
   */
  const renderElementCell: ElementCellRendered<T> = useMemoizedFn(
    (columnData, columnConfig, index) => {
      const alignItems =
        columnConfig?.align === 'left'
          ? 'flex-start'
          : columnConfig?.align === 'right'
          ? 'flex-end'
          : 'center'

      if (columnConfig?.renderText) {
        return (
          <View
            onLayout={handleLayoutChange}
            style={{
              alignItems,
              justifyContent: 'center',
              flex: 1,
            }}>
            <Text style={{padding: 8, flexGrow: columnConfig.footer ? 1 : 0}}>
              {columnConfig.renderText(columnData, index, ref, {innerHeight})}
            </Text>
            {columnConfig.footer?.(columnData, index, ref)}
          </View>
        )
      }

      return columnConfig?.render ? (
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
          {columnConfig?.footer?.(columnData, index, ref)}
        </View>
      )
    },
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
          <TableWrapper style={[styles.row, styles.formBackground, rowStyle]}>
            {/* 标题 */}
            <Row
              style={styles.formTitleWrapper}
              textStyle={styles.formTitle}
              data={[title]}
            />
            {!!titleRightRendered && (
              <Cell
                needBorderLine={false}
                style={{position: 'absolute', right: 5, top: '25%'}}
                data={titleRightRendered(title)}
              />
            )}
          </TableWrapper>
        )}

        {column.every(i => !!i.title) && (
          <TableWrapper style={[styles.row, styles.formBackground, rowStyle]}>
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

        {/* 跨行表格 */}
        {groupList?.map(rowData => (
          <TableWrapper
            key={rowData.id ?? rowData.sortId}
            style={[styles.row, rowStyle, {backgroundColor: rowBgColor}]}>
            {/* 表项 */}
            {column.map((colConfig, index) => {
              if (colConfig.merge) {
                return (
                  <Cell
                    key={`${rowData.id ?? rowData.sortId}-${index}`}
                    width={colConfig.width}
                    data={renderElementCell(rowData, colConfig, index)}
                  />
                )
              } else {
                if (rowData.children) {
                  return (
                    <Col
                      key={`${rowData.id ?? rowData.sortId}-${index}`}
                      width={colConfig.width}
                      data={rowData.children.map(i =>
                        renderElementCell(i, colConfig, index),
                      )}
                      // 最小高度
                      heightArr={rowData.children.map(() => rowHeight)}
                    />
                  )
                }
              }
            })}
          </TableWrapper>
        ))}

        {/* 表格 */}
        {list?.map(rowData => (
          <TableWrapper
            key={rowData.id ?? rowData.sortId}
            style={[styles.row, rowStyle, {backgroundColor: rowBgColor}]}>
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
        {!list?.length && !!title && column.every(i => !!i.title) && (
          <TableWrapper style={[styles.row, rowStyle]}>
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
    fontSize: 15,
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
    fontSize: 15,
    fontWeight: 'bold',
  },
})
