console.log("Welcome to Employee wage problem")
const IS_ABSENT = 0;

let attendance = Math.floor(Math.random() * 2);
if (attendance == IS_ABSENT) {
  console.log('Employee is absent');
  return;
}else{
  console.log('Employee is present');
}