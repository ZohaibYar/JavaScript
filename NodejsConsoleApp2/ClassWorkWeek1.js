class Employee {
    constructor(name, role, salary) {
        this.name = name;
        this.role = role;
        this.salary = salary;
    }
    GetEmpolyeeDetails() {
        console.log(`The Empolyee Name is ${this.name}, working as ${this.role} and has $${this.salary} salary`);
    }
    CalculateBouns() {
        console.log(`The Bonus of ${this.name} is: $${this.salary * (10 / 100)}`)

    }
}
const zohaib = new Employee("Zohaib Yar", "Network Administrator", 6000);
zohaib.GetEmpolyeeDetails();
zohaib.CalculateBouns();
class Manager extends Employee {
    constructor(name, role, salary, department) {
        super(name, role, salary);
        this.department = department;
        
    }
    GetManagerDetails() {
        console.log(`The Manager is name is ${this.name}, working as ${this.role} in ${this.department}.`);
    }
    CalculateManagerBounus() {
        console.log(`The Bonus of Manager ${this.name} is ${this.salary * .2}`);
    }
}
const ZohaibAsManager = new Manager("Zohaib Yar", "Network Engineer", 10000, "IT Department");
ZohaibAsManager.GetManagerDetails();
ZohaibAsManager.CalculateManagerBounus();