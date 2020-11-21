import React, {Component} from 'react';
import Axios from "axios";
import { View, Text,Button,StyleSheet,Image,TextInput,ScrollView,TouchableOpacity, StatusBar, BackHandler} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import {Picker} from '@react-native-community/picker';
import Svg, { Ellipse } from "react-native-svg";
import IoniconsIcon from "react-native-vector-icons/Ionicons";

const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

 export default class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timetable: [],
      load: "Yes",
      day: "",
      today: [],
      leave: "",
      hasSet: [],
      date: "",
      start_day: "",
      final_day: "",
      title: [],
      head: [],
      data: [],
      name: ""
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
    StatusBar.setBarStyle( 'light-content',true)
    StatusBar.setBackgroundColor("#0996AE")
    var d = new Date();
    var rese = d.toString().split(" ");
    var rese1 = rese[0]+rese[1]+rese[2];
    var nam = await AsyncStorage.getItem("name");
    this.setState({date: rese1, name: nam});

    var str = d.toString().split(" ");
    if(str[0]==="Mon")
    this.setState({day: "Monday"});
    else if(str[0]==="Tue")
    this.setState({day: "Tuesday"});
    else if(str[0]==="Wed")
    this.setState({day: "Wednesday"});
    else if(str[0]==="Thu")
    this.setState({day: "Thursday"});
    else if(str[0]==="Fri")
    this.setState({day: "Friday"});
    else if(str[0]==="Sat")
    this.setState({day: "Saturday"});
    else if(str[0]==="Sun")
    this.setState({day: "Sunday"});

    const mail = { 
      department:await AsyncStorage.getItem("department"),
      email:await AsyncStorage.getItem("email") 
    };
    const sub = await Axios.post("https://noti5backend.herokuapp.com/staffTimetable", mail);
    this.setState({timetable: sub.data.tb});
    this.setState({hasSet: sub.data.hasSet});
    this.setState({start_day: sub.data.leaveStart_day});
    this.setState({final_day: sub.data.leaveFinal_day});
    var i,arr=[];
    var bool = "Yes";
    for(i=0;i<this.state.timetable.length;i++)
    {
      if(this.state.timetable[i][0].day===this.state.day)
        arr=this.state.timetable[i];
    }
    this.setState({today: arr});
    for(i=0;i<arr.length;i++)
    {
      if(arr[i].sub!=="")
      bool="No"
    }
    var x1= this.state.start_day;
    var z1=this.state.final_day;
    console.log(x1);
    var start=new Date(x1); //yyyy-mm-dd  
    var test=new Date(); 
    var end=new Date(z1);//yyyy-mm-dd  
    if(test>=start && test<=end)
      bool="Yes";  

    this.setState({leave: bool});
    var i,j;

    var sq,tableHead=["","1","2","3","4"],tableTitle=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],tableData=[["","","",""],["","","",""],["","","",""],["","","",""],["","","",""],["","","",""]];
    var tbb = this.state.timetable;
      for(i=0;i<tableTitle.length;i++) {
      for(j=0;j<tableHead.length-1;j++) {
        sq = tbb[i][j].sub.split("(");
      tableData[i][j]=sq[0];
      }
    }
    this.setState({data: tableData,head: tableHead,title: tableTitle});

    console.log(this.state);
    this.setState({load:"No"});
    
}  

proceed5 = async() => {
  AsyncStorage.setItem("email", null);
  AsyncStorage.removeItem("role");
  AsyncStorage.setItem("department", null);
  this.props.navigation.navigate('Home');
  console.log(this.state);
}
proceed1 = (dep,ind) => {
  const send =[dep,ind];
  this.props.navigation.navigate('setClassInfo',send); 
console.log(dep);
}
proceed2 = () => {
  this.props.navigation.navigate('setDefaultLink');
  }
proceed3 = () => {
  const data = [this.state.head, this.state.title, this.state.data];
  console.log(data);
  this.props.navigation.navigate('stfTimeTable',data);
  }
