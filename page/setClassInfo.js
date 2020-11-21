import React, {Component} from 'react';
import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import {Picker} from '@react-native-community/picker';
import RadioButtonRN from 'radio-buttons-react-native';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  TextInput,
  BackHandler
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import { ScrollView } from 'react-native-gesture-handler';

const data = [
  {
    label: 'Default link'
   },
   {
    label: 'New link'
   }
  ];

export default class Staff extends Component {
 
     constructor(){
      super();
      this.state = {
        day: "",
        sub: "",
        year: "",
        slot: "",
        link: "",
        default: "",
        topic: "",
        hour: "",
        date: "",
        sty: {
           display: 'none'
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
 
 proceed = async(x) => {
     try {
         var login = await Axios.post("https://noti5backend.herokuapp.com/addInfo",{ 
         email:await AsyncStorage.getItem("email"),
         department:await AsyncStorage.getItem("department"),
         year: this.state.year,
         slot: this.state.slot,
         day: this.state.day,
         hour: this.state.hour,
         sub: this.state.sub,
         topic: this.state.topic,
         link: this.state.link,
         date: this.state.date,
         bool: x
       });
         console.log(login.data)
         this.props.navigation.navigate("StaffTimeTable");
       } catch (err) {
         alert(err.response.data.msg);
       }
     console.log(this.state);
 }
 
 componentDidMount = async() => {
     const {params} = this.props.navigation.state
     if (params) {
       this.state.day=params[0].day; 
       this.state.sub=params[0].sub;
       this.state.year=params[0].year;
       this.state.slot=params[0].slot;
       this.state.hour=params[1]
     }  
     const mail = { email: await AsyncStorage.getItem("email"), subject: this.state.sub };
     const sub = await Axios.post("https://noti5backend.herokuapp.com/getDefault", mail); 
     this.setState({link: sub.data});
     this.setState({default: sub.data});
 
     var d = new Date();
     var res = d.toString().split(" ");
     var res1 = res[0]+res[1]+res[2];
     this.setState({date: res1});
 
     console.log(this.state);
 }  
 proceed2 = () => {
 this.setState({sty: {
   
   display: 'none'
 }})
 this.setState({link: this.state.default});
 }
 proceed1 = () => {
   this.setState({sty: {
     
     display: 'block'
   }})
 
 }
 proceed3 = (x) => {
 this.setState({link: x});
 }
 proceed4 = (x) => {
   console.log(x);
   if(x.label==="New link")
     this.proceed1();
   else 
     this.proceed2();
   }

   render(){
  return (
    <ScrollView style={styles.container}>
<View >
<Text style={styles.setClassInfo}>Set Class Info</Text>
<View style={styles.setClassInfoFiller}></View>
<View style={styles.ellipseStack}>
  <Svg viewBox="0 0 677.6 701.94" style={styles.ellipse}>
    <Ellipse
      strokeWidth={1}
      fill="rgba(255,255,255,1)"
      cx={339}
      cy={351}
      rx={338}
      ry={2250}
    ></Ellipse>
  </Svg>
  <View style={styles.settingsList}>
    <View style={styles.accountSettingsStack}>
      <View style={styles.accountSettings}>
        <Text style={styles.subjectName}>Subject Name:</Text>
        <Text style={styles.subjectName2}>{this.state.sub}</Text>
        <View style={styles.subSettings}>
          <View style={styles.editProfile}>
            <Text style={styles.forSlot2OfYear2}>
            {`For Year ${this.state.year} (${this.state.slot})`}
            </Text>
          </View>
          <View style={styles.group}>
            <Text style={styles.department2}>
              Topic for Today&#39;s Session
            </Text>
            <TextInput
            placeholder="Topic"
            selectionColor={'#D6D6D6'}
            style={styles.textInput2}
            onChangeText={(value1) =>this.setState({topic: value1})}
          ></TextInput>
          </View>
            <Text style={styles.department2}>Link for Today&#39;s Session:</Text>
          <RadioButtonRN
            data={data}
            selectedBtn={(e) => this.proceed4(e)}
            />
            { this.state.sty.display!=="none"?
      <TextInput
            placeholder="Enter New Link"
            selectionColor={'#D6D6D6'}
            style={styles.textInput3}
            onChangeText={(value1) =>this.setState({link: value1})}
          ></TextInput>:(
        <></>
      )
    }
      <TouchableOpacity
    onPress={() =>this.proceed("true")}
    style={styles.group5}
  >
    <Text style={styles.postpone}>SET INFO</Text>
  </TouchableOpacity>
    <TouchableOpacity
        onPress={() =>this.proceed("false")}
        style={styles.group4}
      >
        <Text style={styles.postpone}>POSTPONE</Text>
      </TouchableOpacity>
        </View>
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
    backgroundColor: "#1fb2cc",
    width: 360,
    height: 740
  },
  setClassInfo: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    width: 197,
    height: 28,
    textAlign: "center",
    marginTop: 26,
    marginLeft: 82,
    fontWeight: "bold"
  },
  setClassInfoFiller: {
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
    left: 196,
    height: 59,
    backgroundColor: "rgba(31,178,204,1)",
    position: "absolute",
    right: 382,
    bottom: 204,
    borderRadius: 5
  },
  setInfo: {
    color: "rgba(255,255,255,1)",
    width: 66,
    height: 15,
    textAlign: "center",
    marginTop: 22,
    marginLeft: 17
  },
  settingsList: {
    left: 161,
    height: 458,
    position: "absolute",
    right: 159,
    top: 40
  },
  accountSettings: {
    top: 0,
    left: 0,
    height: 343,
    position: "absolute",
    right: 5
  },
  subjectName: {
    color: "#238698",
    fontSize: 18,
    marginTop: -3,
    fontWeight: "bold"
  },
  subjectName2: {
    color: "#2AA8BD",
    fontSize: 18,
    marginTop: 5,
    marginLeft: 20,
    fontWeight: "bold"
  },
  forSlot2OfYear2: {
    color: "#2AA8BD",
    fontSize: 16,
    paddingLeft: 30
  },
  department2: {
    color: "#238698",
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold"
  },
  group3: {
    height: 34,
    width: 290,
    marginTop: 36,
    alignSelf: "center"
  },
  year2: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginTop: 7
  },
  textInput2: {
    width: 304,
    height: 40, 
    borderColor: '#45A2B5', 
    opacity: 0.5,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 20,
    paddingLeft: 20
  },
  textInput3: {
    width: 304,
    height: 50, 
    borderColor: '#45A2B5', 
    opacity: 0.5,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 20
  },
  group4: {
    height: 40,
    backgroundColor: "rgba(31,178,204,1)",
    borderRadius: 20,
    justifyContent: "center",
    marginTop: 10
  },
  group5: {
    height: 40,
    backgroundColor: "rgba(31,178,204,1)",
    borderRadius: 20,
    justifyContent: "center",
    marginTop: 30
  },
  postpone: {
    color: "rgba(255,255,255,1)",
    width: 82,
    height: 20,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold"
  },
  accountSettingsStack: {
    height: 397,
    marginTop: 15,
    marginLeft: 24,
    marginRight: 19
  },
  ellipseStack: {
    height: 702,
    marginBottom: -33,
    marginLeft: -159,
    marginRight: -159
  }
});

