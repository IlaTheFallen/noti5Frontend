import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  BackHandler
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import AsyncStorage from '@react-native-community/async-storage';
import { Picker } from '@react-native-community/picker';
import Axios from 'axios';
import { ScrollView } from "react-native-gesture-handler";

export default class createTimetableInfo extends Component {

    constructor(){
      super();
      this.state = {
        start_day: "1",
        final_day: "1",
        numberofhours: 0,
        hours: []
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

hours = (e) => {

var n = Number(e);
this.setState({numberofhours: n});
var i,arr = [];

for(i=0; i<n; i++)
{
    arr.push({
        start_time:"00:00",
        end_time:"00:00", 
    })
}
this.setState({hours: arr});
console.log(this.state)
}

// proceed = () => {
//     console.log(this.state);
//     const send =[this.state.department,this.state.year,this.state.slot,this.state.start_day,this.state.final_day,this.state.numberofhours,this.state.hours]
//     this.props.history.push('/setTimetable',send);    
// }

proceed = async() => {
try {
    await Axios.post("https://noti5backend.herokuapp.com/addTime",{ 
    email: await AsyncStorage.getItem("email"),
    start_day: this.state.start_day,
    final_day: this.state.final_day,
    hours: this.state.hours
  }); this.props.navigation.navigate("AdminTimetable");
}
    // console.log(login.data)
    
  catch (err) {
    window.alert(err.response.data.msg);
  }
 
// console.log({ 
//     email:await AsyncStorage.getItem("email"),
//     start_day: this.state.start_day,
//     final_day: this.state.final_day,
//     hours: this.state.hours
//   });
  
}

changeStartHour = (x,i) => {
console.log(this.state.hours);
let arr = this.state.hours;
arr[i].start_time = x;
this.setState({
    hours: arr
    })
}

changeEndHour = (x,i) => {
let arr = this.state.hours;
arr[i].end_time = x;
this.setState({
    hours: arr
    })
console.log(this.state)
}

renderHours = (hours,index) =>{
return(
  <View  key={index}>
  <Text style={styles.timings3}>{`Hour ${index+1}:`}</Text>
   <Text style={styles.timings4}>
  From </Text>
  <TextInput type="text" 
  style={styles.textInput3}
   placeholder="hh:mm"
  onChangeText={(t) =>this.changeStartHour(t,index)}
  />
            <Text style={styles.timings4}>To</Text>
  <TextInput type="text" 
  style={styles.textInput2}
   placeholder="hh:mm"
  onChangeText={(t1) =>this.changeEndHour(t1,index)}
  />
  
</View>
)
}



  render(){
  return (
    <ScrollView style={styles.container1}>
      <View style={styles.header}>
    <Text style={styles.heading}>Add Timings</Text>
    </View>
    <View style={styles.container}>
        <View style={styles.stack}>
          <View >
            <View >
              <View >
                <Text style={styles.timings}>Enter Working days:</Text>
              </View>
              <View style={styles.group}>
              <Picker
  selectedValue={this.state.start_day}
  style={styles.picker}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({start_day: itemValue})
  }>
  
            <Picker.Item label="Monday" value="1"/>
            <Picker.Item label="Tuesday" value="2"/>
            <Picker.Item label="Wednesday" value="3"/>
            <Picker.Item label="Thursday" value="4"/>
            <Picker.Item label="Friday" value="5"/>
            <Picker.Item label="Saturday" value="6"/>
            <Picker.Item label="Sunday" value="7"/>
    </Picker>
              </View>
                <Text style={styles.to}>To</Text>
              <View style={styles.group}>
              <Picker
              style={styles.picker}
    selectedValue={this.state.final_day}
  onValueChange={(itemValue1) =>
    this.setState({final_day: itemValue1})
  }>
           
            <Picker.Item label="Monday" value="1"/>
            <Picker.Item label="Tuesday" value="2"/>
            <Picker.Item label="Wednesday" value="3"/>
            <Picker.Item label="Thursday" value="4"/>
            <Picker.Item label="Friday" value="5"/>
            <Picker.Item label="Saturday" value="6"/>
            <Picker.Item label="Sunday" value="7"/>
    </Picker>
              </View>
              <View>
                <View >
                  <Text style={styles.timings2}>Enter no. of hours:</Text>
                </View>
                <TextInput
                  placeholder="Number of hours"
                  keyboardType='numeric'
                  style={styles.textInput}
                  onChangeText={(e) => this.hours(e)}
                ></TextInput>
                {this.state.hours.map(this.renderHours)} 
                <TouchableOpacity
                onPress={this.proceed}
                style={styles.button1}
              >
                <Text style={styles.addExcelSheet}>PROCEED</Text>
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
  ellipse: {
    width: 678,
    height: 802,
    position: "absolute",
    transform: [{rotate: "90.00deg"}],
    left: 0,
    top: -380
  },
  stack: {
    marginTop: 65
  },
  timetable: {
    color: "#fff",
    fontSize: 24,
    width: 270,
    textAlign: "center",
    fontWeight: "bold",
    top: 20,
    left: 45
  },
  timings: {
    color: "#45A2B5",
    fontSize: 18,
    fontWeight: "bold",
    top: 5,
    left: 15,
    bottom: 15
  },
  group:{
    marginTop: 20,
    left: 20,
    height: 40, 
    borderColor: '#45A2B5', 
    opacity: 0.5,
    borderWidth: 1,
    borderRadius: 20,
    width: "90%"
  },
  picker: {
    top: -7,
    left: 10,
    width: "95%"
  },
  to: {
    color: "#45A2B5",
    fontSize: 15,
    fontWeight: "bold",
    top: 10,
    left: 35
  },
  timings2: {
    color: "#45A2B5",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    left: 15
  },
  textInput: {
    height: 40, 
    width: "90%",
    borderColor: '#45A2B5', 
    opacity: 0.5,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    left: 22,
    borderRadius: 20,
    paddingLeft: 20
  },
  timings3: {
    color: "#45A2B5",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 20,
    left: 20
  },
  timings4: {
    color: "#A8B6BB",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 20,
    left: 35
  },
  textInput2: {
    height: 40, 
    width: "50%",
    borderColor: '#45A2B5', 
    opacity: 0.5,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    left: 35,
    borderRadius: 20,
    paddingLeft: 20
  },
  textInput3: {
    height: 40, 
    width: "50%",
    borderColor: '#45A2B5', 
    opacity: 0.5,
    borderWidth: 1,
    marginTop: 15,
    left: 35,
    borderRadius: 20,
    paddingLeft: 20
  },
  button1: {
    backgroundColor: "rgba(31,178,204,1)",
    borderRadius: 30,
    height: 40,
    justifyContent: "center",
    marginTop: 30,
    width: "60%",
    alignSelf: "center",
    marginBottom: 30
  },
  addExcelSheet: {
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontWeight: "bold",
    alignSelf: "center"
  },
});

