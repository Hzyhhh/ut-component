// import React from 'react';
// import UTable, {
//   UTableCommonItemBase,
//   ColumnsBase,
//   UTableMethods,
// } from 'ut-component/dist/UTable';
import {AppRegistry, Text} from 'react-native';
import ScrollViewScreen from './ScrollView';

// const value: UTableCommonItemBase[] = ['1', '2', '3', '4', '5'].map(
//   (i, idx) => ({
//     id: i,
//     sortId: idx,
//     isFinished: false,
//     isUploaded: false,
//   }),
// );

// const columns: ColumnsBase<UTableCommonItemBase>[] = [
//   {
//     dataIndex: 'id',
//     title: 'id',
//     render: r => <Text>{r.id}</Text>,
//   },
//   {
//     title: 'sortId',
//     dataIndex: 'sortId',
//     render: r => <Text>{r.sortId}</Text>,
//   },
//   {
//     title: 'isFinished',
//     dataIndex: 'isFinished',
//     render: r => <Text>{r.isFinished.valueOf()}</Text>,
//   },
// ];

// interface HeaderRenderedProps extends UTableCommonItemBase {
//   a: string;
// }

// const HeaderRendered = (table?: UTableMethods<HeaderRenderedProps>) => {
//   return <>123</>;
// };

// const FooterRendered = (table?: UTableMethods<HeaderRenderedProps>) => {
//   console.log(table);
//   return <>223</>;
// };

const App = () => {
  return (
    <ScrollViewScreen />
    // <UTable
    //   value={value}
    //   columns={columns}
    //   header={HeaderRendered}
    //   footer={FooterRendered}
    // />
  );
};

AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {rootTag: document.getElementById('root')});
