# TS



`TypeScript`是一种由微软开发的开源编程语言，它是JavaScript的`超集`。TypeScript通过添加`静态类型`、`类`、`接口`和`模块`等功能，使得在大型应用程序中更容易进行维护和扩展。ts最终需要编译为js才能在浏览器或node中运行，当然也有为ts提供运行时环境的平台如bunjs。



## 类型

### 常见类型

```ts
let bool: boolean = true
let str: string = 'str'
let num: number = 0
let u: undefined = undefined
let n: null = null
let list: number[] = [0,1,2]
let arr: [string, number] = ['1', 1] // Tuple
enum Color {Red = 1, Green = 2, Blue = 4} // 枚举
let a: any = ''; a = 1 // any
function warnUser(): void { alert("This is my warning message"); } // 无返回值 void === null | undefined
function error(): never { throw new Error(str) } // 无法到达终点
```



### 类型断言

当类型不明确的时候，一些操作在编译器看来是不安全的，会导致运行时错误，但实际上并不会。我们可以通过类型断言的方式明确告诉编译器这里的类型是什么，类似其他语言中的类型转换。

```ts
let someValue: any = "this is a string";
// error any 类型可能没有length属性
let strLength: number = someValue.length;
// 使用as关键字明确告诉编译器 someValue 的类型是 string
let strLength: number = (someValue as string).length;
// 另一种写法，由于和泛形写法类型，不推荐使用
let strLength: number = (<string>someValue).length;
```



### 联合类型

有些时候，变量的类型不仅限于一种，如函数的参数。

```ts
type NumberLike = string | number
function add(a: NumberLike, b: NumberLike): NumberLike {
    return a + b
}
```





### interface

```ts
// function 
interface FunA {
    (x:number, y:number): number;
}
let funa: FunA = function(x:number, y:number){
	return x + y
}

// array
interface ArrA{
    [index: number]: string
}
let arra: ArrA = ['a', 'b']

// Class
interface ClazzA {
    num: number
	getNum: 
}
class ClassA implements ClazzA {
  num: number
  constructor(num: number) {
    this.num = num
  }
  getNum(this: ClassA) {
    return this.num
  }
}
```



##### type 和 interface 的区别

- interface：源于面向对象的思想，对象抽象为类，类抽象为接口。常用于定义明确的形状或数据结构
  - 用于描述对象的结构
  - 可以被继承，通过 extends 关键字
  - 可以用于类的实现，通过 implement 关键字
  - 可重复声明，重复声明会合并为一个接口
  - 无法配合 typeof
- type：用于复杂类型的定义。
  - 更通用，除了描述对象的结构，还可以创建联合类型，交叉类型，基本类型的别名等。
  - 无法重复声明
  - 配合 typeof 实现更高级的功能



### 类型工具

```ts
// 对象工具：将所有属性变为可选
type Partial<T> = {
  [P in keyof T]?: T[P];
};
// 对象工具：将所有属性变为必填
type Required<T> = {
  [P in keyof T]-?: T[P];
};
// 对象工具：将所有的属性变为只读
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
// 对象工具：从T中指定键值，生成新的类型
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
// 对象工具：Pick 取反
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// 联合类型工具：去除联合类型中指定的类型
type Exclude<T, U> = T extends U ? never : T;
// 联合类型工具：选择指定的类型
type Extract<T, U> = T extends U ? T : never;
// 联合类型工具：去除联合类型中的null undefined
type NonNullable<T> = T extends null | undefined ? never : T;

// 
type Record<K extends keyof any, T> = {
  [P in K]: T
}

// 类的工具：获取构造函数的入参类型
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;
// 函数工具：infer 获取函数入参类型
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
// 函数工具：获取函数返参类型
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```



### const和readonly的区别

const 用于声明常量，常量必须在声明时赋值

readonly 属于类型系统，用来修饰对象、类的属性是只读的，被readonly修饰的属性在被赋值后便不可再次修改。







### any和unknow的区别

any类型的变量可以是任意类型

​	ts会跳过any变量的类型检查，对any类型变量进行任何操作都不会应发类型错误。

​	any类型变量可以被赋值为任意类型，也可以用以任意类型的赋值

​	不推荐使用

unknow类型变量可可以接受任意类型

​	对unknow变量操作的时候，必须通过类型守卫或类型断言确认其类型，否则会报错。

​	unknow类型变量也可以被赋予任意类型，但不能付给any之外的类型，除非先确认其类型。

​	推荐使用



### 协变、逆变、双变、抗变分别是什么

协变：赋值时可以将子类型赋给父类型

逆变：可以







### 杂项

| 问                             | 答                        |
| ------------------------------ | ------------------------- |
| 如何讲 array 类型转为 tuple 类 | [1, 'a', ()=>{}] as const |
|                                |                           |



