import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {ColumnsBase} from './type';
import ItemRendered from './ItemRendered';

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
}

export interface UTableMethods<T> {
  getList: () => T[];
}

export interface UTableProps<T extends UTableCommonItemBase> {
  wrapperComponentRef?: React.Ref<UTableMethods<T>>;
  persistKey?: string;
  /**
   * TODO:
   * 允许选择 -> 表单前面多个复选框
   */
  enableSelect?: boolean;
  /**
   * 定义表单字段
   */
  columns: ColumnsBase[];
  /**
   * 表单主要信息
   */
  header: (instance?: UTableMethods<T>) => React.ReactElement;
  /**
   * 底部信息
   */
  footer?: (instance?: UTableMethods<T>) => React.ReactElement;
  /**
   * 外部定义弹窗提示方式
   */
  onToast?: (str: string) => void;
  /**
   * 受控模式
   */
  value?: T[];
  onChange?: (v: T[]) => void;

  children?: React.ReactElement;
}

function UTable<T extends UTableCommonItemBase>(props: UTableProps<T>) {
  const {
    wrapperComponentRef,
    persistKey = 'UTable',
    columns,
    value,
    onToast,
    header,
    footer,
  } = props;
  const {setItem, getItem} = useAsyncStorage(persistKey);
  const [dataSource, setDataSource] = useState<T[]>([]);

  const [UTableRef, setUTableRef] = useState<UTableMethods<T>>();

  useImperativeHandle(wrapperComponentRef, () => UTableRef!, [UTableRef]);

  /**
   *
   */
  const a: T[] = useMemo(() => {
    getItem((err, str) => {
      if (err) {
        onToast?.(err.message);
      }
      if (!str) {
        onToast?.(persistKey + ' 不存在缓存数据');
      }
      return str ? JSON.parse(str) : [];
    });
    return [];
  }, []);

  /**
   * 渲染表单主要信息
   */
  const renderHeader: () => React.ReactElement = useCallback(() => {
    if (header) {
      return header(UTableRef);
    }
    return <></>;
  }, [UTableRef]);

  /**
   * 渲染表单底部信息
   */
  const renderFooter: () => React.ReactElement = useCallback(() => {
    if (footer) {
      return footer(UTableRef);
    }
    return <></>;
  }, [UTableRef]);

  /**
   * 渲染操作项
   */
  const renderItem: ListRenderItem<T> = useCallback(params => {
    const {item} = params;
    return <ItemRendered data={item} column={columns} />;
  }, []);

  useEffect(() => {
    if (value) {
      setDataSource(value);
    }
  }, [value]);

  useEffect(() => {
    const payload = JSON.stringify(value);
    setItem(payload);
  }, [dataSource]);

  // 数据变动时将钩子方法更新
  useEffect(() => {
    setUTableRef({
      getList: () => dataSource,
    });
  }, [dataSource]);

  return (
    <FlatList
      data={dataSource}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}>
      {props.children}
    </FlatList>
  );
}

export default UTable;
