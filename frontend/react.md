# React



React，用于构建用户界面的 JavaScript 库，只提供了 UI 层面的解决方案。react特点如下：

- JSX 语法：jsx用于描述虚拟dom，直接使用React.createElement来描述虚拟dom不够直观。jsx（js + xml）借助 babel（or swc）转义为纯js。
- 单向数据绑定：
- 虚拟 DOM：虚拟dom用于描述真实dom，两者呈一一对应的关系。虚拟dom的存储开销小、存储的信息更简单，我们通过操作虚拟dom，来间接操作真实dom。虚拟dom还使得react具备了跨平台的能力。
- 声明式编程：
- Component：将ui和js逻辑抽象为一个个组件，再通过组件拼凑出一个完整的应用。提高了代码复用率和开发效率。





### 什么是纯函数？副作用函数？

纯函数（Pure function），是函数式编程规范中非常重要的概念，有以下特点：

1. **确定性/幂等性（Determinism）**：相同的输入参数，纯函数**总产生相同的输出结果**，无论函数被调用多少次，也不管何时何地调用。
2. **无副作用（No Side Effects）**：纯函数的执行**不访问或修改外部状态**、不引发异常、不进行io操作（如打印到控制台、读写文件、网络请求等），其效果局限于函数内部，对外界环境没有可观察的变化。

副作用函数（Impure Function）指那些不满足上述纯函数特性的函数：

1. **非确定性**：同样的输入在不同时间或环境下可能产生不同的输出。
2. **有副作用**：函数执行时会影响外部状态，比如修改全局变量、改变输入参数、输出信息到控制台、读写文件、发起网络请求等。





### MVVM是什么

model-view-viewmodel的缩写。

model即模型（或数据模型），存储着的状态数据；

view即视图（或数据表现），即向用户展示的结构、布局、外观；

viewmodel即视图模型，视图层和模型层之间借助viewmodel进行沟通，viewmodel监听model层的数据变化，将变化展示在view层，同时viewmodel监听view层用户的交互事件、视图的变化以通知model层。vue中的mvvm是双向绑定的，视图层的变化数据将同步到model，model数据的变化也会立即响应到view上。

##### mvvm和mvc的区别

c即controller，controller需要主动的去维护view和model两者的关系，夹杂着大量的代码，使得系统复杂度高；大量的DOM操作使用户体验差。viewmodel是controller的演进，能自动维护view和model的关系，降低系统复杂度，抽离出业务逻辑，使得开发者更加的专注于业务逻辑开发。







### 组件

为提高代码的复用率，我们将重复使用的 js数据逻辑和视图逻辑 整合到一起作为组件。



##### 函数组件和类组件

类组件：类组件通过继承 React.Component 来编写，通过

|            | 类组件                                     | 函数组件                     |
| ---------- | ------------------------------------------ | ---------------------------- |
| 编写方式   | React.Component 来编写，必须实现render函数 | 返回类型为 jsx 的函数        |
| 生命周期   | 见下生命周期                               | useEffect 替代生命周期的作用 |
| 状态 state | this.state                                 | useState                     |
| props      | this.props                                 | 函数入参                     |

hooks api推出之前，函数组件是无状态的，只能用于编写简单的，无状态的组件。随着 hooks api的流行，函数组件中也能实现状态管理、生命周期，使得函数组件开始流行。



##### 生命周期

组件创建阶段

- constructor：类组件实例创建的时候执行
- getDerivedStateFromProps：是一个静态的方法，不能访问到组件实例，该函数需要返回一个对象作为新 state 或返回 null 表示无需更新 state
- render：类组件必须有的方法，该方法返回虚拟dom
- componentDidMount：组件完成创建

组件更新阶段

- getDerivedStateFromProps
- shouldComponentUpdate：该方法需返回一个boolean值，用于控制是否继续后续的更新组件流程。
- render
- getSnapshotBeforeUpdate：render执行后，真实dom更新前执行
- componentDidUpdate：组件完成更新

