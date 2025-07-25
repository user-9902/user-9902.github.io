# 鸿蒙开发



鸿蒙SDK以Kit为维度，提供丰富的开放能力，开发者通过Kit来和操作系统进行交互。

- 应用框架 Kit：
  - Ability Kit：为应用的运行提供底层支撑，提供进程的创建销毁；提供应用上下文环境、系统环境监听等能力。
  - ArkUI：应用UI开发的框架
  - ArkData：数据管理，提供数据持久化、内存对象跨设备共享等能力
  - ArkWeb：
- 系统性相关 Kit：
  - Network Kit：网络服务
  - Universal Keystore Kit：密钥管理服务
- 媒体相关 Kit：
  - Audio Kit：音频服务
  - Media Library Kit：媒体文件管理服务
  - 





## Ability Kit

对应用的开发和运行提供服务，对多种模型应用的开发，应用内交互，应用间交互，跨设备应用交互等功能提供支撑。

服务包含：

- 提供应用进程创建和销毁、应用生命周期调度能力。
- 提供应用组件运行入口、应用组件生命周期调度、组件间交互等能力。
- 提供应用上下文环境、系统环境变化监听等能力。
- 提供应用流转能力。
- 提供多包机制、共享包、应用信息配置等能力，详见[应用程序包概述](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/application-package-overview)。
- 提供程序访问控制能力，详见[访问控制概述](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/access-token-overview)。
- 提供安全密码自动填充能力，详见[密码自动填充服务概述](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/passwordvault-overview)。

#### 应用模型

FA模型与Stage模型

Stage模型与FA模型最大的区别在于，Stage模型，多个应用共享一个ArkTS引擎实例。

Stage模型是自HarmonyOS API 9以来主推的模型





- 应用模块化：
  - Ability Module：用于实现应用的功能和特性。
    - Entry Module：应用的入口，包含应用图标、入口界面等。一个应用只能有0或1个entry类型的module。
    - Feature Module： 应用的特性模块。
  - Library Module: 用于代码和资源共享。
    - Static Library: 静态共享包，被引用时会跟随引用方一起编译打包。
    - Shared Library：动态共享包，可以独立编译，运行时在一个进程中只有一份。









#### 容器类型

| 线性容器 |      |      |
| -------- | ---- | ---- |
|          |      |      |
|          |      |      |
|          |      |      |





## 并发

异步并发：Promise、async/await 同js

多线程：



## ArkUI



#### MVVM 模式

ArkUI采用MVVM的设计模式，状态管理模块将视图和数据绑定到一起。

![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyManage/011/111/111/0000000000011111111.20240621100222.65349680055492775589799013296844:50001231000000:2800:C9E49D23C90ABBAB7D26C487E2C506092F465154598165E7030006DD043C2EB8.jpg?needInitFileName=true)



#### 装饰器

```ts
@State	// 声明响应式变量

@Prop	// 声明参数

@Component	//	组件

@Preview	// 添加到preview
```











## ArckUI

#### Stage模型

#### 包类型

HAP：Ability

​	引用安装的基本单元，HAP包由代码、资源、三方库、配置文件等打包生成的模块包，主要有两种类型： feature 和 entry，entry作为应用的主入口，提供应用的基础能力；feature作为应用的动态特性模块，可以更具用户的设备类型，动态选择安装。               

HAR：Static Library

HSP：Shared Library



#### 











