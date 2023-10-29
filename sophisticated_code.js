/*
 * Filename: sophisticated_code.js
 * Content: An example of a complex JavaScript code that demonstrates various advanced features and concepts.
 */

// Employee class
class Employee {
  constructor(name, age, salary) {
    this.name = name;
    this.age = age;
    this.salary = salary;
  }

  getDescription() {
    return `${this.name} is ${this.age} years old and earns ${this.salary} per month.`;
  }

  getAnnualSalary() {
    return this.salary * 12;
  }
}

// Department class
class Department {
  constructor(name) {
    this.name = name;
    this.employees = [];
  }

  addEmployee(employee) {
    this.employees.push(employee);
  }

  getAverageSalary() {
    if (this.employees.length === 0) return 0;

    let total = 0;
    for (let employee of this.employees) {
      total += employee.salary;
    }

    return total / this.employees.length;
  }

  getEmployeeNamesStartingWith(letter) {
    let employeeNames = [];
    for (let employee of this.employees) {
      if (employee.name.charAt(0).toLowerCase() === letter.toLowerCase()) {
        employeeNames.push(employee.name);
      }
    }

    return employeeNames;
  }
}

// Create employees
const employee1 = new Employee("John Doe", 30, 5000);
const employee2 = new Employee("Jane Smith", 25, 4000);
const employee3 = new Employee("Adam Johnson", 35, 6000);

// Create department
const department = new Department("Finance");

// Add employees to the department
department.addEmployee(employee1);
department.addEmployee(employee2);
department.addEmployee(employee3);

// Print employee descriptions
console.log(employee1.getDescription());
console.log(employee2.getDescription());
console.log(employee3.getDescription());

// Print average salary of the department
console.log(`Average Salary: $${department.getAverageSalary()}`);

// Print names of employees starting with 'J'
console.log("Employees starting with 'J':", department.getEmployeeNamesStartingWith('J'));