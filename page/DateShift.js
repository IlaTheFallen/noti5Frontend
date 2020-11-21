import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
  ScrollView
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";

export default class MyDatePicker extends Component {
  constructor(){
    super();
    this.state = {
      from:"",
      to: ""
    }
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  proceed = async() => {

    const mail = { 
      department: await AsyncStorage.getItem("department"),
      leaveStart_day: this.state.from,
      leaveFinal_day: this.state.to
     };
    const sub = await Axios.post("https://noti5backend.herokuapp.com/shiftTimetableDate", mail);
    this.props.navigation.navigate('AdminTimetable');
} 

  render(){
  return (
    <ScrollView style={styles.container1}>
      <View style={styles.header}>
    <Text style={styles.heading}>Shift by Date</Text>
    </View>
    <View style={styles.container}>
      <View style={styles.ellipseStack}>
        <View style={styles.settingsList}>
          <View style={styles.accountSettings}>
            <View style={styles.subSettings}>
              <View style={styles.editProfileColumn}>
                  <Text style={styles.selectTheDate}>Shift timetable from:</Text>
        <DatePicker
        style={{width: "90%", marginTop: 20}}
        date={this.state.from}
        mode="date"
        placeholder="From date"
        format="YYYY-MM-DD"
        minDate="2020-01-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36,
            borderRadius: 20
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({from: date})}}
      />

<Text style={styles.selectTheDate}>To:</Text>
        <DatePicker
        style={{width: "90%", marginTop: 10, marginBottom: 35}}
        date={this.state.to}
        mode="date"
        placeholder="To date"
        format="YYYY-MM-DD"
        minDate="2020-01-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36,
            borderRadius: 20
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({to: date})}}
      />

              </View>
              <TouchableOpacity
                onPress={this.proceed}
                style={styles.button1}
              >
                <Text style={styles.proceed}>PROCEED</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
    </ScrollView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: 600
  },
  header: {
    height: 85,
    backgroundColor: "#1fb2cc"
    },
    heading: {
        textAlign: "center",
        alignSelf: "center",
        fontSize: 24,
        fontWeight:"bold",
        color: "#fff",
        marginTop: 27
    },
  container1: {
    backgroundColor: "#fff",
    width: "100%"
  },
  ellipse: {
    top: 0,
    width: 678,
    height: 702,
    position: "absolute",
    transform: [{rotate: "90.00deg"}],
    left: 0
  },
  settingsList: {
    left: 161,
    height: 458,
    position: "absolute",
    right: 159,
    bottom: 158
  },
  accountSettings: {
    height: 343,
    marginTop: 15,
    marginLeft: 24,
    marginRight: 24
  },
  subSettings: {
    height: 324,
    marginTop: 27
  },
  editProfile: {
    height: 34,
    width: "100%"
  },
  selectTheDate: {
    color: "#147383",
    fontSize: 16,
    marginTop: 7,
    fontWeight: "bold"
  },
  textInput: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 32,
    width: "100%",
    marginTop: 22
  },
  editProfileColumn: {
    width: "100%",
    marginTop: 23,
    marginLeft: 10
  },
  editProfileColumnFiller: {
    flex: 1
  },
  button1: {
    backgroundColor: "rgba(31,178,204,1)",
      borderRadius: 5,
      justifyContent: "center",
      height: 50,
      marginTop: 10,
      width: "60%",
      textAlign: "center",
      alignSelf: "center"
  },
  proceed: {
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontWeight: "bold"
  },
  ellipseStack: {
    height: 702,
    marginLeft: -159,
    marginRight: -159
  },
  shiftByDate: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    width: 197,
    height: 28,
    textAlign: "center",
    marginTop: -747,
    marginLeft: 82,
    fontWeight: "bold"
  }
});