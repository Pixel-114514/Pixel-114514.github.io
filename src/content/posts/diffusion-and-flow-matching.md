---
title: "扩散模型与流匹配学习指南：从噪声生成到连续轨迹建模"
date: "2025-04-29"
summary: "系统讲解扩散模型的核心思想、局限性，以及 Flow Matching 的数学原理与优雅之处。"
tags: ["ai", "diffusion", "flow-matching"]
---

# 扩散模型与流匹配学习指南：从噪声生成到连续轨迹建模

近年来，生成模型发展迅速，从 GAN、VAE 到扩散模型（Diffusion Models），再到近年的 Flow Matching（流匹配）。如果说扩散模型代表了"逐步去噪生成"，那么流匹配则代表了一种更直接、更优雅的连续生成建模方式。

这篇博客将系统讲解：

1. 扩散模型的核心思想
2. 为什么扩散模型有效
3. 扩散模型的局限性
4. Flow Matching 的提出动机
5. Flow Matching 数学原理
6. 与 Diffusion 的关系
7. 实际应用与未来方向

---

## 一、扩散模型：从随机噪声中生成数据

### 1.1 基本思想

扩散模型的核心流程分两步：

**正向过程（Forward Process）**

逐步向真实数据加入噪声，直到变成纯高斯噪声：

$$x_0 \sim p_{data}(x)$$

然后不断加噪：

$$q(x_t|x_{t-1}) = \mathcal{N}(\sqrt{1-\beta_t}x_{t-1}, \beta_t I)$$

经过很多步后：

$$x_T \approx \mathcal{N}(0,I)$$

也就是说：

> 任何图片最终都能被摧毁成随机噪声。

**反向过程（Reverse Process）**

训练神经网络学习如何逆转这个过程：

$$p_\theta(x_{t-1}|x_t)$$

从纯噪声一步步恢复图像：

$$x_T \rightarrow x_{T-1} \rightarrow ... \rightarrow x_0$$

### 1.2 为什么有效？

因为"加噪容易，去噪可学习"。

每一步只恢复一点点信息，比 GAN 一次生成整张图稳定很多。

这也是 Stable Diffusion 成功的重要原因。

---

## 二、扩散模型的问题

虽然强大，但扩散模型存在几个明显问题：

### 2.1 采样慢

需要几十步、上百步迭代：

- DDPM：1000步
- DDIM：50步
- 高质量模型：20~100步

相比 GAN 一步生成，速度慢很多。

### 2.2 路径不是最优的

扩散模型本质是在学习：

> 如何沿着"加噪的反方向"回去。

但这条路径未必是最短路径，也未必最自然。

### 2.3 离散时间训练复杂

需要设计：

- β schedule
- variance schedule
- score parameterization
- sampler

系统较复杂。

---

## 三、Flow Matching：一种新的生成视角

Flow Matching 的思想非常优雅：

> 不学习去噪，而是直接学习"数据如何移动"。

### 3.1 一个直觉例子

假设：

初始噪声点：

$$x_1 \sim \mathcal N(0,I)$$

真实图片：

$$x_0 \sim p_{data}$$

我们希望学习一条轨迹：

$$x_t$$

让噪声逐渐变成图片。

就像：

- 一团墨水逐渐变成猫
- 云雾逐渐凝聚成人脸

---

## 四、核心数学原理

### 4.1 连续动力系统

定义 ODE：

$$\frac{dx_t}{dt}=v_\theta(x_t,t)$$

其中：

- $x_t$：时刻 t 的样本
- $v_\theta$：神经网络预测速度场

意思是：

> 每个位置、每个时间点，网络告诉你往哪里走。

### 4.2 采样过程

给定初始噪声：

$$x_1 \sim \mathcal N(0,I)$$

积分 ODE：

$$x_1 \rightarrow x_{0.9} \rightarrow x_{0.8}\rightarrow ... \rightarrow x_0$$

最终得到真实图像。

---

## 五、Flow Matching 怎么训练？

关键问题：

> 我们不知道真实速度场是什么。

于是论文提出：

**条件路径（Conditional Path）**

先人为定义：

$$x_t = (1-t)x_0 + t x_1$$

表示：

- t=0 是真实图像
- t=1 是噪声
- 中间线性插值

对应真实速度：

$$u_t = x_1-x_0$$

于是训练网络拟合：

$$\mathcal L = \mathbb E |v_\theta(x_t,t)-u_t|^2$$

这就是 Flow Matching。

---

## 六、为什么说它比扩散模型优雅？

### 6.1 不需要逐步加噪

扩散模型：先设计破坏过程，再学逆过程。

Flow Matching：直接学从噪声到数据的运动规律。

### 6.2 路径自由设计

可以用：

- **线性路径**：$x_t=(1-t)x_0+t x_1$
- **Optimal Transport 路径**：最短运输路径
- **曲线路径**：适合复杂流形

### 6.3 更快采样

因为 ODE 可高效求解（Euler、RK45、Heun），通常步数更少。

---

## 七、它和扩散模型的关系

这是重点。

扩散模型本质也在学向量场。Score-based diffusion 学的是：

$$\nabla_x \log p_t(x)$$

而概率流 ODE：

$$\frac{dx}{dt}=f(x,t)-\frac12 g(t)^2 \nabla_x \log p_t(x)$$

这说明：

> 扩散模型最终也可写成一个流。

所以可以理解为：

- Diffusion：间接学流（通过score）
- Flow Matching：直接学流（通过velocity）

---

## 八、为什么说 ODE 走的是直线？

很多人误解这一点。

ODE 本身不要求直线。若速度恒定：

$$\frac{dx}{dt}=c$$

才是直线。

若：

$$\frac{dx}{dt}=v(x,t)$$

速度随位置变化，则轨迹可以极其复杂。

Flow Matching 中线性插值只是训练监督路径，不代表真实采样轨迹必须直线。

---

## 九、实际代表工作

**扩散模型家族**：DDPM、DDIM、EDM、Stable Diffusion、Imagen

**Flow Matching 家族**：Flow Matching for Generative Modeling、Rectified Flow、Consistency Models（相关思想）、Stable Flow（新方向）

---

## 十、实际怎么理解最简单？

**扩散模型**：像雕塑家从石头上一点点凿出作品。

**Flow Matching**：像导航系统告诉每个粒子该怎么移动，最后自动组成作品。

---

## 十一、未来趋势

目前生成模型正在融合：

- Diffusion 的稳定性
- Flow 的高效性
- Consistency 的一步采样能力

未来可能出现：

> 单步高质量生成模型

---

## 十二、总结

一句话总结：

> 扩散模型学"如何去噪"，Flow Matching 学"如何运动"。

再一句：

> 扩散模型是通过随机过程建模生成；Flow Matching 是通过连续动力系统建模生成。

---

## 如果你正在学扩散模型，建议路线

1. DDPM
2. Score Matching
3. SDE/ODE unified view
4. Probability Flow ODE
5. Flow Matching
6. Rectified Flow
