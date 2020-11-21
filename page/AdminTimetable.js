import React, { Component } from "react";
import { StyleSheet, View, Text, Image, BackHandler } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";

export default class AdminTimetable extends Component{

constructor() {
  super();   
  this.state = {
    email: "",
    name: ""
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
  BackHandler.exitApp();
  return true;
}

  componentDidMount = async() =>{
    var x= await AsyncStorage.getItem("name"); 
    var y= await AsyncStorage.getItem("email"); 
    this.setState({name:x,email:y});
  }

  proceed = () => {
    AsyncStorage.setItem("email", " ");
    AsyncStorage.setItem("name"," ")
    AsyncStorage.removeItem("role");
    this.props.navigation.navigate('Home');
    
}

timetable = () => {
  this.props.navigation.navigate('createTimetableInfo');
}

time = () => {
this.props.navigation.navigate('createTimings');
}

subjects = () => {
this.props.navigation.navigate('Login1');
}

staff = () => {
this.props.navigation.navigate('addStaffs');
}

selection = () => {
  this.props.navigation.navigate('Selection');
}

  render(){
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.ellipseStack}>
        <Svg viewBox="0 0 859.43 890.3" style={styles.ellipse}>
          <Ellipse
            strokeWidth={1}
            fill="rgba(255,255,255,1)"
            cx={430}
            cy={445}
            rx={429}
            ry={445}
          ></Ellipse>
        </Svg>
        <View style={styles.settingsList}>
          <View style={styles.accountSettings}>
            <Text style={styles.adminOptions}>Admin Options</Text>
            <View style={styles.subSettings}>
              <View style={styles.editProfileColumn}>
                <View style={styles.group2}>
                  <Text style={styles.addUpdateTimings2} onPress={ this.staff}>Add/Update Staffs</Text>
                  <IoniconsIcon
                    name="ios-arrow-forward"
                    style={styles.icon4}
                    onPress={ this.staff}
                  ></IoniconsIcon>
                </View>
                <View style={styles.group2}>
                  <Text style={styles.addUpdateTimings2} onPress={ this.subjects}>
                    Add/Update Subjects
                  </Text>
                  <IoniconsIcon
                    name="ios-arrow-forward"
                    style={styles.icon4}
                    onPress={ this.subjects}
                  ></IoniconsIcon>
                </View>
                <View style={styles.group2}>
                  <Text style={styles.addUpdateTimings2} onPress={ this.time}>
                    Add/Update Timings
                  </Text>
                  <IoniconsIcon
                    name="ios-arrow-forward"
                    style={styles.icon4}
                    onPress={ this.time}
                  ></IoniconsIcon>
                </View>
                <View style={styles.group2}>
                  <Text style={styles.addUpdateTimings2} onPress={ this.timetable}>
                    Create/Update Timetable
                  </Text>
                  <IoniconsIcon
                    name="ios-arrow-forward"
                    style={styles.icon4}
                    onPress={ this.timetable}
                  ></IoniconsIcon>
                </View>
                <View style={styles.group2}>
                  <Text style={styles.addUpdateTimings2} onPress={ this.selection}>
                    Shift Date/Day
                  </Text>
                  <IoniconsIcon
                    name="ios-arrow-forward"
                    style={styles.icon4}
                    onPress={ this.selection}
                  ></IoniconsIcon>
                </View>
                <View style={styles.group2}>
                  <Text style={styles.addUpdateTimings2} onPress={ this.proceed}>Logout</Text>
                  <IoniconsIcon
                    name="ios-arrow-forward"
                    style={styles.icon4}
                    onPress={ this.proceed}
                  ></IoniconsIcon>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.avatarRow}>
            <Image
              source={require("../assets/actor-adult-black-and-white-1040880.png")}
              resizeMode="stretch"
              style={styles.avatar}
            ></Image>
            <Text style={styles.userEmail}></Text>
            <Text style={styles.stanSmith}>Welcome{"\n"}{this.state.name}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.welcome}>ADMIN</Text>
    </View>
    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1fb2cc",
    width: "100%",
    height: 763
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 859,
    height: 890,
    position: "absolute"
  },
  settingsList: {
    left: 51,
    height: 458,
    position: "absolute",
    right: 450,
    bottom: 193
  },
  accountSettings: {
    height: 343,
    marginTop: 15,
    marginLeft: 24,
    marginRight: 24
  },
  adminOptions: {
    color: "#168194",
    fontSize: 23,
    marginTop: -3,
    fontWeight:"bold"
  },
  subSettings: {
    height: 324,
    marginTop: 30
  },
  editProfile: {
    height: 34
  },
  addUpdateStaffs: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginTop: 7
  },
  icon: {
    color: "rgba(31,178,204,1)",
    fontSize: 30,
    alignSelf: "flex-end",
    marginTop: -25
  },
  changeConnections: {
    height: 33,
    marginTop: 10
  },
  addUpdateSubjects: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginTop: 7
  },
  icon2: {
    color: "rgba(31,178,204,1)",
    fontSize: 30,
    alignSelf: "flex-end",
    marginTop: -25
  },
  editProfileColumn: {
    marginTop: 9,
    marginLeft: 10,
    marginRight: 10
  },
  editProfileColumnFiller: {
    flex: 1
  },
  providerSettings: {
    height: 34,
    marginBottom: 6
  },
  addUpdateTimings: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginTop: 7
  },
  icon3: {
    color: "#1fb2cc",
    fontSize: 30,
    alignSelf: "flex-end",
    marginTop: -25
  },
  group: {
    height: 34,
    marginBottom: 11
  },
  addUpdateTimings2: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginTop: 7
  },
  icon4: {
    color: "#1fb2cc",
    fontSize: 30,
    alignSelf: "flex-end",
    marginTop: -25
  },
  group2: {
    height: 34,
    marginBottom: 10
  },
  logout: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginTop: 7
  },
  icon5: {
    color: "#1fb2cc",
    fontSize: 30,
    alignSelf: "flex-end",
    marginTop: -25
  },
  providerSettingsColumn: {
    marginBottom: 108,
    marginLeft: 10,
    marginRight: 10
  },
  userInfo: {
    top: 67,
    left: 87,
    height: 125,
    position: "absolute",
    right: 451,
    flexDirection: "row"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 150
  },
  userEmail: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginLeft: 62,
    marginTop: 88
  },
  stanSmith: {
    color: "#1fb2cc",
    fontSize: 25,
    marginTop: 25,
    marginRight: -100,
    fontWeight: "bold"
  },
  avatarRow: {
    height: 200,
    flexDirection: "row",
    flex: 1,
    marginRight: 300
  },
  ellipseStack: {
    height: 890,
    marginTop: 43,
    marginLeft: -50,
    marginRight: -449
  },
  welcome: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: -899,
    marginLeft: 35
  }
});

