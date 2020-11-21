import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, BackHandler, ScrollView } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Axios from "axios";
import * as XLSX from 'xlsx';
import AsyncStorage from '@react-native-community/async-storage';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { Buffer } from "buffer";
const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

export default class Subject extends Component {

constructor(){
  super();
  this.state = {
    dept_no: 0,
    dept: [],
    sub: [],
    file: [],
    years: ["I","II","III","IV"],
    sty: {
      display: 'none'
    },
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
const mail = { 
    email: AsyncStorage.getItem("email") 
};
const sub = await Axios.post("https://noti5backend.herokuapp.com/retDept", mail);
this.setState({dept: sub.data.dept});

}

onFileLoaded = async() => {
const res = await DocumentPicker.pick({
type: [DocumentPicker.types.allFiles],
});
//Printing the log realted to the file
console.log('res : ' + JSON.stringify(res));
var path=res.uri;
RNFS.readFile(path, 'base64').then((contents) => {
console.log(contents);
let your_bytes = Buffer.from(contents, "base64");
console.log(your_bytes);
const wb = XLSX.read(your_bytes, { type: "buffer" });
const wsname = wb.SheetNames[0];
const ws = wb.Sheets[wsname];
const data = XLSX.utils.sheet_to_json(ws);
console.log(data);
if(!data[0].subjectCode || !data[0].subjectName || !data[0].slot1 )
window.alert("Check whether the excel sheet goes with the constraints!!");
else
{this.setState({sub: data}),
this.setState({
  sty:{
    display:'block'
  }
})}
});
}

proceed = async() => {
try {
    var login = await Axios.post("https://noti5backend.herokuapp.com/addSub",{ 
    email: await AsyncStorage.getItem("email"),
    subjects: this.state.sub
  });
    console.log(login.data)
    this.props.navigation.navigate("AdminTimetable");
  } catch (err) {
    alert(err.response.data.msg);
  }
console.log(this.state)
}

sub = () => {
console.log(this.state);
}

render(){
  return (
    <ScrollView style={styles.container1}>
    <View style={styles.header}>
    <Text style={styles.heading}>ADD/UPDATE STAFF</Text>
    </View>
    <View style={styles.container}>
      <View style={styles.addUpdateStaffFiller}></View>
      <View style={styles.ellipseStack}>
        <View style={styles.settingsList}>
          <View style={styles.accountSettings}>
            <Text style={styles.uploadDocument}>Upload Excel Sheet</Text>
            <View style={styles.subSettings}>
              <View style={styles.editProfileColumn}>
                <View style={styles.editProfile}>
                  <Text style={styles.constraints}>Constraints:</Text>
               
                <View style={styles.group}>
                <Text style={styles.department5}>
                    1. The excel sheet which you upload, {"\n"}should have 3 or
                    4 columns in it.{"\n"}2. And the names of the columns should{" "}
                    {"\n"}be exactly as <B>subjectCode</B>, {"\n"}
                    <B>subjectName</B>, <B>slot1</B>,
                    <B>slot2</B>.{"\n"}3. Slot2 can be ignored if there is
                    only {"\n"}one slot.{"\n"}4. Don&#39;t forget to upload
                    excel sheets {"\n"}for each and every department before{" "}
                    {"\n"}proceeding.{"\n"}5. The columns can be of any order.{" "}
                    {"\n"}But its name should be exactly as {"\n"}mentioned.
                  </Text>
                
              {this.state.sty.display==="none"?
              <TouchableOpacity
                onPress={this.onFileLoaded}
                style={styles.button1}
              >
                <Text style={styles.addExcelSheet}>ADD EXCEL SHEET</Text>
              </TouchableOpacity>:(<></>)}
              {this.state.sty.display!=="none"?
              <TouchableOpacity
                onPress={this.proceed}
                style={styles.button1}
              >
                <Text style={styles.addExcelSheet}>Proceed</Text>
              </TouchableOpacity>:(<></>)}
              </View>
              </View>
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
    backgroundColor: "#fff",
    width: "100%"
  },
  container1: {
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
  ellipse: {
    top: -50,
    width: 678,
    height: 802,
    position: "absolute",
    transform: [
      {
        rotate: "90.00deg"
      }
    ],
    left: 0
  },
  addUpdateStaff: {
    color: "rgba(255,255,255,1)",
    fontSize: 22,
    width: 261,
    height: 28,
    textAlign: "center",
    marginTop: 27,
    marginLeft: 55,
    fontWeight: "bold"
  },
  addUpdateStaffFiller: {
    flex: 1
  },
  button1: {
    backgroundColor: "rgba(31,178,204,1)",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    marginTop: 30
  },
  addExcelSheet: {
    color: "rgba(255,255,255,1)",
    width: 142,
    textAlign: "center",
    fontWeight: "bold",
    alignSelf: "center"
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
  uploadDocument: {
    color: "#096573",
    fontSize: 20,
    fontWeight: "bold"
  },
  subSettings: {
    height: 324,
    marginTop: 30
  },
  editProfile: {
    height: 34
  },
  constraints: {
    color: "#F34141",
    fontSize: 18,
    fontWeight: "bold"    
  },
  department5: {
    color: "#333",
    fontSize: 16,
    marginTop: 13
  },
  editProfileColumn: {
    marginLeft: 10,
    marginRight: 10
  },
  editProfileColumnFiller: {
    flex: 1
  },
  ellipseStack: {
    height: 702,
    marginBottom: -33,
    marginLeft: -159,
    marginRight: -159
  }
});
