import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { Center } from "@builderx/utils";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import {Picker} from '@react-native-community/picker';
import Axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
TextInput.defaultProps.selectionColor = 'white'
var uuid = require('react-native-uuid');


export default class Login1 extends Component{

constructor(){
  super();
  this.state = {
    email: "",
    department: 0,
    name: "",
    load: "Yes",
    dept: [],
    slot: "slot1",
    year: "1",
    admins: [],
    code:'',
    code1:'',
    sty: {
      display: 'none'
    },
    sty1: {
      display: 'block'
    }
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

componentDidMount = async() => {
const mail = { email: "" };
const sub = await Axios.post("https://noti5backend.herokuapp.com/retDept", mail);
var str = uuid.v4();
var str1=""; 
var matches=str.split('');
var i,j=0;
for(i=0;i<str.length && j<4; i++)
{
if(!isNaN(matches[i]*1))
{
str1 += matches[i];
j++;
}
}
this.setState({dept: sub.data.dept,admins: sub.data.admins, code1: str1});
this.setState({load:"No"});
}  

renderDept = (dep,index) => {
return (
    
    <Picker.Item  value={`${index}`} key={`${index}`} label={`${dep}`}/>
    
)
} 


mail = async() =>{
if(this.state.email==="" || this.state.name==="")
{window.alert("Kindly fill all data!");
return;}
if(!this.state.email.includes("tce.edu"))
{window.alert("Kindly give your college email!");
return;}
AsyncStorage.setItem("email", this.state.email);
AsyncStorage.setItem("name", this.state.name);
AsyncStorage.setItem("role", "student");
AsyncStorage.setItem("department", this.state.dept[this.state.department]);
AsyncStorage.setItem("slot", this.state.slot);
AsyncStorage.setItem("year", this.state.year);
this.setState({sty: {

  display: 'block'
}});
this.setState({sty1: {
  display: 'none'
}})

var dataToSend = {
    email:this.state.email,
    name:this.state.name,
    code1:this.state.code1
};
await Axios.post('https://noti5backend.herokuapp.com/sendMail',dataToSend);


}

proceed = async() => {
if(this.state.code===this.state.code1){
this.props.navigation.navigate("StudentTimeTable");}
else{
window.alert("ID does not match");
return;
}
console.log(this.state);
}
  render(){
    if(this.state.load!=="Yes")
    {return(
    <View style={styles.root}>
    <StatusBar barStyle="light-content" backgroundColor="#0996AE" />
    <View style={styles.background}>
      <ImageBackground
        style={styles.rect2}
        imageStyle={styles.rect2_imageStyle}
        source={require("../assets/Gradient_Nn0VXW2.png")}
      >
        <ScrollView keyboardShouldPersistTaps={'always'}>
        <View style={styles.studentLoginColumn}>
          <Text style={styles.studentLogin}>STUDENT LOGIN</Text>
          <View style={styles.rect3}>
            <View style={styles.drop}>
              <View style={styles.rect5}></View>
              <Center vertical>
                <FontAwesomeIcon
                  name="building"
                  style={styles.icon7}
                ></FontAwesomeIcon>
              </Center>
              
            <Picker 
              style={styles.dropInput}
               selectedValue={this.state.department}
                onValueChange={(value) =>
                this.setState({
                department:value
                })}>
                {this.state.dept.map(this.renderDept)} 
            </Picker>
            </View>
            <View style={styles.drop}>
              {/* <View style={styles.rect5}></View>
              <View style={styles.rect6}></View>
              <View style={styles.rect7}></View> */}
              <MaterialIconsIcon
                name="account-balance"
                style={styles.icon8}
              ></MaterialIconsIcon>
              <Picker
             style={styles.dropInput} 
  selectedValue={this.state.year}
  onValueChange={(itemValue1, itemIndex) =>
    this.setState({year: itemValue1})
  }>
           
            <Picker.Item label="1st Year" value="1"/>
            <Picker.Item label="2nd Year" value="2"/>
            <Picker.Item label="3rd Year" value="3"/>
            <Picker.Item label="4th Year" value="4"/>
        </Picker>
            </View>
            <View style={styles.drop}>
              <View style={styles.rect6}></View>
              <View style={styles.rect7}></View>
              <View style={styles.rect8}></View>
              <View style={styles.rect9}></View>
              <MaterialIconsIcon
                name="airplay"
                style={styles.icon9}
              ></MaterialIconsIcon>
              <Picker
style={styles.dropInput}
  selectedValue={this.state.slot}
  onValueChange={(itemValue2, itemIndex) =>
    this.setState({slot: itemValue2})
  }>
            <Picker.Item label="Slot 1" value="slot1" />
            <Picker.Item label="Slot 2" value="slot2" />
        </Picker>
            </View>
            <View style={styles.email}>
              <EvilIconsIcon
                name="envelope"
                style={styles.icon6}
              ></EvilIconsIcon>
              <TextInput
                placeholder="Email"
                placeholderTextColor="rgba(255,255,255,0.5)"
                secureTextEntry={false}
                style={styles.emailInput}
                onChangeText={(val) =>
                  this.setState({
                  email: val
                  })}
              ></TextInput>
            </View>
            <View style={styles.email}>
              <EvilIconsIcon name="user" style={styles.icon5}></EvilIconsIcon>
              <TextInput
                placeholder="Name"
                placeholderTextColor="rgba(255,255,255,0.5)"
                secureTextEntry={false}
                style={styles.nameInput}
                onChangeText={(val1) =>
                  this.setState({
                  name: val1
                  })}
              ></TextInput>
            </View>
            {this.state.sty.display!=="none"?
            <View style={styles.group4}>
              <View style={styles.rect10}></View>
              <EvilIconsIcon
                name="credit-card"
                style={styles.icon5}
              ></EvilIconsIcon>
              <TextInput
                placeholder="Enter ID"
                placeholderTextColor="rgba(255,255,255,0.5)"
                secureTextEntry={false}
                keyboardType='numeric'
                style={styles.nameInput}
                onChangeText={(val) =>
                  this.setState({
                  code: val
                  })}
              ></TextInput>
            </View>:(<></>)}
          </View>
        </View>
        <View style={styles.studentLoginColumnFiller}></View>
        <View style={styles.buttonStack}>
        {this.state.sty.display!=="none"?
          <TouchableOpacity
            onPress={this.proceed}
            style={styles.button}
          >
            <Text style={styles.login}>LOGIN</Text>
          </TouchableOpacity>:(<></>)}
          { this.state.sty1.display==="block"?
          <TouchableOpacity
            onPress={this.mail}
            style={styles.group5}
          >
            <Text style={styles.verifyMail}>VERIFY MAIL</Text>
          </TouchableOpacity>:(<></>)}
        </View>
        </ScrollView>
      </ImageBackground>
    </View>
  </View>
    );}
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
          source={require("../assets/load.png")}
          style={styles.load}
        ></Image>
        </View>
        </View>
      );
    }
}
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)"
  },
  load: {
    position: "absolute",
    height: "16%",
    width: "30%",
    alignSelf: "center",
    top: "40%"
  },
  background: {
    flex: 1
  },
  rect2: {
    flex: 1
  },
  rect2_imageStyle: {},
  studentLogin: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    textAlign: "center",
    alignSelf: "center",
    width: 278,
    height: 28,
    fontWeight:"bold"
  },
  rect3: {
    height: 435,
    marginTop: 13
  },
  group: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    width: 278,
    flexDirection: "row",
    marginTop: 25
  },
  rect5: {},
  icon7: {
    left: 18,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 23,
    width: 33,
    height: 33,
    top:18
  },
  department: {
    top: 14,
    left: 61,
    height: 30,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    right: 17,
    fontSize: 14,
    width: 200
  },
  dropInput: {
    height: 50,
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    flex: 1,
    marginRight: 17,
    marginLeft: 50,
    marginTop: 4
  },
 
  drop: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 10
  },
  group2: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    width: 278,
    flexDirection: "row",
    marginTop: 11
  },
  rect6: {},
  rect7: {},
  icon8: {
    left: 14,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 23,
    width: 33,
    height: 33,
    top: 18
  },
  textInput4: {
    top: 14,
    left: 61,
    height: 30,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    right: 17,
    fontSize: 14
  },
  group3: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    width: 278,
    flexDirection: "row",
    marginTop: 11
  },
  rect8: {},
  rect9: {},
  icon9: {
    left: 13,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 23,
    width: 33,
    height: 33,
    top: 18
  },
  textInput5: {
    top: 14,
    left: 61,
    height: 30,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    right: 17,
    fontSize: 14
  },
  email: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 11
  },
  icon6: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 10,
    alignSelf: "center"
  },
  emailInput: {
    height: 50,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 11,
    marginTop: 3,
    fontSize:16
    },
  rect4: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    width: 278,
    flexDirection: "row",
    marginTop: 11
  },
  icon5: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    width: 33,
    height: 33,
    marginLeft: 10,
    alignSelf: "center",
    marginTop:5
  },
  nameInput: {
    height: 50,
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    flex: 1,
    marginRight: 17,
    marginLeft: 11,
    marginTop: 3,
    fontSize:16
  },
  group4: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 13
  },
  rect10: {},
  icon10: {
    left: 10,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    top: 11
  },
  textInput6: {
    top: 14,
    left: 61,
    height: 30,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    right: 17
  },
  studentLoginColumn: {
    marginTop: 120,
    marginLeft: 41,
    marginRight: 41
  },
  studentLoginColumnFiller: {
    flex: 1
  },
  button: {
    left: 0,
    height: 55,
    backgroundColor: "rgba(247,247,247,0)",
    position: "absolute",
    right: 0,
    bottom: 0,
    borderRadius: 5,
    borderColor: "rgba(255,255,255,1)",
    borderWidth: 1
  },
  login: {
    width: 66,
    color: "rgba(255,255,255,1)",
    height: 15,
    marginTop: 17,
    marginLeft: 120
  },
  group5: {
    left: 0,
    height: 55,
    backgroundColor: "rgba(247,247,247,0)",
    position: "absolute",
    right: 0,
    bottom: 0,
    borderRadius: 5,
    borderColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    justifyContent: "center",
    top:-50
  },
  verifyMail: {
    width: 100,
    color: "rgba(255,255,255,1)",
    height: 15,
    textAlign: "center",
    alignSelf: "center",
    top:-3
  },
  buttonStack: {
    height: 55,
    marginBottom: 121,
    marginLeft: 41,
    marginRight: 41
  }
});

