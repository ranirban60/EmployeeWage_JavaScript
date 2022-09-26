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

function calcWagesForAMonth() {
  let totalEmpHrs = 0;
  let days=0;

  while(days<WORKING_DAYS && totalEmpHrs<=MAX_HRS_IN_MONTH){
    let empType = Math.floor(Math.random() * 3);
    totalEmpHrs+=getWorkingHrs(empType)
    empDailyWageArray.push(calculateWage(getWorkingHrs(empType)));
    empDailyHoursMap.set(days+1, getWorkingHrs(empType));
    empDailyWageMap.set(days+1,calculateWage(getWorkingHrs(empType)));
    days++;
  }

  let empWageForMonth = totalEmpHrs * WAGE_PER_HR;
  console.log(`Total working days = ${days} 
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

//UC9 Working hours on a particular day

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