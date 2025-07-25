# 	HTTP
![](imgs\1745463130346.jpg)




## 什么是HTTP

HTTP（hypertext transfer protocol ）超文本传输协议，是用于传输超文本文档（HTML）的应用层协议，是为web浏览器与web服务器之间的通讯而设计的。



## HTTP的特点

- 无状态：客户端打开一个链接发送请求，然后等待服务端响应，这个过程中服务端不会保存任何状态信息。
- 无连接：每次请求都需要建立一个新的TCP连接，请求完成后关闭连接。
- 请求-响应：客户端发送请求，服务端返回响应。
- 可拓展：http/1.0中加入的头信息，使得http的拓展变得非常容易。
- 明文传输：请求和响应以**纯文本**形式传输，TLS层的加入才解决了这个问题。



## HTTP的发展

HTTP/0.9（1991年）

缺点：雏形阶段，仅支持`GET`方法，无头部、状态码或错误处理。**只能传递纯文本**。

```
GET /index.html
```

------

HTTP/1.0（1996年，RFC 1945）

改进：首次标准化，引入**HTTP头部**（Headers）和**状态码**（如200、404）。

缺点：每个请求需新建TCP连接，性能低下。

```
GET /page.html HTTP/1.0
User-Agent: Mozilla/4.0
Accept: text/html
```

HTTP/1.1（1999年，RFC 2616 → 2014年RFC 723X系列）

改进：

​	管道化，允许连续发送多个请求；
​	持久连接，复用TCP连接，减少握手开销；
​	强制`Host`头部：支持虚拟主机（单IP托管多域名）
​	缓存控制：强缓存、协商缓存。

缺点：

​	队头阻塞：http顺序发送数据，导致后面的请求需要等待前面的请求完成。
​	并行连接限制：由于队头阻塞，http1.1可以建立多个TCP连接，但存在数量限制（6个）。
​	头部开销大：头信息通常重复且冗余。

------

HTTP/2（2015年，RFC 7540）

改进：

​	二进制分帧层：HTTP/2引入了二进制分帧层，在该层中上，传输的数据会被分割成更小的二进制帧进行传输；每个帧可以独立压缩和解压，这提高了传输效率；帧可以乱序发送，然后更具每个帧的首部的流标识重新组装。
​	多路复用：并发多个请求，解决队头阻塞。
​	头压缩：HPACK压缩算法压缩http头，字典表的方式，压缩通讯过程中传递的数据。
​	服务端推送：服务器可以在客户端请求之前主动推送资源到客户端，这样当客户端真正需要这些资源时，它们已经存在于客户端缓存中，减少了延迟时间。
​	优先级：HTTP/2允许为请求分配优先级，使得客户端可以指示哪些资源更重要，服务器可以根据这些优先级调整资源的发送顺序，从而优化用户体验

问题：

​	TCP队头阻塞（区别于http队头阻塞）：http2中传输的内容不再顺序发送，若需要传输的包1 2 3，1 3 到达 2 丢失，则3会被置于缓冲区形成阻塞。
​	TCP与TLS叠加了握手时延：连接建立时间过长。
​	不适用移动状态下的无线网络：IP地址的频繁变动会导致TCP、TLS反复握手。

------

5. HTTP/3（2022年，RFC 9114）

   改进：

   ​	传输层改用UDP：解决TCP队头阻塞问题，提升弱网性能
   ​	0-RTT握手：减少连接建立延迟（尤其移动端）

   ​	加密和安全：QUIC强制使用TLS 1.3

   ​	减少队头阻塞：每个流都是独立的，流之间不会互相影响

   ​	头压缩QPACK：HPACK的改进版本

   ​	连接迁移：IP切换时保持连接（如WiFi切4G）



## HTTP请求结构

```js
// 请求结构
POST /contact_form.php HTTP/1.1	// method / url / 协议/协议版本
Host: developer.mozilla.org	// headers
Content-Length: 64
Content-Type: application/x-www-form-urlencoded

name=Joe%20User&request=Send%20me%20one%20of%20your%20catalogue	// body body和头信息用空行隔开


// 响应结构
HTTP/1.1 200 OK	// 协议/协议版本 状态码
Content-Type: text/html; charset=utf-8
Content-Length: 55743
Connection: keep-alive
Cache-Control: s-maxage=300, public, max-age=0
Content-Language: en-US

<!DOCTYPE html>	// body 同样和头信息用空行隔开
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>A simple webpage</title>
</head>
<body>
  <p>Hello, world!</p>
</body>
</html>
```



## HTTP Method

http方法，用于表明请求方本次请求的意图

- GET：请求URL对应的资源。幂等
- POST：向服务端提交数据。不幂等
- PUT：请求完整资源的替换 or 创建。幂等
- PATCH：请求对部分资源进行修改，区别于PUT。不幂等
- DELETE：删除对应资源。幂等
- TRACE：用于诊断。反射用户请求的信息
- OPTIONS：用于跨域预检测。或获取服务器所支持的method，支持的方法在Allow响应头中表明。
- HEAD：类似get，但响应内容不包含body，用于下载场景中的预检。





## HTTP 状态码

