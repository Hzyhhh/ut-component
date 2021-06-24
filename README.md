# RN-不能说挑战

游戏规则：被发牌者说/做相应词语即为挑战失败

## 原理探究

写出该游戏只是表象，目的其实是为了探究 `RN` 到底能支持`typescript`到什么程度？(详情请看我博客)

1. 纯 `js` 实现该功能（🆗 可编译）
2. 移除`jest`等框架自带的测试插件（🆗 可编译）
3. 移除 `RN` 官网`babel`插件`metro-react-native-babel-preset`（🙅‍ 可安装 但编译异常）
4. 逐步引入支持 `RN` 上写 `EXNext` 的 `babel` 插件
5. 在此基础上对项目引入 `Flow` 或者 `Typescript`
6. ……