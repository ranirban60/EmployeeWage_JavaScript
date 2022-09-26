console.log("Welcome to Employee wage problem")

const NO_TIME = 0;
const IS_PART_TIME = 1;
const IS_FULL_TIME = 2;
const PART_TIME_HRS = 4;
const FULL_TIME_HRS = 8;
const WAGE_PER_HR = 20;
const WORKING_DAYS = 20;
const MAX_HRS_IN_MONTH = 160;
let empDailyWageArray = new Array();
let empDailyWageMap = new Map();
let empDailyHoursMap = new Map();
let empHrsAndWageArrayObject = new Array();

function calcWagesForAMonth() {
  let totalEmpHrs = 0;
  let days=0;

  while(days<WORKING_DAYS && totalEmpHrs<=MAX_HRS_IN_MONTH){
    let empType = Math.floor(Math.random() * 3);
    totalEmpHrs+=getWorkingHrs(empType)
    empDailyWageArray.push(calculateWage(getWorkingHrs(empType)));
    empDailyHoursMap.set(days+1, getWorkingHrs(empType));
    empDailyWageMap.set(days+1,calculateWage(getWorkingHrs(empType)));
    empHrsAndWageArrayObject.push(
      {
          day : days,
          dailyHrs : getWorkingHrs(empType),
          dailyWage : calculateWage(getWorkingHrs(empType)),
          toString(){
              return "\nDay "+this.day+" Working Hours "+this.dailyHrs+" Wage Earned : "+this.dailyWage
          } 
      });
    days++;
  }

  let empWageForMonth = totalEmpHrs * WAGE_PER_HR;
  console.log(`Total working days = ${days-1} 
    Total Hrs = ${totalEmpHrs}
    Total Wage for Month = ${empDailyWageArray.reduce((totalWage, dailyWage) => totalWage + dailyWage)}`)   //UC-7a Calc total Wage using reduce method

  return empWageForMonth;
}

function calculateWage(empHrs){
  return WAGE_PER_HR * empHrs
}

function getWorkingHrs(empType) {
  switch (empType) {
    case IS_PART_TIME: return PART_TIME_HRS;
    case IS_FULL_TIME: return FULL_TIME_HRS;
    default: return 0;
  }
}

calcWagesForAMonth();

//UC-7b show day along with daily wage using array map function
let day = 1;
let arrMap = empDailyWageArray.map(dailyWage => 'Day ' + day++ + ' Wage = ' + dailyWage);
console.log(arrMap);


//UC-7c Show Days when Full time wage of 160 were earned using filter function
let fullTimeWageArray = arrMap.filter(dailyWage => dailyWage.includes(160));
console.log('Days with full time wage: ')
console.log(fullTimeWageArray);

//UC-7d Find the first occurrence when Full Time Wage was earned using find function
console.log('First occurance of full time wage is Day: ' + (empDailyWageArray.findIndex(d => d==160)+1));

//UC-7e Check if Every Element of Full Time Wage is truly holding Full time wage
console.log(fullTimeWageArray.every(dw => dw.includes(160)));

//UC-7f Check if any part time Wage
console.log('Check is there any part time wage: ' + arrMap.some(dw => dw.includes(80)));

//UC-7g Find number of days employee worked
let workingDays = empDailyWageArray.filter(dw => dw>0);
console.log("Number of days Employee worked = "+workingDays.length);

//UC-8 Map Functions
console.log(empDailyWageMap);
console.log("Total Wage for a month = "+ Array.from(empDailyWageMap.values()).reduce((totalWage,dailyWage) => totalWage+dailyWage));

//UC-9 Arrow Functions
const findTotal = (totalValue, dailyValue) => {
  return totalValue + dailyValue;
}
let count = 0;
let totalHours = Array.from(empDailyHoursMap.values()).reduce(findTotal, 0);
let totalWage = empDailyWageArray.filter(dailyWage => dailyWage > 0).reduce(findTotal, 0);
console.log("Employee Wage Using Arrow Function : \nTotal Hours : " + totalHours + "\nTotal Employee Wage : " + totalWage);

let nonWorkingDays = new Array();
let partTimeWorkingDays = new Array();
let fullTimeWorkingDays = new Array();
empDailyHoursMap.forEach((value, key) => {
  if(value == 8)
      fullTimeWorkingDays.push(key);
  else if(value == 4){
      partTimeWorkingDays.push(key);
  }
  else
      nonWorkingDays.push(key);
});

console.log("Full Working Days : " + fullTimeWorkingDays);
console.log("Part Working Days : " + partTimeWorkingDays);
console.log("Non Working Days : " + nonWorkingDays);


