import React, { Component} from "react";
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

export default class Selecion extends  Component{

    constructor(){
      super();
      this.state = {
        days: ""
    };
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
        console.log(this.state.days);
        const mail = { 
          department: await AsyncStorage.getItem("department"),
          days: this.state.days
         };
        const sub = await Axios.post("https://noti5backend.herokuapp.com/shiftTimetableDay", mail);
        window.alert("Days Shifted!");
        this.props.navigation.navigate('AdminTimetable');
    }
    render(){
  return (
    <ScrollView style={styles.container1}>
      <View style={styles.header}>
    <Text style={styles.heading}>Shift by Days</Text>
    </View>
    <View style={styles.container}>
      <View style={styles.ellipseStack}>
        <View style={styles.settingsList}>
          <View style={styles.accountSettings}>
            <View style={styles.subSettings}>
              <View style={styles.editProfileColumn}>
                <View style={styles.editProfile}>
                  <Text style={styles.enterWorkingDays}>
                    Number of days to be shifted:
                  </Text>
                </View>
                <TextInput
                  placeholder="Number of days"
                  keyboardType='numeric'
                  style={styles.textInput}
                  onChangeText={(value) => this.setState({days: value})}
                  value={this.state.days}
                ></TextInput>
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
    width: 290
  },
  enterWorkingDays: {
    color: "#147383",
    fontSize: 16,
    marginTop: 7,
    fontWeight: "bold",
    marginLeft: 10
  },
  textInput: {
    height: 40, 
    borderColor: '#45A2B5', 
    opacity: 0.5,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 25,
    borderRadius: 20,
    paddingLeft: 15
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
    marginTop: 71,
    marginLeft: -159,
    marginRight: -159
  },
  shiftByDay: {
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