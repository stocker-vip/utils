import { EventSource } from "https://deno.land/x/eventsource@v0.0.3/mod.ts"

export type EventHandler<T extends Event> = (event: T) => void;

export class EventSourceControl {
    private eventSource?: EventSource;
  
    constructor(private url: string, private eventHandlers: { [eventName: string]: EventHandler<MessageEvent> }) {}
  
    start() {
      // 如果已经存在 EventSource 对象，则不需要再次创建
      if (this.eventSource) {
        return;
      }
  
      this.eventSource = new EventSource(this.url);
      this.eventSource.onerror = (event) => {
        console.error("连接发生错误：", event);
        this.eventSource = undefined;
        this.start()
      }
  
      // 注册事件处理函数
      for (const [eventName, eventHandler] of Object.entries(this.eventHandlers)) {
        this.eventSource.addEventListener(eventName, eventHandler as EventListener);
      }
    }
  
    stop() {
      if (this.eventSource) {
        this.eventSource.close();
        this.eventSource = undefined;
      }
    }
  }

/* DEMO
// 创建一个 EventSourceControl 对象
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
*/