class ToDoLIstClass {
    constructor() {
        this.arr = [];
        this.count = 0;
                    }
    addTask(task) {
        this.arr.push(task);
        console.log(`you have added "${task}", in your task list`);
        this.count++;
    }
    removeTask(task) {
        this.arr.pop(task);
        console.log(`You have removed "${task}" from your task list`);
        this.count--;
    }
    showTask() {
        for (let i = 0; i < this.arr.length; i++) {
            console.log(`Task "${this.arr[i]}"`);
        }
    }
    getTotalTask() {
        console.log(`Total tasks are: ${this.count} `);
    }
}
const Monday = new ToDoLIstClass;

Monday.addTask("breakfast");
Monday.addTask("University");
Monday.addTask("prayers");
Monday.getTotalTask();
Monday.showTask();
Monday.removeTask("breakfast");
Monday.showTask();

