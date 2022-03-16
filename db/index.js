const connection = require('./connection');

class DB  {
    constructor(connection) {
        this.connection = connection;
    }
        
    allDepartments() {
        return this.connection.promise().query(
            'SELECT id as ID, name as Department FROM department',
        );
    }

    allRoles() {
        return this.connection.promise().query(
            'SELECT role.id as ID, title as Title, salary as Salary, department.name as Department FROM role LEFT JOIN department ON role.department_id = department.id',
        );
    }

    onlyRoles() {
        return this.connection.promise().query(
            'SELECT id, title as role FROM role',
        );
    }

    allEmployees() {
        return this.connection.promise().query(
    
            'SELECT employee.id AS ID, CONCAT(employee.first_name, " ", employee.last_name) AS Name, department.name AS Department,  role.title as Role, role.salary AS Salary, CONCAT(manager.first_name, " ",manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id'
        );
    }

    onlyManagers() {
        return this.connection.promise().query(
            'SELECT id,  CONCAT(employee.first_name, " ", employee.last_name) AS name FROM employee WHERE manager_id IS NULL',
        );
    }

    addDepartment(department) {
        return this.connection.promise().query(
            'INSERT INTO department SET ?', department,
            
        );
    }
    addRoles(name, salary, id) {
        return this.connection.promise().query(
            'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [name, salary, id]
    );
}

    addEmployee(firstName, lastName, position, manager) {
        return this.connection.promise().query(
           'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, position, manager] 
        );
    }

    updateEmployee(employee, position, manager_id) {
        return this.connection.promise.query(
            'UPDATE employee SET first_name =?, last_name = ?, role_id = ?, manager_id = ? WHERE CONCAT(first_name, last_name) = ?, role_id = ?, manager_id = ?'[employee, position, manager_id]
           
        );
    }

}

module.exports = new DB(connection);