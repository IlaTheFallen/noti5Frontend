import React, {Component} from 'react';
import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import {Picker} from '@react-native-community/picker';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  BackHandler
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import { ScrollView } from 'react-native-gesture-handler';

export default class setdefaultLink extends Component {         
             constructor(){
              super();
              this.state = {
                sub: [],
                link: [],
                lindas: [],
                subLink: [],
                ans:[],
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
         const mail = { 
             department:await AsyncStorage.getItem("department"),
             email: await AsyncStorage.getItem("email") 
         };
         const subj = await Axios.post("https://noti5backend.herokuapp.com/staffSub", mail);
         this.setState({sub: subj.data.sub, lindas: subj.data.link});
         var i;
         var arr=[],arr2=[];
         for(i=0;i<this.state.sub.length;i++)
         {
             arr.push("");
             arr2.push("");
         }
         this.setState({link: arr, ans: arr2});
         setTimeout(() => {
          this.setState({load:"No"});
          }, 1000);
     }   
    
     proceed = async() => {
         var i;
         var arr=[];
         for(i=0;i<this.state.sub.length;i++)
         {
             arr.push({
                 subject: this.state.sub[i],
                 link: this.state.link[i]
             })
         }
         this.setState({subLink: arr});
         const mail= { 
             email: await AsyncStorage.getItem("email"),
             subLink: arr,
             department:await AsyncStorage.getItem("department"),
         };
         Axios.post("https://noti5backend.herokuapp.com/setDefault", mail);
         console.log(this.state);   
         this.props.navigation.navigate('StaffTimeTable');
     }
 
     link = (x,i) => {
         var arr = this.state.link;
         var ar1 = this.state.ans;
         arr[i] = x;
         ar1[i] = x;
         this.setState({link: arr,ans:ar1})
         console.log(this.state.link);
     }
     old = (i,j) => {
         var arr = this.state.link;
         var ar1 = this.state.ans;
         arr[j] = i;
         ar1[j] = i;
         this.setState({link: arr,ans:ar1})
         console.log(this.state.link);
     }
     renderDept = (sub,index) => { 
         return (
             <View  key={index}>
               <Text style={styles.setDefaultLinks3}>{sub}:</Text>
               <TextInput
                 placeholder="Link"
                 selectionColor={'#D6D6D6'}
                 style={styles.textInput}
                 defaultValue={this.state.ans[index]} id={index} onChangeText={(e) => this.link(e,index)}
               ></TextInput>
               { this.state.lindas[index]!==""?
               <View >
                 <Text style={styles.existingLink} >Existing Link: </Text>
                 <Text style={styles.link} >{this.state.lindas[index]}</Text>
               </View>:(<View>
                    </View>)}
             { this.state.lindas[index]!==""?
             <View ></View>:(<View>
                </View>)}
                { this.state.lindas[index]!==""?
             <TouchableOpacity
             style={styles.group5}
               onPress={() =>this.old(this.state.lindas[index],index)}
             >
               <Text style={styles.useOldLink}>USE EXISTING LINK</Text>
             </TouchableOpacity>:(<View>
                    </View>)}
           </View>
         )
     } 
     

     render(){
  if(this.state.load!=="Yes")
  {return (
    <ScrollView>
      <View style={styles.header}>
          <Text style={styles.heading}>Set Default Links</Text>
        </View>

    <View style={styles.container}>
      
      <View style={styles.ellipseStack}>
        
        <View style={styles.settingsList}>
        
          <View style={styles.accountSettings}>
            
            <View style={styles.subSettings}>
              <View style={styles.editProfileStack}>
                <View style={styles.editProfile}>
                  <Text style={styles.timetable}>Set Default Links</Text>
                </View>
                
                {this.state.sub.map(this.renderDept)}
                <TouchableOpacity
                onPress={this.proceed}
                style={styles.group4}
              >
                <Text style={styles.proceed}>PROCEED</Text>
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
else{
  return(
    <View style={styles.bg}>
      <Image
      source={require("../assets/load3.png")}
      style={styles.load}
    ></Image>
    </View>
  );
}}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: 1200
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
  ellipse: {
    top: -430,
    width: 678,
    height: 802,
    position: "absolute",
    transform: [{rotate: "90.00deg"}],
    left: 0
  },
  settingsList: {
    height: 458,
    width: "97%",
    position: "absolute",
    top: 50
  },
  accountSettings: {
    height: 343,
    marginTop: 15,
    marginLeft: 24,
    marginRight: 24
  },
  subSettings: {
    height: 324,
    marginTop: 27
  },
  editProfile: {
    top: 0,
    height: 34,
    position: "absolute",
    width: "80%",
    left: 0
  },
  timetable: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    width: 270,
    height: 28,
    textAlign: "center",
    marginTop: -746,
    marginLeft: 45,
    fontWeight: "bold"
  },
  timetable2: {
    color: "#D4EBEF",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold"
  },
  group: {
    top: 31,
    height: 34,
    position: "absolute",
    width: 290,
    left: 0
  },
  setDefaultLinks3: {
    color: "#45A2B5",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 35
  },
  textInput: {
    height: 40, 
    borderColor: '#45A2B5', 
    opacity: 0.5,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 20,
    paddingLeft: 20
  },
  group2: {
    height: 22,
    width: 290
  },
  existingLink: {
    color: "#4295A4",
    fontSize: 15,
    marginTop: 0,
    fontWeight: "700",
    paddingLeft: 5
  },
  link: {
    color: "#45A2B5",
    fontSize: 14,
    marginBottom: 7,
    paddingLeft: 25
  },
  setDefaultLinks3Column: {
    width: 299,
    marginTop: 7
  },
  setDefaultLinks3ColumnFiller: {
    flex: 1
  },
  group3: {
    height: 35,
    backgroundColor: "rgba(31,178,204,1)",
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: -93,
    marginLeft: 39,
    marginRight: 54
  },
  group5: {
    height: 35,
    width: 180,
    borderColor: "#FF8F2E",
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    marginLeft: -25,
    marginTop: 5,
    marginBottom: 5,
  },
  useOldLink: {
    color: "#FF7600",
    fontSize: 12,
    paddingLeft: 5,
    textAlign: "center",
    alignSelf: "center",
    opacity: 0.5
  },
  editProfileStack: {
    width: "100%",
    height: 65,
    marginTop: -60,
    marginLeft: 10
  },
  editProfileStackFiller: {
    flex: 1
  },
  group4: {
    height: 35,
    backgroundColor: "rgba(31,178,204,1)",
    borderRadius: 5,
    justifyContent: "center",
    marginTop:50,
    width: "60%",
    alignSelf: "center"
  },
  proceed: {
    color: "rgba(255,255,255,1)",
    width: "100%",
    height: 15,
    textAlign: "center",
    alignSelf: "center"
  },
  ellipseStack: {
    height: 702,
  },
  setDefaultLinks: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    width: "80%",
    height: 28,
    textAlign: "center",
    marginTop: -746,
    marginLeft: 45
  }
});






// renderDept = (sub,index) => { 
//     return (
//         <View key={index}>
//             <Text >{sub}</Text>
//             <TextInput type="text" defaultValue={this.state.ans[index]} id={index} onChangeText={(e) => this.link(e,index)}/>
//             { this.state.lindas[index]!==""?
//                 <View>
//                 <Text>{`Existing Link: ${this.state.lindas[index]}`}</Text>

//                 <Button  title="Use Old Link" onPress={() =>this.old(this.state.lindas[index],index)} ></Button>
//                </View>:(<View>
//                </View>)
//             }
            
//         </View>
//     )
// } 