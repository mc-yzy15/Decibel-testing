# Decibel-testing
一个使用 Tauri 开发的开源分贝检测仪 | An open-source decibel detector developed with Tauri

## 项目介绍
这是一个简单易用的分贝检测应用，使用 Tauri 框架开发，支持跨平台运行（Windows、macOS、Linux）。应用可以实时检测环境噪音，并显示分贝值、噪音级别以及对应的健康建议。

## 功能特点
- 实时监测环境噪音
- 显示当前分贝值和噪音级别
- 提供噪音对健康影响的建议
- 简洁美观的用户界面
- 跨平台支持

## 技术栈
- 前端：HTML、CSS、JavaScript
- 后端：Rust
- 框架：Tauri

## 安装指南
### 直接下载 (推荐)
你可以直接从GitHub Releases页面下载最新版本的应用程序，无需自己构建：
1. 访问 [GitHub Releases](https://github.com/mc-yzy15/Decibel-testing/releases/latest)
2. 根据你的操作系统下载对应的安装包：
   - Windows: `.exe` 文件
   - macOS: `.dmg` 或 `.app.tar.gz` 文件
   - Linux: `.AppImage` 或 `.deb` 文件
3. 下载完成后，按照操作系统的提示进行安装

### 从源码构建
如果你希望从源码构建应用，请按照以下步骤操作：

#### 前提条件
- [Node.js](https://nodejs.org/) (v16 或更高版本)
- [Rust](https://www.rust-lang.org/) (最新稳定版)
- [Tauri CLI](https://tauri.app/) (可选)

#### 构建步骤
1. 克隆仓库
```bash
git clone https://github.com/mc-yzy15/Decibel-testing.git
cd Decibel-testing
```
2. 安装依赖
```bash
npm install
```
3. 运行开发服务器
```bash
npm run tauri dev
```
4. 构建发布版本
```bash
npm run tauri build
```
构建完成后，可执行文件将位于 `src-tauri/target/release/` 目录中

## 使用方法
1. 启动应用后，点击"开始检测"按钮
2. 应用会实时显示当前环境的分贝值
3. 根据显示的噪音级别，采取相应的防护措施

## 贡献指南
欢迎对本项目进行贡献！如果你有任何建议或问题，请提交 issue 或 pull request。

## 许可证
本项目采用 [MIT 许可证](LICENSE)

## 作者信息
- GitHub: [mc-yzy15](https://github.com/mc-yzy15)
- Bilibili: [https://space.bilibili.com/1338637552](https://space.bilibili.com/1338637552)
- CSDN: [https://blog.csdn.net/m0_68339835](https://blog.csdn.net/m0_68339835)
- 个人博客: [https://home159263.wordpress.com/](https://home159263.wordpress.com/)
