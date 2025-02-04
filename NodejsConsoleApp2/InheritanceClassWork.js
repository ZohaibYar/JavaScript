class ElectronicDevice {

    constructor(brand, PowerStatus = false) {
        this.brand = brand;
        this.PowerStatus = PowerStatus;

    }
    PowerOn() {
        this.PowerStatus = true;
        console.log(`The ${this.brand} is starting`);
    }
    PowerOff() {
        this.PowerStatus = false;
        return `This ${this.brand} is power shuting down`;
    }
    CheckPowerStatus() {
        return this.PowerStatus ? `The device ${this.brand} is ON` : `The device ${this.brand} is OFF`;
    }
}
class Mobile extends ElectronicDevice {
    constructor(brand, PowerStatus, Model, BatteryLife) {
        super(brand, PowerStatus);
        this.Model = Model;
        this.BatteryLife = BatteryLife;
    }
    GetMobileDetails() {
        return `The device name is : ${this.brand}, Model is: ${this.Model}, Having battery life of ${this.BatteryLife}.`;

    }
    MakeCall(number) {
        if (this.PowerStatus) {
            console.log(`Calling ${number} ...`);
        }
        else {
            console.log(`You cannot call this number please turn on the device`);
        }
    }
}
const s1 = new Mobile("Samsung", false, "S25 Ultra", 25);
console.log(s1.GetMobileDetails());
console.log(s1.CheckPowerStatus());
s1.MakeCall(0342342);
