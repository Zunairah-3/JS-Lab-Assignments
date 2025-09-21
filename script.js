const members = [
    {first_name:"John", last_name: "Doe", email:"johndoe@example.com", birthdate:"1999-12-31", salary:80000},
    {first_name:"Jane", last_name: "Smith", email:"janesmith@example.com", birthdate:"2015-09-01", salary:75000}
];



//OLD WAY DEMO - CONSTRUCTOR FUNCTION
//function Employee(firstName, lastName, email, birthdate, salary) {
   // this.firstName = firstName;
    //this.lastName = lastName;
    //this.email = email;
   //this.birthdate = birthdate;
   // this.salary = salary;
  //}

  //Employee.addEmployee = function(firstName, lastName, email, birthdate, salary) {
    //return new Employee(firstName, lastName, email, birthdate, salary);
  //};

  //Employee.prototype.editEmployee = function(updates) {
   // Object.assign(this, updates);
  //};

  // Usage example:
//  const bill = Employee.addEmployee("Bill", "Doe", "bill@example.com", "1990-01-01", 50000);
//console.log(bill);

  //bill.editEmployee({ salary: 7777777, email: "xxxxxxx@example.com" });
  //console.log(bill);


//ES6 way - CLASSES - Create a new Employee class that adds a new employee and console logs them
// Goals:
// 1. Create a new Employee class with a constructor for Employee giving them a firstname, lastname, email, and birthdate
// 2. Instantiate (i.e. create a new instance) of an Employee with your info and save it to a const with your first name
// 3. After step 2, console log your const and then try to console.log parts of the object
// 4. Then create a const array that creates many "new Employee" objects and says to an array.  Console this object as a whole and parts of it
// 5. Add methods to your class to "getEmployees" which just returns all the fields in the object.
//    Also add methods to addEmployee (this will be static) and a method to editEmployee
//    Test your methods using JS
// 6. Try to get instances of your class object to display in the table.  You can set the innerhtml of the
//    of the table to be empty and then replace it with the looped-through values of your object





//Try to output 3 instances of your class object into the table

// ES6 Employee class
class Employee {
  constructor(firstName, lastName, email, birthdate, salary) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthdate = birthdate;
    this.salary = salary;
  }

  // instance method
  getEmployee() {
    return `${this.firstName} ${this.lastName} | ${this.email} | ${this.birthdate} | $${this.salary}`;
  }

  // instance method to edit employee
  editEmployee(updates) {
    Object.assign(this, updates);
  }

  // static method (does not need an instance)
  static addEmployee(firstName, lastName, email, birthdate, salary) {
    return new Employee(firstName, lastName, email, birthdate, salary);
  }
}

// Step 2: Create an instance of Employee with my info
const zunairah = new Employee(
  "Zunairah",
  "Zubair",
  "zunairah@example.com",
  "2004-04-07",
  90000
);

// Console log the whole object
console.log(zunairah);

// Console log just parts of it
console.log(zunairah.firstName);   // "Zunairah"
console.log(zunairah.email);       // "zunairah@example.com"
console.log(zunairah.getEmployee()); // "Zunairah Zubair |
console.log(zunairah.salary);      // 90000
console.log(zunairah.birthdate);   // "2004-04-07"

// Step 3: Create an array of multiple employees
const employees = [
  new Employee("John", "Doe", "johndoe@example.com", "1999-12-31", 80000),
  new Employee("Jane", "Smith", "janesmith@example.com", "2015-09-01", 75000),
  zunairah  // add the instance you already made
];

// Console log the array
console.log(employees);

// Console log just one property from the array
console.log(employees[0].firstName);  // "John"
console.log(employees[1].email);      // "janesmith@example.com"
console.log(employees[2].getEmployee()); // "Zunairah Zubair | ..."
console.log(employees[0].salary);     // 80000
console.log(employees[1].birthdate);  // "2015-09-01" 
console.log(employees[2].lastName);   // "Zubair"

// Step 4: Function to render employees into the table
function renderEmployees(employeeArray) {
  const tbody = document.querySelector("#employeeTable tbody");
  tbody.innerHTML = ""; 

  employeeArray.forEach(emp => {
    const row = `<tr>
      <td>${emp.firstName}</td>
      <td>${emp.lastName}</td>
      <td>${emp.email}</td>
      <td>${emp.birthdate}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}
// Call it
renderEmployees(employees);

// Step 5: Connect Add Employee form
const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop page from refreshing

  // 1. Get values from the form inputs
  const firstName = document.querySelector("#first_name").value;
  const lastName = document.querySelector("#last_name").value;
  const email = document.querySelector("#email").value;
  const birthdate = document.querySelector("#birthdate").value;

  // 2. Create a new Employee
  const newEmp = new Employee(firstName, lastName, email, birthdate, 0);

  // 3. Push into employees array
  employees.push(newEmp);

  // 4. Re-render the table
  renderEmployees(employees);

  // 5. Clear the form
  form.reset();
});


// ==========================
// Part 2: Callbacks
// ==========================

// Function that verifies payment using a callback
function verifyPayment(orderTotal, callback) {
  console.log(`Verifying payment of $${orderTotal}...`);

  setTimeout(() => {
    if (orderTotal < 5000) {
      callback(null, `Payment of $${orderTotal} approved `);
    } else {
      callback(`Payment of $${orderTotal} requires manager approval`, null);
    }
  }, 2000); // simulate 2 sec delay
}

// Callback function to handle the result
function paymentResult(error, success) {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Success:", success);
  }
}

// Test cases
verifyPayment(3000, paymentResult); // should approve
verifyPayment(6000, paymentResult); // should reject


// ==========================
// Part 3: Promises
// ==========================
function verifyPaymentPromise(orderTotal) {
  console.log(`Verifying payment of $${orderTotal}...`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (orderTotal < 5000) {
        resolve(`Payment of $${orderTotal} approved`);
      } else {
        reject(`Payment of $${orderTotal} requires manager approval`);
      }
    }, 2000);
  });
}

// Test with then() and catch()
verifyPaymentPromise(3000)
  .then((msg) => console.log("Success:", msg))
  .catch((err) => console.log("Error:", err));

verifyPaymentPromise(6000)
  .then((msg) => console.log("Success:", msg))
  .catch((err) => console.log("Error:", err));

  // ==========================
// Part 4: Async/Await
// ==========================
async function handlePayment(orderTotal) {
  try {
    const result = await verifyPaymentPromise(orderTotal);
    console.log("Success:", result);
  } catch (error) {
    console.log("Error:", error);
  }
}

// Test
handlePayment(3000); // approved
handlePayment(6000); // requires manager approval

