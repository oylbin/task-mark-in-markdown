# README

```
* 这是一行正常的markdown文本。
* **TODO** 这是一行文本，表示代办事项。
* [done] 这是一行文本，表示已经完成的事项。
* **TODO P1** 这是一行文本，表示优先级为1的代办事项。
* **TODO P2** 这是一行文本，表示优先级为2的代办事项。
```

* 用`ctrl+t`修改光标所在行的状态：代办事项 / 已完成事项 / 无标记。
* 用`ctrl+1`,`ctrl+2`,`ctrl+3`,`ctrl+0`设置优先级。

## 构建

    vsce package

## 安装

    code --install-extension task-mark-in-markdown-0.0.1.vsix
