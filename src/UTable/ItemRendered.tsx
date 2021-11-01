import React, {useMemo} from 'react';
import {ColumnsBase} from './type';

interface ItemRenderedProps<T> {
  data: T;
  column: ColumnsBase[];
}

function ItemRendered<T>(props: ItemRenderedProps<T>) {
  const {column} = props;

  const headerListRendered = useMemo(() => {
    return <></>;
  }, [column]);

  return <></>;
}

export default ItemRendered;