组件卸载阶段

- componentWillUnmount：清除一些监听事件，取消订阅等清理工作。



##### 组件间通讯

- 父组件 → 子组件：props
- 子组件 → 父组件：callback props
- 祖先 → 后代：provider context
- 兄弟间/全局：redux 订阅发布（mitt等三方库）



##### 受控组件/非受控组件

表单元素通过 value onChange 来获取值的变化，即为受控组件。

非受控组件则需要通过ref来手动获取表单元素的值。





### Hooks

```tsx
// useState 
// 简单数据类型的状态管理
const [state, setState] = useState(initialState)

// userReducer 
// 复杂数据类型的状态管理
const [state, dispatch] = useReducer(reducer, { name: 'Taylor', age: 42 }, initFn)

// useSyncExternalStore
// 用于从外部存储（例如状态管理库、浏览器 API 等）获取状态并在组件中同步显示
// subscribe 用于订阅状态库，还需返回一个卸载订阅的方法；getSnapshot 用于触发订阅；getServerSnapshot用于SSR中触发订阅
const res = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
                                 
// useTransition
// 用于UI的过渡，特别是需要长时间运行的状态更新时。react会优先处理更高优先级的更新。
const [isPending, startTransition] = useTransition();

// useDeferredValue
// 


// useEffect
// 副作用的勾子，在真实dom更新后执行
// 可以模拟componentDidMount componentDidUpdate componentWillUnmount
useEffect(setup, dependencies?)

// useLayoutEffect
// 用法同useEffect，但执行时机是在render执行完毕后，真实dom渲染之前
// 可以模拟 componentWillMount getSnapshotBeforeUpdate componentWillUnmount
useLayoutEffect(setup, dependencies?)

// useRef
// 用于获取dom实例，在此render不会重新赋值，不会重新赋值的特点，可以用在定时器等功能的实现上
const divRef = useRef(null); 
<div ref={divRef}>...</div>

// userImperativeHandle
// 子组件自定义向父组件暴露的方法和属性, 父组件通过useRef访问子组件暴露的数据
// react 18 需要结合React.forwardRef使用，react 19中简化了。
function Father(){
    const divRef = useRef(null)
    return <Child ref={divRef}></Child>
}
function Child({ref}){ 
	userImperativeHandle(ref, ()=>{return {...}}, []?)	// 第三个参数可选，同useEffect，数据发送变化了同步给父组件
}
    
    
// useContext
// 用于祖孙间的通讯
const ThemeContext = React.createContext({})
<ThemeContext.Provider value={{theme:'light'}}>
     <Parent />
</ThemeContext.Provider>	// react 19 不需要.Provider
function Parent(){
	const theme = useContext(ThemeContext)
 	return <>...</>       
}
    
// useMemo
// 用于缓存计算的结果,用于性能优化
const cachedValue = useMemo(()=> count+1, [count])
React.memo(Component) // 补充

// useCallback
// 用于缓存函数，用于性能优化
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]); // 函数组件内部的一些函数随着重新渲染的执行，会被反复创建
    
// useDebugValue
// 配合devtools使用
useDebugValue(value, (val)=>`format:${val}`)
```







### fiber

##### Why fiber

浏览器中，js是单线程的，同时js线程与render线程是互斥的。当有大量的js任务在执行时，render线程会被阻断，导致页面的卡顿，为此我们需要更细颗粒度的线程控制来平衡js的执行和页面的渲染，这也就是react使用fiber（纤程）的原因了。



##### 任务切片

react将一个大的渲染（虚拟dom运算）任务进行拆分，分为许多切片，每一帧中执行一个任务切片，减轻js线程对render线程的影响，保证页面绘制的流畅。



##### fiber tree

