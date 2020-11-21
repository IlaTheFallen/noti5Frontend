
import React,{Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from './page/Home';
import Student from './page/Student';
import StudentTimeTable from './page/StudentTimeTable';
import StaffTimeTable from './page/StaffTimeTable';
import Staff from './page/Staff';
import AdminTimetable from './page/AdminTimetable';
import Admin from './page/Admin';
import Login from './page/Login';
import Signup from './page/Signup';
import createTimetableInfo from './page/createTimetableInfo';
import createTimings from './page/createTimings';
import addSubjects from './page/addSubjects';
import addStaffs from './page/addStaffs';
import setTimetable from './page/setTimetable';
import noti5 from './page/noti5';
import Login1 from './page/Login1';
import setDefaultLink from './page/setDefaultLink';
import Selection from './page/Selection';
import DateShift from './page/DateShift';
import DayShift from './page/DayShift';
import stuTimeTable from './page/stuTimeTable';
import stfTimeTable from './page/stfTimeTable';
import setClassInfo from './page/setClassInfo';

const App=createStackNavigator({
    Home:{screen:Home,navigationOptions: {
        headerShown: false,
    }},
    Student:{screen:Student,navigationOptions: {
        headerShown: false,
    }},
    StudentTimeTable:{screen:StudentTimeTable,navigationOptions: {
        headerShown: false,
    }},
    StaffTimeTable:{screen:StaffTimeTable,navigationOptions: {
        headerShown: false,
    }},
    Staff:{screen:Staff,navigationOptions: {
        headerShown: false,
    }},
    AdminTimetable:{screen:AdminTimetable,navigationOptions: {
        headerShown: false,
    }},
    Admin:{screen:Admin,navigationOptions: {
        headerShown: false,
    }},
    Login:{screen:Login,navigationOptions: {
        headerShown: false,
    }},
    Signup:{screen:Signup,navigationOptions: {
        headerShown: false,
    }},
    createTimetableInfo:{screen:createTimetableInfo,navigationOptions: {
        headerShown: false,
    }},
    createTimings:{screen:createTimings,navigationOptions: {
        headerShown: false,
    }},
    addSubjects:{screen:addSubjects,navigationOptions: {
        headerShown: false,
    }},
    addStaffs:{screen:addStaffs,navigationOptions: {
        headerShown: false,
    }},
    setTimetable :{screen:setTimetable,navigationOptions: {
        headerShown: false,
    }},
    noti5:{screen:noti5,navigationOptions: {
        headerShown: false,
    }},
    Login1:{screen:Login1,navigationOptions: {
        headerShown: false,
    }},
    setDefaultLink:{screen:setDefaultLink,navigationOptions: {
        headerShown: false,
    }},
    Selection:{screen:Selection,navigationOptions:{
        headerShown: false,
    }},
    DateShift:{screen:DateShift,navigationOptions:{
        headerShown: false,
    }},
    DayShift:{screen:DayShift,navigationOptions:{
        headerShown: false,
    }},
    stuTimeTable:{screen:stuTimeTable,navigationOptions:{
        headerShown: false,
    }},
    stfTimeTable:{screen:stfTimeTable,navigationOptions:{
        headerShown: false,
    }},
    setClassInfo:{screen:setClassInfo,navigationOptions:{
        headerShown: false,
    }}
    
});

export default createAppContainer(App);
