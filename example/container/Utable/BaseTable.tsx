import React, {FC} from 'react';
import {UTable, WhiteSpace} from 'ut-component';
import TopNavigation from '../../components/TopNavigation';
import {Button} from 'react-native';
import {ColumnsType} from 'ut-component/dist/UTable';

interface Key1DataType {
  id: string;
  sortId: number;
  name: string;
  content: string;
}

const key1Columns = UTable.createProps<Key1DataType>([
  {
    dataIndex: 'sortId',
    title: '序号',
    align: 'center',
  },
  {
    dataIndex: 'name',
    title: '姓名',
  },
  {
    dataIndex: 'content',
    title: '内容',
    width: 200,
  },
  {
    title: '按钮',
    width: 80,
    align: 'center',
    render: r => <Button onPress={() => console.log(r)} title="确定" />,
  },
]);

const BaseTable: FC = () => {
  const columns: ColumnsType<any> = {
    key1: key1Columns,
    key2: key1Columns,
  };

  const value = {
    key1: {
      title: '人物介绍',
      list: [{sortId: 1, name: '张三', content: '喜欢唱跳rap'}],
    },
    key2: {
      title:
        '测试超长人物标题在实际应用中的效果，测试超长人物标题在实际应用中的效果',
      list: [{sortId: 1, name: '李四', content: '喜欢打篮球'}],
    },
  };

  const HeaderRendered = () => {
    return <WhiteSpace size="bg" />;
  };

  //   const FooterRendered = () => {
  //     return <WhiteSpace size="bg" />;
  //   };
  return (
    <>
      <TopNavigation />
      <UTable
        columns={columns}
        value={value}
        header={HeaderRendered}
        // footer={FooterRendered}
      />
    </>
  );
};

export default BaseTable;
