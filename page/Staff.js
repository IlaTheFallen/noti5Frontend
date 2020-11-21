import React, {Component} from 'react';
import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import {Picker} from '@react-native-community/picker';
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Image,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { Center } from "@builderx/utils";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
TextInput.defaultProps.selectionColor = 'white'

export default class Staff extends Component{
      constructor(){
        super();
        this.state = {
          email: "",
          department: 0,
          name: "",
          dept: [],
          admins: [],
          y:"",
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
        this.props.navigation.goBack(null);
        return true;
      }

  componentDidMount = async() => {
      const mail = { email: "" };
      const sub = await Axios.post("https://noti5backend.herokuapp.com/retDept", mail);
      this.setState({dept: sub.data.dept,admins: sub.data.admins});      
      this.setState({load:"No"});
  }  

  renderDept = (dep,index) => {
      return (
          <Picker.Item  value={`${index}`} key={`${index}`} label={`${dep}`}/>          
      )
  } 

  proceed = async() => {
     
    try {
      var login = await Axios.post("https://noti5backend.herokuapp.com/staffSignup",{ 
      department: this.state.dept[this.state.department],
      email: this.state.email
    });
    console.log(login.data)
      AsyncStorage.setItem("email", this.state.email);
      AsyncStorage.setItem("role", "staff");
      AsyncStorage.setItem("name",this.state.name);
      AsyncStorage.setItem("department", this.state.dept[this.state.department]);
     this.props.navigation.navigate("StaffTimeTable");
    } catch (err) {
      alert(err.response.data.msg);
    }
    
  } 

  render(){
  if(this.state.load!=="Yes")
  {return (
    <ScrollView keyboardShouldPersistTaps={'always'}>
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0996AE" />
      <View style={styles.background}>
        <ImageBackground
          style={styles.rect2}
          imageStyle={styles.rect2_imageStyle}
          source={require("../assets/Gradient_Nn0VXW2.png")}
        >
          <ScrollView  keyboardShouldPersistTaps={'always'}>
          <View style={styles.staffLoginColumn}>
            <Text style={styles.staffLogin}>STAFF LOGIN</Text>
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
                  style={styles.emailInput}
                  onChangeText={(val) =>
                    this.setState({
                    name: val
                    })}
                ></TextInput>
              </View>
            </View>
          </View>
          <View style={styles.staffLoginColumnFiller}></View>
          <TouchableOpacity
            onPress={this.proceed}
            style={styles.button}
          >
            <Text style={styles.login}>LOGIN</Text>
          </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </View>
    </View>
    </ScrollView>
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
  background: {
    flex: 1
  },
  rect2: {
    flex: 1
  },
  load: {
    position: "absolute",
    height: "16%",
    width: "30%",
    alignSelf: "center",
    top: "40%"
  },
  rect2_imageStyle: {},
  staffLogin: {
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center",
    width: 278,
    height: 28,
    fontWeight: "bold"
  },
  rect3: {
    height: 276,
    marginTop: 0
  },
  group: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    width: 278,
    flexDirection: "row",
    marginTop: 25
  },
  dropInput: {
    height: 50,
    color: "rgba(255,255,255,1)",
    fontSize: 5,
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
    marginTop: 30
  },
  rect5: {},
  icon7: {
    left: 18,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 23,
    top: 18,
    width: 33,
    height: 33
  },
  department: {
    top: 14,
    left: 51,
    height: 30,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    right: 17,
    fontSize: 5,
    width: 200
  },
  email: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 19
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
    marginLeft: 17,
    marginTop: 5
  },
  rect4: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    width: 278,
    flexDirection: "row",
    marginTop: 23
  },
  icon5: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    width: 33,
    height: 33,
    marginLeft: 10,
    alignSelf: "center"
  },
  nameInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    flex: 1,
    marginRight: 17,
    marginLeft: 18,
    marginTop: 14
  },
  staffLoginColumn: {
    marginTop: 195,
    marginLeft: 41,
    marginRight: 41
  },
  staffLoginColumnFiller: {
    flex: 1
  },
  button: {
    height: 55,
    backgroundColor: "rgba(247,247,247,0)",
    borderRadius: 5,
    borderColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    marginBottom: 234,
    marginLeft: 41,
    marginRight: 41
  },
  login: {
    width: 66,
    color: "rgba(255,255,255,1)",
    height: 15,
    marginTop: 16,
   alignSelf: "center"
  }
});



