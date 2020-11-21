import React, { Component } from "react";
import Svg, { Ellipse } from "react-native-svg";
import Axios from "axios";
import { View, Text,Button,TextInput,Image,TouchableOpacity,StyleSheet,BackHandler} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import {Picker} from '@react-native-community/picker';
import { ScrollView } from "react-native-gesture-handler";

export default class TimetableInfo extends Component {
    constructor(){
      super();
      this.state = {
        department: "",
        slot: "",
        year: "",
        dept: [],
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
  BackHandler.addEventListener('hardwareBackPress', function() {
    return false;
  }); 
const mail = { email: await AsyncStorage.getItem("email") };
const sub = await Axios.post("https://noti5backend.herokuapp.com/retDept", mail);
this.setState({dept: sub.data.dept});
setTimeout(() => {
  this.setState({load:"No"});
  }, 1000);
}   

proceed = () => {
if(this.state.slot==="" || this.state.department==="")
   {window.alert("Enter all details");
    return;}
console.log(this.state);
const send =[this.state.department,this.state.slot,this.state.year]
this.props.navigation.navigate('setTimetable',send);    
}

renderDept = (dep,index) => {
return (
    
    <Picker.Item  value={`${dep}`} key={`${index}`} label={`${dep}`}/>
    
)
} 
  render(){
    if(this.state.load!=="Yes")
  {return (
    <ScrollView style={styles.container1}>
      <View style={styles.header}>
    <Text style={styles.heading}>Add Timings</Text>
    </View>
    <View style={styles.container}>
    <Text style={styles.timetableInfo}>TIMETABLE INFO</Text>
    <View style={styles.timetableInfoFiller}></View>
    <View style={styles.ellipseStack}>
      <View style={styles.settingsList}>
        <View style={styles.accountSettings}>
          <Text style={styles.enterTheDetails}>Enter the details</Text>
          <View style={styles.subSettings}>
            <View style={styles.editProfile}>
              <Text style={styles.department}>Department:</Text>
            </View>
            <View style={styles.group9}>
            <Picker
  selectedValue={this.state.department}
  style={styles.picker}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({department: itemValue})
  }>
      <Picker.Item label="Department" value=" " />
            {this.state.dept.map(this.renderDept)} 
        </Picker>
            </View>
            <View style={styles.group2}>
              <Text style={styles.department}>Year:</Text>
            </View>
            <View style={styles.group9}>
            <Picker
  selectedValue={this.state.year}
  style={styles.picker}
  onValueChange={(itemValue1, itemIndex) =>
    this.setState({year: itemValue1})
  }>
            <Picker.Item label="Year" value=" " />
            <Picker.Item label="I" value="1"/>
            <Picker.Item label="II" value="2"/>
            <Picker.Item label="III" value="3"/>
            <Picker.Item label="IV" value="4"/>
        </Picker>
            </View>
            <View style={styles.group4}>
              <Text style={styles.department}>Slot:</Text>
            </View>
            <View style={styles.group9}>
            <Picker
  selectedValue={this.state.slot}
  style={styles.picker}
  onValueChange={(itemValue2, itemIndex) =>
    this.setState({slot: itemValue2})
  }>
            <Picker.Item label="Slot" value=" " />
            <Picker.Item label="slot 1" value="slot1" />
            <Picker.Item label="slot 2" value="slot2" />
        </Picker>
            </View>
          </View>
        </View>
        <TouchableOpacity
        onPress={this.proceed}
        style={styles.button1}
      >
        <Text style={styles.proceed1}>PROCEED</Text>
      </TouchableOpacity>
      </View>
      
    </View>
    
  </View>
  </ScrollView>
  );}
  else{
    return(
      <View style={styles.bg}>
        <Image
        source={require("../assets/load3.png")}
        style={styles.load}
      ></Image>
      </View>
    );
  }
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
  bg: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%"
  },
  load: {
    height: "15%",
    width: "28%",
    alignSelf: "center",
    top: "40%"
  },
  timetableInfo: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    width: 197,
    height: 28,
    textAlign: "center",
    marginLeft: 82,
    fontWeight: "bold"
  },
  timetableInfoFiller: {
    flex: 1
  },
  ellipse: {
    top: 0,
    width: 678,
    height: 702,
    position: "absolute",
    transform: [{rotate: "90.00deg"}],
    left: 0
  },
  button1: {
    backgroundColor: "rgba(31,178,204,1)",
      borderRadius: 5,
      justifyContent: "center",
      height: 50,
      marginTop: 30,
      width: "60%",
      textAlign: "center",
      alignSelf: "center"
  },
  proceed1: {
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontWeight: "bold"
  },
  group9:{
    marginTop: 10,
    marginBottom: 10,
    left: 20,
    height: 40, 
    borderColor: '#45A2B5', 
    borderWidth: 1,
    borderRadius: 20,
    width: "90%"
  },
  picker: {
    top: -7,
    left: 10,
    width: "95%",
    opacity: 0.4
  },
  settingsList: {
    left: 161,
    height: 458,
    position: "absolute",
    right: 159,
    bottom: 158
  },
  accountSettings: {
    marginLeft: 24,
    marginRight: 24
  },
  enterTheDetails: {
    color: "#147383",
    fontSize: 18,
    marginTop: -3,
    fontWeight: "bold"
  },
  editProfile: {
    height: 34,
    marginTop: 9,
    marginLeft: 10,
    marginRight: 10
  },
  department: {
    color: "#1D95A8",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 7
  },
  group: {
    height: 34,
    marginLeft: 10,
    marginRight: 10
  },
  department2: {
    color: "#1D95A8",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 7
  },
  group2: {
    height: 34,
    marginTop: 1,
    paddingLeft: 10
  },
  year: {
    color: "#1D95A8",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 7
  },
  group3: {
    height: 34,
    width: 290,
    marginTop: 1,
    alignSelf: "center"
  },
  year2: {
    color: "#1D95A8",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 7
  },
  group4: {
    height: 34,
    marginTop: 7,
    paddingLeft: 10
  },
  slot: {
    color: "#1D95A8",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 7
  },
  group5: {
    height: 34,
    width: 290,
    marginTop: 4,
    alignSelf: "center"
  },
  slot2: {
    color: "#1D95A8",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 7
  },
  ellipseStack: {
    height: 702,
    marginBottom: -33,
    marginLeft: -159,
    marginRight: -159
  }
});


