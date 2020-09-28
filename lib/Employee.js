// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name=name;
        this.id = id,
        this.email=email;
    }

    printInfo() {
        console.log(`Employee name: ${this.name}`);
        console.log(`Employee ID: ${this.id}`);
        console.log(`Employee e-mail: ${this.email}`);
    }
    

}




module.exports = Employee; 