状态码，用于表明响应内容的状态信息，方便浏览器或用户快速做出判断。

- 1xx：继续。临时响应，请求已被接受，但不完整，请继续发送请求。
  - 100：请求不完整，请继续发送请求
  - 101：客户端更换协议，服务器支持 Upgrade header中对应的协议，等待客户继续发送请求。
- 2xx：成功。本次请求被服务器接收、理解。
  - 200：成功。
  - 201：成功创建新资源。
  - 202：成功，但不会被立刻处理，可能是批处理。
  - 204：成功，但无body响应。
  - 206：成功，但响应的数据为分片数据。
- 3xx：重定向。
  - 300：请求包含多个响应结构，用户自行选择。
  - 301：永久重定向。
  - 302：临时重定向。
  - 304：响应body无更改，告知浏览器使用缓存。
- 4xx：请求方错误。
  - 401：缺乏身份认证信息。
  - 403：无权访问。
  - 404：请求的资源不存在。
  - 405：服务器支持对应的method，但这次请求不支持，区别于501。
  - 408：请求超时。
- 5xx：服务端错误。
  - 501：服务不支持该method
  - 502：网关或代理服务器，从上游获取的响应是无效的
  - 503：暂时无法处理请求，在维护或者超载了
  - 504：网关或代理服务器的上游响应超时。





## HTTP Header

http头用于携带一些额外的上下文信息，这些信息可能是：

- **描述资源**：提供关于所请求资源的信息，如其类型、大小等。
- **控制缓存行为**：指导浏览器或其他中间代理如何缓存资源，以提高性能和减少带宽使用。
- **认证和授权**：支持身份验证机制，确保只有授权用户才能访问特定资源。
- **安全增强**：通过设置如 `Content-Security-Policy`, `Strict-Transport-Security` 等头部来增加安全性。
- **协商内容**：允许客户端和服务器就文档格式、语言、编码等进行协商。
- **状态报告**：向客户端传达请求的结果状态。



##### 常见Header

上下文相关header：

| Header     | 作用                      | 示例                                                         |
| ---------- | ------------------------- | ------------------------------------------------------------ |
| Host       | 发起请求的域名            | Host: developer.mozilla.org                                  |
| Origin     | 发起请求的源（协议+域名） | Origin: https://www.example.com                              |
| Referer    | 发起请求的页面（完整url） | Referer: https://www.example.com/previous-page               |
| User-Agent | 发起方的程序的信息        | User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit...... |
| Allow      | 响应方支持的http method   | Allow: GET, POST, HEAD                                       |
| Server     | 响应方的程序信息          | Server: Apache/2.4.1 (Unix)                                  |
| Date       | 格林尼治时间戳            | Date: Wed, 21 Oct 2015 07:28:00 GMT                          |

http响应内容的描述信息：

| Header              | 作用                                           | 示例                                                     |
| ------------------- | ---------------------------------------------- | -------------------------------------------------------- |
| Content-type        | 表明http响应主体的 MIME 格式                   | Content-Type: text/html; charset=UTF-8                   |
| Content-length      | 表明http响应主体的长度（字节）                 | Content-Length: 348                                      |
| Content-Encoding    | 表明http响应主体的压缩方式                     | Content-Encoding: gzip                                   |
| Content-Range       | 表明在分片加载中，该部分响应在完整响应中的位置 | Content-Range: bytes 200-1000/67589                      |
| Content-Disposition | 表明响应的内容用以展示、还是下载。             | Content-Disposition: attachment; filename="filename.jpg" |

http请求方的需求信息：

