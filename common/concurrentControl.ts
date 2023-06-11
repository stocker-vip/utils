export class ConcurrentControl
{
    constructor ( private maxConcurrency: number ) { }

    private runningCount = 0;
    private queue: ( () => void )[] = [];

    private runNext ()
    {
        if ( this.runningCount >= this.maxConcurrency || this.queue.length === 0 )
        {
            return;
        }

        // 从队列中取出下一个任务并执行
        const task = this.queue.shift()!;
        this.runningCount++;
        task();

        // 递归执行下一个任务
        this.runNext();
    }

    async execute<T> ( task: () => Promise<T> ): Promise<T>
    {
        return new Promise<T>( ( resolve, reject ) =>
        {
            // 将任务放入队列中
            this.queue.push( async () =>
            {
                try
                {
                    const result = await task();
                    resolve( result );
                } catch ( error )
                {
                    reject( error );
                } finally
                {
                    this.runningCount--;
                    this.runNext();
                }
            } );

            // 如果当前未达到最大并发数，立即执行任务
            this.runNext();
        } );
    }
}

/* DEMO
const control = new ConcurrentControl(2); // 最大并发数为 2

const tasks = [
  async () => {
    console.log("开始执行任务 1");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("任务 1 执行完毕");
  },
  async () => {
    console.log("开始执行任务 2");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("任务 2 执行完毕");
  },
  async () => {
    console.log("开始执行任务 3");
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("任务 3 执行完毕");
  },
];

Promise.all(tasks.map((task) => control.execute(task))).then(() => {
  console.log("所有任务执行完毕");
});

*/