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

### 调试开发须知

由于`react-native`并未支持`symlinks`,也就是说不能通过软链`yarn link`的方式模拟本地依赖的导入。

因此在本组件库的开发中，提供以下解决方案：`yarn build` 命令会实时监听更改的文件进行持续打包, 在 example 内需要进行调试时, 可以运行`yarn change`直接更改`node_modules/ut-component`下的`dist`文件夹。

当然，除了这种方式之外，也可以考虑使用`yalc`的方式模拟软链
