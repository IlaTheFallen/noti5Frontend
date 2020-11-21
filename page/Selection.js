import React, { Component} from "react";
import { StyleSheet, View, Text, TouchableOpacity, BackHandler } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Svg, { Ellipse } from "react-native-svg";
  
  export default class Selecion extends  Component {

    constructor(){
      super();
      this.state = {
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

    timetable = () => {
        this.props.navigation.navigate('DayShift');
    }
    
    shift = () => {
        this.props.navigation.navigate('DateShift');
    }

      render(){
    return (
      <ScrollView style={styles.container1}>
        <View style={styles.header}>
    <Text style={styles.heading}>Add Timings</Text>
    </View>
      <View style={styles.container}>
        <Text style={styles.shiftDateDay}>SHIFT DAYS</Text>
        <View style={styles.shiftDateDayFiller}></View>
        <View style={styles.ellipseStack}>
          <TouchableOpacity
            onPress={this.timetable}
            style={styles.group}
          >
            <Text style={styles.shiftByDay}>SHIFT BY DAY</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.shift}
            style={styles.group2}
          >
            <Text style={styles.shiftByDate}>SHIFT BY DATE</Text>
          </TouchableOpacity>
          <View style={styles.settingsList}></View>
        </View>
      </View>
      </ScrollView>
    );
      }
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      width: "100%"
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
    shiftDateDay: {
      color: "rgba(255,255,255,1)",
      fontSize: 24,
      width: 197,
      height: 28,
      textAlign: "center",
      marginTop: 26,
      marginLeft: 82,
      fontWeight: "bold"
    },
    shiftDateDayFiller: {
      flex: 1
    },
    group: {
      backgroundColor: "rgba(31,178,204,1)",
      borderRadius: 5,
      justifyContent: "center",
      marginTop: 100,
      height: 60,
      width: "40%",
      textAlign: "center",
      alignSelf: "center"
    },
    group2: {
      backgroundColor: "rgba(31,178,204,1)",
      borderRadius: 5,
      justifyContent: "center",
      marginTop: 50,
      height: 60,
      width: "40%",
      textAlign: "center",
      alignSelf: "center"
    },
    shiftByDay: {
      color: "rgba(255,255,255,1)",
      width: 121,
      textAlign: "center",
      alignSelf: "center",
      fontWeight: "bold"
    },
    shiftByDate: {
      color: "rgba(255,255,255,1)",
      width: 127,
      textAlign: "center",
      alignSelf: "center",
      fontWeight: "bold"
    },
    settingsList: {
      left: 161,
      position: "absolute",
      right: 159,
      bottom: 158
    },
    ellipseStack: {
      height: 500,
      marginBottom: -33,
      marginLeft: -159,
      marginRight: -159
    }
  });

  