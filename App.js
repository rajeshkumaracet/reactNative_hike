import React from "react";
import EmpApp from "./src/EmpApp";
import {createStore} from "redux";
import {Provider} from "react-redux";

//Inital State
const initState = {
  1: {
    empid: 1,
    empName: "Prakash",
    empSalary: 10000
  },
  2: {
    empid: 2,
    empName: "Rajesh",
    empSalary: 20000
  },
  3: {
    empid: 3,
    empName: "Raghul",
    empSalary: 30000
  },
  4: {
    empid: 4,
    empName: "Vinoth",
    empSalary: 40000
  },
  5: {
    empid: 5,
    empName: "Surendar",
    empSalary: 50000
  }
};
//Create Reducer
const reducer = (state = initState, action) => {
  let initalSalary, increment, newSalary, employeeObject;

  if (action.id) {
    initalSalary = state[action.id].empSalary;
    increment = (initalSalary / 100) * 20;
  }
  switch (action.type) {
    case "GOOD_PERFORMANCE":
      newSalary = initalSalary + increment;
      employeeObject = state[action.id];
      employeeObject.empSalary = newSalary;
      return Object.assign({}, state);

    case "BAD_PERFORMANCE":
      newSalary = initalSalary - increment;
      employeeObject = state[action.id];
      employeeObject.empSalary = newSalary;
      return Object.assign({}, state);
  }
  return state;
};

//Passing Reducer
const store = createStore(reducer);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <EmpApp />
      </Provider>
    );
  }
}

export default App;