虚拟dom是一个树结构，基于上述任务切片的需求，我们需要从一个叶子节点恢复出一个完整的树（渲染子组件时被打断，下一个时间切片中在继续后续的渲染）。传统的树的结构是无法满足的，所有使用fiber tree。fiber tree 在传统树结构的基础上，所有子节点保存了对父节点的索引，所有节点保存对兄弟节点的索引。



##### 任务调度

**浏览器一帧中发送了什么**

1. 处理事件的回调click...事件
2. 处理计时器的回调
3. 开始帧
4. 执行requestAnimationFrame 动画的回调
5. 计算机页面布局计算 合并到主线程
6. 绘制
7. 如果此时还有空闲时间，执行requestIdleCallback（兼容性差，react未选择使用该API）

每个任务切片不能阻断浏览器的渲染，因此任务切片是宏任务，react 选择使用 MessageChannel 来实现任务调度。同时更具任务切片的优先级，来管理任务切片执行时机。

1. 立即执行的优先级, 级别最高 [点击事件，输入框]
2. 用户阻塞级别的优先级, [滚动，拖拽这些]
3. 正常的优先级 [render 列表 动画 网络请求]
4. 低优先级  [分析统计]
5. 最低阶的优先级, 可以被闲置的那种 [console.log]







### 事件机制

为了fiber架构中优先级的实现，react会将每个fiber节点上的事件，统一绑定到root节点上，通过冒泡机制来捕获并处理事件。

- 用户与页面交互时，浏览器生成一个事件。
- 该事件，沿着dom树向上冒泡，直到react的root节点。
- react捕获到事件后，会创建一个 SyntheticEvent 实例，将事件交给相应的事件处理器。
- 事件处理完后，SyntheticEvent 不会被销毁，以供下次复用。







### Diff

diff算法对比虚拟dom的前后变化，标记处哪些节点发送了新增、变化、移除。以便实现更轻量的真实dom的更新。新旧树传统地一对一地对比差异的时间复杂度呈指数，因此每个框架都进行了取舍，形成自己独特的diff算法。

react diff 的实现细节：

- tree层级：不做跨层级比较，只有删除，新建。
- component层级：如何是同类组件，则继续diff子组件，否则删除。
- element层级：当存在key时，顺序遍历新节点，判断元素是否需要移动，删除，新建。（[具体算法为快慢指针](https://vue3js.cn/interview/React/diff.html#%E4%BA%8C%E3%80%81%E5%8E%9F%E7%90%86)）







### react中的css解决方案

- 将css文件作为模块引入: webpack的配置中设置module：true实现
- css in js: 借助三方库 styled-components 实现
- TailWind：







### 状态管理

redux

```js
const reducer = (initState = {counter: 0}, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {...state, counter: state.counter + 1};
    // ...
  }
}
// 注册
const store = createStore(reducer)
// 派发事件
store.dispatch({
  type: "INCREMENT"
})
// 订阅状态变化
store.subscrible(() => {
  console.log(store.getState());
})
// 获取状态
store.getState()
```

zustand

```js
// 借助 useSyncExternalStore 实现的轻量状态管理库，核心源码十分简单。
import { create } from 'zustand'

export const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 })
}))
```





### 路由



懒加载，借助 @loadable/component 实现





### 杂项

| 问                                          | 答                                                           |
| ------------------------------------------- | ------------------------------------------------------------ |
| 为什么用className而非class                  | js中访问dom节点的class，访问的便是className属性，为了js中的一致性。 |
| state props 的区别                          | state：用于组件内动态数据的创建，值可变。props：用于组件外部向组件传递数据，值不可变。 |
| state props 的相同点                        | 两者都是用于保存信息；props 和 state 都能触发渲染更新；      |
| 为什么strictmode回调会触发两次console.log() |                                                              |
| super() 和 super(props)的区别               | 不将props传入super，则在construct内 this.props === undefined |
| key的作用                                   | key是唯一的，用于辅助diff算法。                              |
| 事件绑定的最优实践                          | 类组件中：箭头函数；函数组件中：useCallback                  |

