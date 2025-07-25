#### ACM输入输出

```py
# 读取一行输入去除两端空格
input().strip()

# 无固定行的输入
while True:
    try: s = input()
    except: break
```



#### set



#### re模块

正则模块

```python
# 常用方法
re.search	# 返回一个匹配	返回的是match对象，match.group()来访问匹配的内容
re.match	# 从头开始匹配	返回的是match对象

re.findall	# 返回所有匹配	返回的是数组
re.findalliter	# 返回的是所有匹配	返回的是match对象迭代器

re.sb	# 替换匹配的部分	返回替换后的字符串
re.sbn	# 替换匹配的部分	返回替换后的字符和替换了多少个地方

re.split	# 用正则作为分割的部分	返回被切后的str list
re.complie	# 

# 匹配的内容
123abcd	// 字面量
\d		// 数字
\D		// 除数字
\s		// 空格
\S		
\w		// 字母 + _
\W
[abc]	// 自定义
[a-z]	// 范围自定义
[^a-z]	// 范围自定义取反
[\b]	// 退格符
.		// 除换行符的任意字符

# 长度限制
?		// 0个或1个
+		// 1个或多个
*		// 0个或多个
{2}		// 2个
{2，5}	// 2到5个
{2,}	// 最多2个
{,5}	// 最多5个

# 位置
^		// 开头
\A		// 开头，忽略m标记
$		// 结尾
\Z		// 结尾，忽略m标记
\b		// 单词边界
\B
(?=...)	// 匹配...之后的位置
(?!...)	// 匹配不出现在...之后的位置
(?<=...)// 匹配...之前的位置
(?<!...)
(?()|)	// 条件语句

# 配置
i       re.I		// 忽略大小写
m		re.M		// 多行模式
s		re.S		// 点能匹配任何东西包括换行符
x		re.X		// 忽略空格和#后的注释
\L		re.L		// 字符集依赖于当前环境
\u		re.U		// 字符集为Unicode
```



#### 内置api

```python
int(str, 8)	# 显示转化为整数类型，第二个参数可以设置进制

sorted(map)	# 返回的是键值的顺序

"-".join(['1', '2']) # '1-2'

bin(55) # '0b110111' int的二进制表示

ord('a') # 97 字符的编码  ps:a比A大32

chr(97) # 将编码变为字符

any([True, False, False]) # True

all([True, True, False]) # False

	# 位运算
a&b # 与 AND
    # 或 OR
    # 亦或 XOR
    # 非 NOT
    

```



#### functools

```python
reduce(lambda x,y: x+y, [1,2,3], 0)

cache
```



#### collections

```python
deque()	# 双端队列	list也可以pop(0) insert(0,val)来实现双端插入、删除操作。但内部实现需要移动数组，复杂度是O(n)
    deque.appendleft()
    deque.popleft()
    deque.extendleft(iter)	# 添加完的迭代器对象，会变成倒序
```



#### threading

线程 threading 是操作系统中能运行的最小单位，一个进程可以包含多个线程