| Header          | 作用                                               | 示例                                        |
| --------------- | -------------------------------------------------- | ------------------------------------------- |
| Accept          | 表明请求方希望得到的响应主体的 MIME 类型           | Accept: image/avif,image/webp,image/*;q=0.8 |
| Accept-Encoding | 表明请求方希望得到的响应主体的编码（压缩算法）类型 | Accept-Encoding: gzip, compress, br, zstd   |
| Accept-Language | 表明请求方希望得到的响应主体的自然语言             | Accept-Language: zh-CN,en;q=0.5             |
| Accept-Ranges   | 表明响应方分块的标记（分块下载场景）               | Accept-Ranges: bytes                        |

其他常见：

| Header          | 作用                                   | 示例                            |
| --------------- | -------------------------------------- | ------------------------------- |
| Location        | 重定向的地址信息                       | Location: /index.html           |
| Connection      | http keep-alive                        | Connection: keep-alive          |
| Accept-Language | 表明请求方希望得到的响应主体的自然语言 | Accept-Language: zh-CN,en;q=0.5 |
| Accept-Ranges   | 表明响应方分块的标记（分块下载场景）   | Accept-Ranges: bytes            |



## HTTP分片



## HTTP 压缩

对于需要传输的大体积资源，浏览器和服务器之间可以协商压缩体积来优化响应速度。 建议对图片、音频、视频的传输都进行压缩。常见的压缩算法有 gzip、deflate。

Accept-Encoding 请求头表明自己支持的压缩算法

Content-Encoding 响应头告知该次请求的主体使用了那种压缩方式。



## HTTP 缓存

HTTP提供一系列的缓存控制策略，来优化响应速度，我们通过相关http头来配置缓存策略。

强缓存：

- Expires：响应资源时，通过 Expires 响应头告知浏览器文件的过期日期，但由于对比日期于用户的机器时间有关，不建议使用。
- Cache-control：响应资源时，通过 Cache-control 响应头设置强缓存策略（max-age=10000, public）。用户再次请求该资源时，若未超时，就不会再次咨询服务器。

弱（协商缓存）缓存：

- last-modified； If-Modified-Sinc： 响应资源时通过 last-modified 告知浏览器资源最后一次修改的时间，客户端再次请求相同资源时将（前述last-modified）修改时间，通过请求头 If-Modified-Since 携带上，交由服务端判断资源是否需要使用缓存。（无变化返回 304） 
- ETag ；if-None-Match ：响应资源时通过 ETag 告知浏览器文件的hash签名，下次请求时，浏览器通过请求头 if-None-Match 携带上（前述ETag）hash签名，交由服务端判断资源是否使用缓存。

私有缓存：强缓存中 Cache-Control 响应头设置了 private，则表示该资源是浏览器缓存，不希望代理服务器缓存。

共享缓存:  强缓存中 Cache-Control 响应头设置了 public，则表示该资源可以在代理服务器上缓存，还可以通过 s-max-age 来控制缓存在代理中的有效时间。

浏览器缓存策略优先级：

Service Worker -> Memory Cache -> Disk Cache -> Push Cache。内存缓存





## Cookies

http是无状态的(需要cookies来调味)，事务前后不具有连续性，cookies的加入便是用来存储一些状态信息。

服务端可以通过 set-cookies  响应头来设置cookies，可以对cookies的有效期、domain、是否使用https等作出限制。这些cookies会存储在浏览器中，当客户下次发起请求时，会自动携带上cookies。

- domain：控制目标，控制我们在请求哪些域名时携带cookies。

- same-site：控制来源。

- sameparty：将多个域名视为同一集合，他们设置的cookies集合内的成员共享。在服务器中添加配置文件 .well-know/first-party-set 配置域名集合。





## 安全策略

#### 同源策略

同源策略指 **协议+域名+端口** 三者皆相同



#### CORS

在浏览器的同源策略限制下，用户只能访问同域名下的资源以保证安全。但同时提供了CORS 跨域资源共享的机制，CORS是一种基于http头的安全机制。

简单请求：GET、HEAD、POST、浏览器不会触发跨域预检(OPTIONS)。直接响应的内容中包含跨域控制header。

非简单请求：PUT、DELETE、自定义header等会触发跨域预检测。

跨域控制header：

- Access-Control-Allow-Credentials：是否允许发送cookies
- Access-Control-Allow-Headers：允许使用的header
- Access-Control-Allow-Methods：允许的method
- Access-Control-Allow-Origin：允许哪些源访问
- Access-Control-Max-Age：预检请求结果的缓存时间



#### CSP 

Content-Security-Policy 该响应头为网站管理员提供控制权，以控制哪些资源可以被浏览器加载和执行。主要用于防止XSS攻击和其他脚本注入攻击。

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://apis.google.com;
```

- **default-src**: 定义默认加载策略，适用于其他未单独指定策略的资源类型。
- **script-src**: 指定允许加载的脚本来源。
- **style-src**: 指定允许加载的样式表来源。
- **img-src**: 指定允许加载的图片来源。
- **connect-src**: 限制可与哪些URL进行通信（如 XMLHttpRequest, WebSocket 等）。
- **frame-src**：加载到frame和iframe中的合法源。



#### HSTS

Strict-Transport-Security 该响应头，强制浏览器使用https协议进行通讯。即使用户手动输入了http，浏览器也会将其自动转化为https

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

- **max-age**: 指定以秒为单位的时间长度，在此期间浏览器应仅通过HTTPS访问该站点。
- **includeSubDomains**（可选）: 如果设置了此参数，表示规则同样适用于所有子域名。





## https

http在网络中命文传输信息是不安全的，https 在 http 和 TCP 协议之间添加了TLS层，通过非对称加密，保障数据在网络中的安全。

TLS五次协商

1. Client 向 Server 请求建立连接。
2. Server 将自己的证书发送给 Client。
3. Client 验证证书，然后使用证书中的公钥加密接下来要用来通信的密钥，将加密结果发送给 Server。
4. Server 收到后进行响应，且将用该密钥来对需要发送或接收的上层数据进行加解密。
5. 自此 TLS 握手完成，接下来开始使用密钥进行通信。



在原生应用中，还有着更灵活的安全策略：

公钥固定：（Client 端验证 Server端的身份）Client端内置了Server端的公钥，Server端发送的公钥证书必须与Client端内置的公钥一致请求才会成功。

双向认证：（Client端，Server端认证彼此的身份）除了上述公钥固定，Client还内置了一套公私钥，Server端会向Client端请求公钥，以验证Client端的身份。





## API架构

REST

RESTful API 是基于 HTTP 协议的利用标准的 HTTP 方法（如 GET、POST、PUT、DELETE 等）来操作资源。特点“