//UC-10 Object Creation
console.log("Daily Hours Worked and Wage Earned : "+empHrsAndWageArrayObject);

//UC-11 Employee Payroll Data Class
class EmployeePayRollData {
  //Property
  id;
  name;
  salary;

  //constructor
  constructor(id, name, salary) {
    this.id = id;
    this.name = name;
    this.salary = salary;
  }

  //getter and setter method
  getid(){ return this.id}
  setId(Id) { this.id = Id}

  getname() { return this.name}
  setname(Name) { this.name = Name}

  getsalary() { return this.salary}
  setSalary(Salary) { this.salary = Salary}

  //to string method
  toString() {
    return 'id=' + this.id + ', name=' + this.name + ', salary=' + this.salary;
  }
}

let employeePayRollData = new EmployeePayRollData(1, 'Mark', 30000);
console.log(employeePayRollData.toString());
employeePayRollData.name = 'John'
console.log(employeePayRollData.toString());
employeePayRollData.setId(3);
employeePayRollData.setname('Thomas');
employeePayRollData.setSalary('500000');
console.log(employeePayRollData.toString());

//UC-11a Calc total Wage and total hours worked
let totalWages = empHrsAndWageArrayObject
                  .filter(hrsAndWageObj => hrsAndWageObj.dailyWage>0 )
                  .reduce((totalWage, hrsAndWageObj) => totalWage+= hrsAndWageObj.dailyWage, 0 );

let totalHrs = empHrsAndWageArrayObject
                  .filter(hrsAndWageObj => hrsAndWageObj.dailyWage>0 )
                  .reduce((totalHrs, hrsAndWageObj) => totalHrs+= hrsAndWageObj.dailyHrs, 0 );

console.log('\nUC-11a Total hrs = ' + totalHrs + ' Total wages = ' + totalWages);

//UC-11b show the full workings days using foreach
console.log('\nUC-11b Show full working days: ')
empHrsAndWageArrayObject.filter(hrsAndWageObj => hrsAndWageObj.dailyHrs==8)
                        .forEach(hrsAndWageObj => console.log(hrsAndWageObj.toString()));

//UC-11c Show Part working days using Map by reducing to String Array
console.log('\nUC-11c Show part working days: ')
let partWorkingDaysStrArr = empHrsAndWageArrayObject
                              .filter(hrsAndWageObj => hrsAndWageObj.dailyHrs==4)
                              .map(hrsAndWageObj => hrsAndWageObj.toString());

console.log(partWorkingDaysStrArr);

//UC-11d No working days only using Map function
console.log('\nUC-11d Show non working days: ')
let nonWorkingDaysStrArr = empHrsAndWageArrayObject
                              .filter(hrsAndWageObj => hrsAndWageObj.dailyHrs==0)
                              .map(hrsAndWageObj => hrsAndWageObj.toString());

console.log(nonWorkingDaysStrArr);

//UC-12 Extend Employee Payroll Data Class
//UC13- Use Regex Pattern
class EmployeePayrollData {

  constructor(...params) {
      this.id = params[0];
      this.name = params[1];
      this.salary = params[2];
      this.gender = params[3];
      this.startDate = params[4];
  }

  get id() {
      return this._id;
  }

  set id(id) {
      this._id = id;
  }

  get name() {
      return this._name;
  }

  set name(name) {
      let nameRegex = RegExp('^[A-Z]{1}[a-z]{3,}$');
      if(nameRegex.test(name))
          this._name = name;
      else
          throw 'Name is Incorrect';
  }

  get salary() {
      return this._salary;
  }

  set salary(salary) {
      this._salary = salary;
  }

  get gender() {
      return this._gender;
  }

  set gender(gender) {
      this._gender = gender;
  }

  get startDate() {
      return this._startDate;
  }

  set startDate(startDate) {
      this._startDate = startDate;
  }

  toString() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const employeeDate = this.startDate == undefined ? "undefined" : this.startDate.toLocaleDateString("en-us", options);
      return "Id = " + this.id + ", Name = " + this.name + ", Gender = " + this.gender + ", Salary = " + this.salary + ", Start Date = " + employeeDate;
  }
}

let employeePayrollData = new EmployeePayrollData(1, "Mark", 30000);
console.log(employeePayrollData.toString());

try{
  employeePayrollData.id = 0;
  employeePayrollData.name = "John";
  console.log(employeePayrollData.toString());
  employeePayrollData.id = 2;
  employeePayrollData.name = "Joh";
  console.log(employeePayrollData.toString());
}
catch(e){
  console.error(e);
}


let newEmployeePayrollData = new EmployeePayrollData(1, "Teresa", 50000, "F", new Date());
console.log(newEmployeePayrollData.toString());