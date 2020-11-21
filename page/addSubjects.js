import Axios from "axios";
import * as XLSX from 'xlsx';
import AsyncStorage from '@react-native-community/async-storage';
import { Picker } from '@react-native-community/picker';
import   React,{Component} from 'react';
import { View, Text,Button,TextInput} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { Buffer } from "buffer";



export default class Admin extends Component {
    state = {
            dept_no: 0,
            dept: [],
            sub: [],
            file: [],
            years: ["I","II","III","IV"],
            sty: {
              display: 'none'
            },
        };
    

    componentDidMount = async() => {
        const mail = { 
            email: AsyncStorage.getItem("email") 
        };
        const sub = await Axios.post("http://192.168.43.79:5000/retDept", mail);
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
            var login = await Axios.post("http://192.168.43.79:5000/addSub",{ 
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
      <View>
    <Text>
      <Text>Add Subjects{"\n"}</Text>
      <Text >{"\n"}Upload Documents{"\n"}</Text>
        <Text >
        {"\n"}{"\n"}Constraints:{"\n"}
          1. The excel sheet which you upload, should have 3 or 4 columns in it.{"\n"}
          2. And the names of the columns should be exactly as "subjectCode", "subjectName", "slot1", "slot2" {"\n"}
          3. Slot2 can be ignored if there is only one slot.{"\n"}
          4. Don't forget to upload excel sheets for each and every department before proceeding.{"\n"}
          5. The columns can be of any order. But its name should be exactly as mentioned.{"\n"}{"\n"}
        </Text>
        
        <Text >Subjects for your department:{"\n"}</Text>
        {/* <input type="file" style={styles.box} accept=".xlsx" id="file" onChange={(e) => this.onFileLoaded(e) }/> */}
            

      </Text>

      {this.state.sty.display==="none"?
            <Button title="Add excel sheet" onPress={this.onFileLoaded}></Button>
            :(
              <></>
            )}
            {this.state.sty.display!=="none"?
             <Button title="Load" onPress={ this.proceed}></Button>
             :(
               <></>
             ) 
            }  
</View>
  );
  }
}
