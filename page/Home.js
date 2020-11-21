import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Image,
  ScrollView,
  Dimensions
} from "react-native";

export default class Home extends Component{

constructor(){
  super();
  this.state = {
    role: "",
    load: "Yes"
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

componentDidMount = async() => {
    let x=await AsyncStorage.getItem("role");
    console.log(x);
    this.setState({role:x})
    if(x==="student"){
        this.props.navigation.navigate('StudentTimeTable');
    }
    if(x==="staff"){
        this.props.navigation.navigate('StaffTimeTable');
    }
    if(x==="admin"){
        this.props.navigation.navigate('AdminTimetable');
    }
    setTimeout(() => {
      this.setState({load:"No"});
      }, 3000);
    
    
}
studentCall = () => {
    this.props.navigation.navigate('Student');
    }
    staffCall = () => {
        this.props.navigation.navigate('Staff');
        }
        adminCall = () => {
            this.props.navigation.navigate('Login');
            }
        login=()=>{
            this.props.navigation.navigate('noti5');
        }
    

  render(){
  if(this.state.load!=="Yes")
  {return (
    <ScrollView>
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0996AE" />
      <View style={styles.background}>
        <ImageBackground
          style={styles.rect2}
          imageStyle={styles.rect2_imageStyle}
          source={require("../assets/Gradient_Nn0VXW2.png")}
        >
          <View style={styles.cont}>
          <Text style={styles.home}>WELCOME</Text>
          <View style={styles.groupColumn}>
            <TouchableOpacity
              onPress={this.studentCall}
              style={styles.group}
            >
              <Text style={styles.student}>STUDENT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.staffCall}
              style={styles.group2}
            >
              <Text style={styles.staff}>STAFF</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.adminCall}
              style={styles.group3}
            >
              <Text style={styles.admin}>ADMIN</Text>
            </TouchableOpacity>
          </View>
          </View>
        </ImageBackground>
      </View>
    </View>
    </ScrollView>
  );
}
else{
  return(
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0996AE" />
      <View style={styles.background}>
        <ImageBackground
          style={styles.rect2}
          imageStyle={styles.rect2_imageStyle}
          source={require("../assets/Gradient_Nn0VXW2.png")}
        ></ImageBackground>
        <Image
          source={require("../assets/load2.png")}
          style={styles.load}
        ></Image>
        </View>
        </View>
  );
}}
}
let ScreenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%"
  },
  load: {
    position: "absolute",
    height: "16%",
    width: "30%",
    alignSelf: "center",
    top: "40%"
  },
  cont: {
    top: "25%"
  },
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)"
  },
  background: {
    height:ScreenHeight,
  },
  rect2: {
    flex: 1
  },
  rect2_imageStyle: {},
  home: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    textAlign: "center",
    height: 28,
    marginBottom: 40,
    alignSelf: "center",
    fontWeight:"bold",
    textDecorationLine:"underline"
  },
  homeFiller: {
    flex: 1
  },
  group: {
    height: 55,
    backgroundColor: "rgba(247,247,247,0)",
    borderRadius: 5,
    borderColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    justifyContent: "center",
    marginBottom: 34
  },
  student: {
    width: 66,
    color: "rgba(255,255,255,1)",
    height: 15,
    textAlign: "center",
    alignSelf: "center"
  },
  group2: {
    height: 55,
    backgroundColor: "rgba(247,247,247,0)",
    borderRadius: 5,
    borderColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    justifyContent: "center",
    marginBottom: 41
  },
  staff: {
    width: 66,
    color: "rgba(255,255,255,1)",
    height: 15,
    textAlign: "center",
    alignSelf: "center"
  },
  group3: {
    height: 55,
    backgroundColor: "rgba(247,247,247,0)",
    borderRadius: 5,
    borderColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    justifyContent: "center",
    marginBottom: 38
  },
  admin: {
    width: 66,
    color: "rgba(255,255,255,1)",
    height: 15,
    textAlign: "center",
    alignSelf: "center"
  },
  button: {
    height: 55,
    backgroundColor: "rgba(247,247,247,0)",
    borderRadius: 5,
    borderColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    justifyContent: "center"
  },
  login: {
    width: 66,
    color: "rgba(255,255,255,1)",
    height: 15,
    textAlign: "center",
    alignSelf: "center"
  },
  groupColumn: {
    marginLeft: 41,
    marginRight: 41
  }
});

