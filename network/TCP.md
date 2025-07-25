# TCP



TCP(传输控制协议, Transmission Control Protocol) 是一种**面向连接的, 可靠的, 基于字节流的**传输层通信协议, 广泛应用于互联网中，它旨在提供可靠的端到端通信; 



### TCP特点

- 一对一
- 面向字节
- 确认机制
- 超时重传



### TCP帧结构

<img src=".\imgs\1732843327250.jpg" alt="电路  报文  分组" style="zoom: 60%;" >



### 拥塞控制

发送窗口

拥塞窗口

TCP



### 流量控制

发送设备和接受设备处理信息的能力、网络的负载能力都会导致数据传输是否可靠。为此TCP有着一系列控制流量的办法。



### 三次握手

| 序号 | 方向            |                         |             |
| ---- | --------------- | ----------------------- | ----------- |
| 1    | Client → Server | Client Hello            | SYN=1       |
| 2    | Server→ Client  | Server Hello Server ACK | SYN=1 ACK=1 |
| 3    | Client → Server |                         | ACK=1       |





### 四次挥手

| 序号 | 方向            |              |
| ---- | --------------- | ------------ |
| 1    | Client → Server | FIN=1        |
| 2    | Server→ Client  | ACK=1        |
| 3    | Server→ Client  | FIN=1，ACK=1 |
| 4    | Client → Server | ACK=1        |





### 保活机制