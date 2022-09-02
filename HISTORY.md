## 记录历史

### 提交发版操作 2022-9-2

提交后直接在根目录 `npm login` `npm publish`, 命令会根据`package.json`里的`version`字段往`npm`推`dist`文件

### git 代码提交指引 2022-9-2

该项目代码在笔者 github、公司 gitlab 都有存放, 笔者每次提交 github 发版后都会手动同步 gitlab 仓库。目的是保持可用版本的最新更改。
**后续维护推荐直接在 gitlab 提交代码。**
以下记录手动同步仓库（github 往 gitlab）的操作：

- 复制 js-group/ut-component 项目到本地 cd 该项目
- `git clone --bare sourcegiturl`
- cd ut-component.git
- `git remote set-url targetgiturl`
- `git remote set-url --push origin targetgiturl`
- `git push --mirror`