renderDept = (dep,index) => {
  
  return (
      <View style={styles.button} key={index}>
        {
        dep.sub!==""?
        <View>
        <Text style={styles.ashwath}><B>Hour {index+1}: </B>{dep.sub}{"\n"}For year-{dep.year} ({dep.slot}) 
        {/* {
        this.state.hasSet[index]===this.state.date?
        <Text style={styles.ashwath}> {"\n"}<B>Details Set!</B></Text>
          :(<Text style={styles.ashwath}>{"\n"}<B>Details not Set!</B></Text>)
        } */}
        </Text>
        <TouchableOpacity
             style={styles.group5}
               onPress={() =>this.proceed1(dep,index)}
             >
               <Text style={styles.useOldLink}>Set Info</Text>
        </TouchableOpacity>
        </View>
        :(
          <Text style={styles.ashwath}><B>Hour {index+1}:</B> Free Hour</Text>
        )
        }
      </View>
  )
} 

render(){
  if(this.state.load!=="Yes")
 { return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.ellipseStack}>
        <Svg style={styles.ellipse}>
          <Ellipse
            strokeWidth={1}
            fill="rgba(255,255,255,1)"
            cx={430}
            cy={1005}
            rx={529}
            ry={545}
          ></Ellipse>
          <Ellipse
            strokeWidth={1}
            fill="rgba(255,255,255,1)"
            cx={430}
            cy={1105}
            rx={529}
            ry={545}
          ></Ellipse>
        </Svg>
        <View style={styles.settingsList}>
          <View style={styles.accountSettings}>
            <Text style={styles.adminOptions}>Today's Schedule</Text>
            <View style={styles.subSettings}>
              <View style={styles.editProfileColumn}>

              {
      this.state.leave==="No"?
        
      this.state.today.map(this.renderDept)
      :(
        <Text style={styles.no}>Today you have no classes!</Text>
      )
      }
                <View style={styles.group}>
                  <Text style={styles.addUpdateTimings2} onPress={ this.proceed2}>
                    Set Default Links
                  </Text>
                  <IoniconsIcon
                    name="ios-arrow-forward"
                    style={styles.icon4}
                    onPress={ this.proceed2}
                  ></IoniconsIcon>
                </View>

                <View style={styles.group}>
                  <Text style={styles.addUpdateTimings2} onPress={ this.proceed3}>
                    View Timetable
                  </Text>
                  <IoniconsIcon
                    name="ios-arrow-forward"
                    style={styles.icon4}
                    onPress={ this.proceed3}
                  ></IoniconsIcon>
                </View>
                <View style={styles.group2}>
                  <Text style={styles.logout} onPress={ this.proceed5}>Logout</Text>
                  <IoniconsIcon
                    name="ios-arrow-forward"
                    style={styles.icon5}
                    onPress={ this.proceed5}
                  ></IoniconsIcon>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.avatarRow}>
            <Image
              source={require("../assets/actor-adult-black-and-white-1040880.png")}
              resizeMode="stretch"
              style={styles.avatar}
            ></Image>
            <Text style={styles.userEmail}>{this.state.email}</Text>
            <Text style={styles.stanSmith}>Welcome{"\n"}{this.state.name}</Text>
          </View>
        </View>
      </View>
    </View>
    </ScrollView>
  );
    }
    else
    {
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
  group5: {
    height: 35,
    width: 260,
    borderColor: "#FF7600",
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 5,
  },
  useOldLink: {
    color: "#FF7600",
    fontSize: 12,
    paddingLeft: 5,
    textAlign: "center",
    alignSelf: "center"
  },
  container: {
    backgroundColor: "#1fb2cc",
    width: "100%",
    height: 970,
    fontFamily: 'Poppins'
  },
  cont: {
    top: 500,
    backgroundColor: "#fff",
    height: "100%",
    width: "100%"
  },
  no: {
    fontSize:20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#228192"
  },
  ashwath:{
    fontSize:15,
    fontFamily: 'Poppins',
    lineHeight: 21
  },
  button: {
    height: 'auto',
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#45A2B5",
    borderWidth: 1,
    marginBottom:20,
    padding:12,
    borderStyle:"solid",
    fontFamily: 'Poppins'
  },
  ellipse: {
    top: -500,
    left: 0,
    width: "70%",
    height: "200%"
  },
  settingsList: {
    left: 51,
    height: 458,
    position: "absolute",
    right: 450,
    bottom: 193
  },
  accountSettings: {
    height: 343,
    marginTop: 15,
    marginLeft: 24,
    marginRight: 24
  },
  adminOptions: {
    color: "#121212",
    fontSize: 23,
    marginTop: -125,
    fontWeight:"bold",
    fontFamily: 'Poppins'
  },
  subSettings: {
    height: 100,
    marginTop: 15
  },
  editProfile: {
    height: 34
  },
  addUpdateStaffs: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginTop: 7
  },
  icon: {
    color: "rgba(31,178,204,1)",
    fontSize: 30,
    alignSelf: "flex-end",
    marginTop: -25
  },
  changeConnections: {
    height: 33,
    marginTop: 10
  },
  addUpdateSubjects: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginTop: 7
  },
  icon2: {
    color: "rgba(31,178,204,1)",
    fontSize: 30,
    alignSelf: "flex-end",
    marginTop: -25
  },
  editProfileColumn: {
    marginTop: 9,
    marginLeft: 10,
    marginRight: 10
  },
  editProfileColumnFiller: {
    flex: 1
  },
  providerSettings: {
    height: 34,
    marginBottom: 6
  },
  addUpdateTimings: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginTop: 7
  },
  icon3: {
    color: "#1fb2cc",
    fontSize: 30,
    alignSelf: "flex-end",
    marginTop: -25
  },
  group: {
    height: 34,
    marginBottom: 11
  },
  addUpdateTimings2: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginTop: 7
  },
  icon4: {
    color: "#1fb2cc",
    fontSize: 30,
    alignSelf: "flex-end",
    marginTop: -25
  },
  icon11: {
    color: "#1fb2cc",
    fontSize: 30,
    marginRight:100
  },
  group2: {
    height: 34
  },
  logout: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginTop: 7
  },
  icon5: {
    color: "#1fb2cc",
    fontSize: 30,
    alignSelf: "flex-end",
    marginTop: -25
  },
  providerSettingsColumn: {
    marginBottom: 108,
    marginLeft: 10,
    marginRight: 10
  },
  userInfo: {
    top: 0,
    left: 87,
    height: 125,
    position: "absolute",
    right: 451,
    flexDirection: "row"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 150
  },
  userEmail: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginLeft: 62,
    marginTop: 88
  },
  stanSmith: {
    color: "#1fb2cc",
    fontSize: 25,
    marginTop: 25,
    marginRight: -100,
    fontWeight: "bold",
    fontFamily: 'Poppins'
  },
  avatarRow: {
    height: 100,
    flexDirection: "row",
    flex: 1,
    marginRight: 200
  },
  ellipseStack: {
    height: 890,
    marginTop: 43,
    marginLeft: -50,
    marginRight: -449
  },
  welcome: {
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -899,
    marginLeft: 43,
    textDecorationLine: "underline",
    fontFamily: 'Poppins'
  },
  container1: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#CCC",
    flexWrap: "nowrap",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    overflow: "hidden"
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bodyContent: {
    padding: 16,
    paddingTop: 24,
    flex: 1
  },
  titleStyle: {
    fontSize: 24,
    color: "#000",
    paddingBottom: 12
  },
  titleStyle2: {
    fontSize: 16,
    color: "#000"
  },
  titleStyle3: {
    fontSize: 16,
    color: "#000"
  },
  subtitleStyle: {
    fontSize: 14,
    color: "#000",
    lineHeight: 16,
    opacity: 0.5
  },
  cardItemImagePlace: {
    backgroundColor: "#ccc",
    height: 100,
    width: 85,
    margin: 16
  },
  actionBody: {
    flexDirection: "row",
    paddingTop:5
  },
  actionButton1: {
    height: 30
  },
  goToClass: {
    fontSize: 14,
    color: "blue",
    opacity: 0.9,
    textDecorationLine:"underline"
  }
});
