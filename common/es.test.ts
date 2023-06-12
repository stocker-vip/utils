import { EventSourceControl } from "./es.ts";

const eventSourceControl = new EventSourceControl("https://example.com/events", {
  message: (event: MessageEvent) => {
    console.log("收到消息：", event.data);
  },
  open: () => {
    console.log("连接已打开");
  },
  error: (event: MessageEvent) => {
    console.error("连接发生错误：", event);
  },
  close: () => {
    console.log("连接已关闭");
  },
});

// 启动 EventSource 连接
eventSourceControl.start();

// 运行一段时间后停止连接
setTimeout(() => {
  eventSourceControl.stop();
}, 60000);