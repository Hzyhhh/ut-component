# UT-component

base `React Native Table Component` 开发的业务通用型表单组件

## 特点

- 基本功能来源于`antd` `Table`组件
- 适配`React Native`
- 表单高度可定制
- 专注业务数据开发
- 良好的类型支撑

## 安装

```shell
$ yarn add ut-component
```

## 基本用法

```jsx
import WhiteSpace from 'components/WhiteSpace'
import React from 'react'
import {Button} from 'react-native'
import {UTable} from 'ut-component'

const columns = {
  key1: [
    {
      dataIndex: 'sortId',
      title: '序号',
      align: 'center',
    },
    {
      dataIndex: 'name',
      title: '名称',
    },
    {
      dataIndex: 'content',
      title: '内容',
      width: 200,
    },
    {
      dataIndex: '',
      title: '按钮',
      width: 80,
      align: 'center',
      render: r => <Button onPress={() => console.log(r)} title="确定" />,
    },
  ],
}

const value = {
  key1: {
    title: '人物介绍',
    list: [{sortId: 1, name: '张三', content: '喜欢唱跳rap'}],
  },
}

const HeaderRendered = () => {
  return <WhiteSpace size="bg" />
}

const FooterRendered = () => {
  return <WhiteSpace size="bg" />
}

const AppScreen = () => {
  return (
    <>
      <UTable
        columns={columns}
        value={value}
        header={HeaderRendered}
        footer={FooterRendered}
      />
      <Text></Text>
    </>
  )
}

export default AppScreen
```

![](/.github/images/basic1.png)

## 表单合并

查看一些表单复杂的用法

![](/.github/images/basic2.png)

![](/.github/images/basic3.png)
