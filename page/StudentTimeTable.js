import React, {Component} from 'react';
import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import {Picker} from '@react-native-community/picker';
import { StyleSheet, View, Text, Image,Button, Linking,TextInput,ScrollView,TouchableOpacity, StatusBar, BackHandler} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import PushNotification from "react-native-push-notification";

const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>


export default class Student extends Component {

 constructor(){
    super();
    this.state = {
      timetable: [],
      day: "",
      today: [],
      leave: "",
      hasSet: [],
      date: "",
      hours: [],
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
      start_day: "",
      final_day: "",
      data: [],
      head: [],
      title: [],
      name: "",
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
    BackHandler.exitApp();
    return true;
  }
  
  componentDidMount = async() => {

    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
      },
      onRegistrationError: function(err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    PushNotification.cancelAllLocalNotifications()

    try
    {var nam=await AsyncStorage.getItem("name");

    StatusBar.setBarStyle( 'light-content',true)
    StatusBar.setBackgroundColor("#0996AE")
    const mail = { 
      email: await AsyncStorage.getItem("email"),
      department: await AsyncStorage.getItem("department"),
      year: await AsyncStorage.getItem("year"),
      slot: await AsyncStorage.getItem("slot")
    };
    const sub = await Axios.post("https://noti5backend.herokuapp.com/studentTimetable", mail);
    this.state.timetable = sub.data.timetable;
    this.state.hours = sub.data.hours;
    if(sub.data.leaveStart_day)
    {
    this.state.start_day = sub.data.leaveStart_day;
    this.state.final_day = sub.data.leaveFinal_day;
    }
    var tb = sub.data.timetable;
    var d = new Date();

    var rese = d.toString().split(" ");
    var rese1 = rese[0]+rese[1]+rese[2];
    this.setState({date: rese1,name:nam});

    var mon=[];
    var tue=[];
    var wed=[];
    var thu=[];
    var fri=[];
    var sat=[];
    var sun=[];

    var str = d.toString().split(" ");
    var x,i,y=[];
    // str[0]="Tue"
    if(str[0]==="Mon")
    {x="Monday"}
    else if(str[0]==="Tue")
    {x="Tuesday"}
    else if(str[0]==="Wed")
    {x="Wednesday"}
    else if(str[0]==="Thu")
    {x="Thursday"}
    else if(str[0]==="Fri")
    {x="Friday"}
    else if(str[0]==="Sat")
    {x="Saturday"}
    else if(str[0]==="Sun")
    {x="Sunday"}
    for(i=0;i<tb.length;i++)
    {
      if(tb[i].day===x)
      {y=tb[i].periods}

      if(tb[i].day==="Monday"){mon=tb[i].periods}
      else if(tb[i].day==="Tuesday"){tue=tb[i].periods}
      else if(tb[i].day==="Wednesday"){wed=tb[i].periods}
      else if(tb[i].day==="Thursday"){thu=tb[i].periods}
      else if(tb[i].day==="Friday"){fri=tb[i].periods}
      else if(tb[i].day==="Saturday"){sat=tb[i].periods}
      else if(tb[i].day==="Sunday"){sun=tb[i].periods}
    }
    var bool="Yes"
    for(i=0;i<y.length;i++)
    {
      if(y[i].sub!=="")
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
    this.setState({today: y,mon:mon,tue:tue,wed:wed,thu:thu,fri:fri,sat:sat,sun:sun})  
    }

    catch(err){
      window.alert(err.response.data.msg);
      AsyncStorage.removeItem("email");
        AsyncStorage.removeItem("name");
        AsyncStorage.removeItem("role");
        AsyncStorage.removeItem("department");
        AsyncStorage.removeItem("slot");
        AsyncStorage.removeItem("year");
        this.props.navigation.navigate("Student");
    }
    // console.log(this.state);

    var i,j,l;

  var k = d.getDay();
  var fruits = ([0, 1, 2, 3, 4, 5, 6].slice(k, 7)).concat([0, 1, 2, 3, 4, 5, 6].slice(0, k));
var td;
var d1=this.state.start_day;
var d2=this.state.final_day;
var arr2=[{h:8,m:30},{h:9,m:20},{h:10,m:35},{h:11,m:50},{h:13,m:50}]

var str="";
for(j=0;j<=7;j++)
{ 
td = new Date(d.getFullYear(), d.getMonth(), d.getDate()+j);
     var suu = [];
              if(fruits[j]===1)
                  suu = this.state.mon;
              else if(fruits[j]===2)
                  suu = this.state.tue;
              else if(fruits[j]===3)
                  suu = this.state.wed;
              else if(fruits[j]===4)
                  suu = this.state.thu;
              else if(fruits[j]===5)
                  suu = this.state.fri;
              else if(fruits[j]===6)
                  suu = this.state.sat;


        if(suu.length!==0)
        {
          for(i=0;i<arr2.length;i++)
              {
              let hr = arr2[i].h; let mi = arr2[i].m; let da = j*24; let db = j*60;
              
                  if((hr+da)-d.getHours()>=0)
                  {

                        let x=((((hr+da)-d.getHours()-j)*3600) + (((mi+db)-d.getMinutes())*60))-d.getSeconds();
                        if(i==0)
                        {
                          if(suu[0].sub==="")
                          this.noti("Check for today's timetable", 
                          "You have the subjects:\n1."+suu[0].sub+"\n2."+suu[1].sub+"\n3."+suu[2].sub+"\n4."+suu[3].sub + "\ntoday.", 
                          x );
                          else if(suu[1].sub==="")
                          this.noti("Check for today's timetable", 
                          "You have the subjects:\n1."+suu[0].sub+"\n2."+suu[1].sub+"\n3."+suu[2].sub+"\n4."+suu[3].sub + "\ntoday.", 
                          x );
                          else if(suu[2].sub==="")
                          this.noti("Check for today's timetable", 
                          "You have the subjects:\n1."+suu[0].sub+"\n2."+suu[1].sub+"\n3."+suu[2].sub+"\n4."+suu[3].sub + "\ntoday.", 
                          x );
                          else if(suu[3].sub==="")
                          this.noti("Check for today's timetable", 
                          "You have the subjects:\n1."+suu[0].sub+"\n2."+suu[1].sub+"\n3."+suu[2].sub+"\n4."+suu[3].sub+"\ntoday.", 
                          x );
                          else
                          this.noti("Check for today's timetable", 
                          "You have the subjects:\n1."+suu[0].sub+"\n2."+suu[1].sub+"\n3."+suu[2].sub+"\n4."+suu[3].sub + "\ntoday.", 
                          x );
                        }
                        else
                        {
                          if(suu[i-1].sub!=="")
                          this.noti("Its time for your Hour:"+i,
                          "You have to get ready for the class "+suu[i-1].sub+", conducted by "+suu[i-1].teach_name, 
                          x);
                        }
                  }
              }
        }
    }
    var sq,tableHead=["","1","2","3","4"],tableTitle=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],tableData=[["","","",""],["","","",""],["","","",""],["","","",""],["","","",""],["","","",""]];
  var tbb = this.state.timetable;
    for(i=0;i<tableTitle.length;i++) {
    for(j=0;j<tableHead.length-1;j++) {
      sq = tbb[i].periods[j].sub.split("(");
      tableData[i][j]=sq[0];
    }
  }
  this.setState({data: tableData,head: tableHead,title: tableTitle});
  // console.log(this.state);
    this.setState({load:"No"});
}
noti = (x,y,z) => {
  // console.log(x,y,z);
  PushNotification.localNotificationSchedule({
    title: x,
    message: y, 
    date: new Date(Date.now() + Number(z) * 1000)
  });
}
call = async() =>{
        AsyncStorage.removeItem("email");
        AsyncStorage.removeItem("name");
        AsyncStorage.removeItem("role");
        AsyncStorage.removeItem("department");
        AsyncStorage.removeItem("slot");
        AsyncStorage.removeItem("year");
        this.props.navigation.navigate("Home");
}
  proceed7 = (x) => {
    // var y='http://google.com';
    // Linking.openURL(y);
    Linking.openURL('https://aboutreact.com');
    // window.location. href = x;
    // console.log(this.state);
  }

  proceed2 = () => {
    const data = [this.state.head, this.state.title, this.state.data];
    console.log(data);
    this.props.navigation.navigate('stuTimeTable',data)
    
  }

  renderDept = (dep,index) => {
    
    return (
      <View style={styles.button} key={index}>
    {
            
          dep.bool==="false"?
          <Text style={styles.ashwath} ><B>Hour{index+1}    : </B> {dep.sub}{"\n"}
          Class Postponed!! {"\n"}
          </Text>
          :(
            dep.sub===""?
            <Text style={styles.ashwath}><B>Hour {index+1}    : </B> Free Hour{"\n"}</Text>          
            :(
              dep.link===""&&dep.def===""?
              <View>
              <Text style={styles.ashwath}><B>Hour {index+1}      : </B> {dep.sub}{"\n"}
                  <B>Staff         :  </B>{dep.teach_name} {"\n"}
                  <B>Starts at  :  </B>{this.state.hours[index].start_time} {"\n"}
              </Text>
              </View>
                :(dep.date===this.state.date?
                <View>
                <Text>
                <Text style={styles.ashwath}><B>Hour {index+1}      : </B> {dep.sub}{"\n"}
                <B>Staff         :  </B>{dep.teach_name} {"\n"}
                <B>Starts at  :  </B>{this.state.hours[index].start_time} {"\n"}
                </Text>
                <View style={styles.actionBody}>
                <TouchableOpacity style={styles.actionButton1}
                onPress={ this.selection}>
                <Text style={styles.goToClass} onPress={() => {Linking.openURL(dep.link)}}>Go to Class</Text>
                </TouchableOpacity></View>
                </Text>
                </View>

                :(<Text>
                    <Text style={styles.ashwath}><B>Hour {index+1}      : </B> {dep.sub}{"\n"}
                    <B>Staff         :  </B>{dep.teach_name} {"\n"}
                   <B>Starts at  :  </B>{this.state.hours[index].start_time} {"\n"}
                    </Text>
                    <View style={styles.actionBody}>
  <TouchableOpacity style={styles.actionButton1}
  onPress={ this.selection}>
    <Text style={styles.goToClass} onPress={() => {Linking.openURL(dep.def)}}>Go to Class</Text>
  </TouchableOpacity></View>
                </Text>
                ))
            )
          )
          }
        </View>



    )
  } 


  render(){
  if(this.state.load!=="Yes")
  {return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.ellipseStack}>
        <Svg style={styles.ellipse}>
          <Ellipse
            strokeWidth={1}
            fill="rgba(255,255,255,1)"
            cx={370}
            cy={550}
            rx={709}
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
                    View Timetable
                  </Text>
                  <IoniconsIcon
                    name="ios-arrow-forward"
                    style={styles.icon4}
                    onPress={ this.proceed2}
                  ></IoniconsIcon>
                </View>
                <View style={styles.group2}>
                  <Text style={styles.logout} onPress={ this.call}>Logout</Text>
                  <IoniconsIcon
                    name="ios-arrow-forward"
                    style={styles.icon5}
                    onPress={ this.call}
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
    backgroundColor: "#1fb2cc",
    height: 1090,
    width: "100%",
    fontFamily: 'Poppins'
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
  no: {
    fontSize:20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#228192"
  },
  ashwath:{
    fontSize:15,
    fontFamily: 'Poppins',
    lineHeight: 21,
    color: "#167787"
  },
  button: {
    height: 'auto',
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#45A2B5",
    borderWidth: 1,
   marginBottom:20,
   padding:12,
   paddingBottom:0,
   borderStyle:"solid",
   fontFamily: 'Poppins'
  },
  ellipse: {
    left: 0,
    width: 859,
    height: 2590,
    position: "absolute"
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
    color: "#2D95C9",
    textDecorationLine:"underline"
  }
});

