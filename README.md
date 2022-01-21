# UT-component

UT 通用组件库

## 安装

```shell
$ yarn add ut-component
```

## 使用

查看更多详细用法，请参考各组件内的 readme

```jsx
import {SearchComponents} from 'ut-component'

const App = () => <SearchComponents.Input title="Hello World" />
```

## 组件包括

- [x] [SearchComponents](./src/SearchComponents/README.md)
- - [x] SearchBase
- - [x] NavigatorSelect
- - [x] SearchAutoInput
- - [x] SearchInput
- - [x] SearchRadio
- - [x] SearchSelect
- - [x] SearchTags
- [x] [UTable](./src/UTable/README.md)
- [x] [RightActionsRendered](./src/UTable/README.md)
- [x] [table-component](./src/table-component/readme_zh.md)

## Demo App

在源码内部提供了一个 RN App 供组件调试

```shell
$ cd example && yarn && yarn android
```
