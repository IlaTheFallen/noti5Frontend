import React, { Component } from "react";
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
  TextInput,
  TouchableOpacity,
  BackHandler
} from "react-native";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';
TextInput.defaultProps.selectionColor = 'white';

export default class Login extends Component {
    constructor(){
      super();
      this.state = {
        email: "",
        department: 0,
        name: "",
        dept: [],
        admins: [],
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
    const mail = { email: await AsyncStorage.getItem("email") };
    const sub = await Axios.post("https://noti5backend.herokuapp.com/retDept", mail);
    this.setState({dept: sub.data.dept,admins: sub.data.admins});
    this.setState({load:"No"});
}  

renderDept = (dep,index) => {
    return (
          <Picker.Item value={`${index}`} key={`${index}`} label={`${dep}`}/>        
    )
} 

proceed = async() => {
    
    if(this.state.admins[this.state.department]!==this.state.email)
    {
        window.alert("Sorry, you are not the admin of this department!");
        return;
    }
    console.log(this.state.dept[this.state.department]);
  try {
    var login = await Axios.post("https://noti5backend.herokuapp.com/adminSignup",{ 
    email: this.state.email,
    department: this.state.dept[this.state.department] 
  });
  //console.log(login.data)
  AsyncStorage.setItem("email", this.state.email);
  AsyncStorage.setItem("name",this.state.name);
  AsyncStorage.setItem("department",this.state.dept[this.state.department]);
  AsyncStorage.setItem("role", "admin");
  this.props.navigation.navigate('AdminTimetable');
  } catch (err) {
    alert(err.response.data.msg);
  }
 
}


    render(){
  if(this.state.load!=="Yes")
  {return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0996AE" />
      <View style={styles.background}>
        <ImageBackground
          style={styles.rect2}
          imageStyle={styles.rect2_imageStyle}
          source={require("../assets/Gradient_Nn0VXW2.png")}
        >
          <ScrollView  keyboardShouldPersistTaps={'always'}>
          <View style={styles.adminLoginColumn}>
            <Text style={styles.adminLogin}>ADMIN LOGIN</Text>
            <View style={styles.rect3}>
              <View style={styles.rect5Column}>
                {/* <View style={styles.rect5}>
                <Picker
                selectedValue={this.state.department} 
                onValueChange={(itemValue,itemIndex) =>
                this.setState({department: itemValue})
              }> 
                {this.state.dept.map(this.renderDept)}
                </Picker>
                </View> */}
                <View style={styles.drop}>
                  <Icon
                    name="building"
                    style={styles.icon8}
                  ></Icon>
                  <Picker
                  style={styles.dropInput}
                selectedValue={this.state.department} 
                onValueChange={(itemValue,itemIndex) =>
                this.setState({department: itemValue})
              }> 
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
                    onChangeText={(value) => this.setState({email: value})}
                    value={this.state.email}
                  ></TextInput>
                </View>
              </View>
              <View style={styles.rect5ColumnFiller}>
                <View style={styles.email}>
                  <EvilIconsIcon
                    name="user"
                    style={styles.icon5}
                  ></EvilIconsIcon>
                  <TextInput
                    placeholder="Name"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    secureTextEntry={false}
                    style={styles.nameInput}
                    onChangeText={(value) => this.setState({name: value})}
                    value={this.state.name}
                  ></TextInput>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.adminLoginColumnFiller}></View>
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
  adminLogin: {
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    textAlign: "center",
    width: 278,
    height: 28,
    fontWeight:"bold",
    alignSelf:"center"
  },
  rect3: {
    height: 289,
    marginTop: 15
  },
  group: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    width: 278,
    flexDirection: "row",
    alignSelf: "center"
  },
  icon7: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    width: 33,
    height: 33,
    marginLeft: 15,
    alignSelf: "center"
  },
  icon8: {
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    width: 33,
    height: 33,
    marginLeft: 20,
    marginTop:5,
    alignSelf: "center"
  },
  textInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 14
  },
  rect4: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    width: 278,
    flexDirection: "row",
    marginTop: 26,
    alignSelf: "center"
  },
  icon5: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    width: 33,
    height: 33,
    marginLeft: 15,
    alignSelf: "center"
  },
  nameInput: {
    height: 50,
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 2
  },
  email: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 30
  },
  dropInput: {
    height: 50,
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    flex: 1,
    marginRight: 17,
    marginLeft: 0,
    marginTop: 4
  },
  drop: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 30
  },
  icon6: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 15,
    alignSelf: "center"
  },
  emailInput: {
    height: 50,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 5
  },
  adminLoginColumn: {
    marginTop: 175,
    marginLeft: 41,
    marginRight: 41
  },
  adminLoginColumnFiller: {
    flex: 1
  },
  button: {
    height: 55,
    backgroundColor: "rgba(247,247,247,0)",
    borderRadius: 5,
    borderColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    justifyContent: "center",
    marginBottom: 137,
    marginLeft: 41,
    marginRight: 41
  },
  login: {
    width: 60,
    color: "rgba(255,255,255,1)",
    height: 15,
    alignSelf: "center",
    marginLeft: 12,
    marginTop: -3
  }
});
