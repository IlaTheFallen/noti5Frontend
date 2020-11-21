import React, {Component} from 'react';
import Axios from 'axios';
import { View, Image, Text,Button,TextInput,ScrollView,StyleSheet,TouchableOpacity,BackHandler} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import {Picker} from '@react-native-community/picker';


const days = ["","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
export default class Admin extends Component {        
            constructor(){
              super();
              this. state = {
                department: "",
                year: "",
                slot: "",
                start_day: "",
                final_day: "",
                numberofhours: 0,
                hours: [],
                sub: [],
                timetable: [],
                mon:[],
                tue:[],
                wed:[],
                thurs:[],
                fri:[],
                sat:[],
                sun:[],
                teach:[],
                staffArr: [],
                vals:[],
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
            // this.state.department="Information Technology"; 
            //  this.state.slot="slot 1";
            //   this.state.year="2";
            const {params} = this.props.navigation.state;
            if (params) {
              this.state.department=params[0]; 
              this.state.slot=params[1];
              this.state.year=params[2];
            }

            const mail = { email: await AsyncStorage.getItem("email") };
            const sub = await Axios.post("https://noti5backend.herokuapp.com/retTime", mail);
            this.setState({
                start_day: sub.data.start_day,
                final_day: sub.data.final_day,
                numberofhours: sub.data.numberofhours,
                hours: sub.data.hours,
            });

            const subje = { 
                email: await AsyncStorage.getItem("email"),
                dept_name: this.state.department,
                year: this.state.year,
                slot: this.state.slot
            
            };
            console.log(subje);
            const subs = await Axios.post("https://noti5backend.herokuapp.com/retSubjects",subje);
            this.setState({sub: subs.data.subj,teach: subs.data.teach,staffArr: subs.data.staffArr});


            
            let i,j,k;
            var n = Number(this.state.start_day) - Number(this.state.final_day)
            if(n<0) n = -n;
            var n1=n;
            var arr1 = [];
            var num = Number(this.state.numberofhours);
            var n2=num;
            var vals=[],valss=[];
            var periods1 = [];
            var mon = [];
            var tue = [];
            var wed = [];
            var thurs = [];
            var fri = [];
            var sat = [];
            var sun = [];
            for(i=0;i<num;i++)
            {
                periods1.push("");
                mon.push({sub:"",teach:"",topic:"",link:"",bool:"",date:"",def:"",teach_name:""});
                tue.push({sub:"",teach:"",topic:"",link:"",bool:"",date:"",def:"",teach_name:""});
                wed.push({sub:"",teach:"",topic:"",link:"",bool:"",date:"",def:"",teach_name:""});
                thurs.push({sub:"",teach:"",topic:"",link:"",bool:"",date:"",def:"",teach_name:""});
                fri.push({sub:"",teach:"",topic:"",link:"",bool:"",date:"",def:"",teach_name:""});
                sat.push({sub:"",teach:"",topic:"",link:"",bool:"",date:"",def:"",teach_name:""});
                sun.push({sub:"",teach:"",topic:"",link:"",bool:"",date:"",def:"",teach_name:""});
            }
            this.setState({
                mon:mon,
                tue:tue,
                wed:wed,
                thurs:thurs,
                fri:fri,
                sat:sat,
                sun:sun,
                })
            for(i=0;i<=n;i++)
            {
                arr1.push({
                    day: days[Number(this.state.start_day)+i],
                    periods: periods1
                })
            } for(k=0;k<n2;k++)
            {
                vals.push("");
            }

        for(j=0;j<n1;j++)
        {
            valss.push(vals);
            
        }
            this.setState({timetable: arr1})
            console.log(this.state.sub);
            this.setState({load:"No"});
          }  

    hours = (e) => {
        var n = Number(e);
        var i,arr = [];
        
        for(i=0; i<n; i++)
        {
            arr.push({
                start_time: '00:00',
                end_time: '00:00'
            })
        }
        this.setState({hours: arr});
        console.log(this.state);
    }

    proceed = async() => {
         
        try {
            const newAdmin = { 
                department: this.state.department,
                year: this.state.year,
                slot: this.state.slot,
                start_day: this.state.start_day,
                final_day: this.state.final_day,
                hours: this.state.hours,
                sub: this.state.sub,
                timetable: this.state.timetable
            };
            const sign = await Axios.post("https://noti5backend.herokuapp.com/setTimetable", newAdmin);
            console.log(sign.data);
            this.props.navigation.navigate("AdminTimetable");
          } catch (err) {
            alert(err.response.data.msg);
          }
         
    
    console.log(this.state.timetable);
}

    renderSub = (subj,index) =>{
        var res = subj.split("(");
        var res2 = res[1].split(")");
        return(
       
                <Picker.Item  value={`${subj}`} key={`${index}`} label={`${subj}`}/>
               )
      }

    renderDays = (timetable,i) =>{
        
        var timetable2 = this.state.timetable;
            var mon=this.state.mon;
            var tue=this.state.tue;
            var wed=this.state.wed;
            var thurs=this.state.thurs;
            var fri=this.state.fri;
            var sat=this.state.sat;
            var sun=this.state.sun;
            var teach=this.state.teach;
            var subje=this.state.sub;
            var staffArr=this.state.staffArr;
            var vals=this.state.vals;
            var start_day=this.state.start_day;
            var final_day=this.state.final_day;
        
            function changeSub (l,subj,j) {
                
                var sub = subj;
                var id1,k;
                for(k=0;k<subje.length;k++)
                {
                    if(subje[k]===subj)
                    id1=k;
                }
                if(timetable2[l].day==="Monday")
                {mon[j].sub = sub;mon[j].teach = teach[id1];mon[j].teach_name = staffArr[id1];}
                else if(timetable2[l].day==="Tuesday")
                {tue[j].sub = sub;tue[j].teach = teach[id1];tue[j].teach_name = staffArr[id1];}
                else if(timetable2[l].day==="Wednesday")
                {wed[j].sub = sub;wed[j].teach = teach[id1];wed[j].teach_name = staffArr[id1];}
                else if(timetable2[l].day==="Thursday")
                {thurs[j].sub = sub;thurs[j].teach = teach[id1];thurs[j].teach_name = staffArr[id1];}
                else if(timetable2[l].day==="Friday")
                {fri[j].sub = sub;fri[j].teach = teach[id1];fri[j].teach_name = staffArr[id1];}
                else if(timetable2[l].day==="Saturday")
                {sat[j].sub = sub;sat[j].teach = teach[id1];sat[j].teach_name = staffArr[id1];}
                else if(timetable2[l].day==="Sunday")
                {sun[j].sub = sub;sun[j].teach = teach[id1];sun[j].teach_name = staffArr[id1];}
    
    
            var n = Number(start_day) - Number(final_day)
            if(n<0) n = -n;
            var i ;
            for(i=0;i<=n;i++)
            {
                if(timetable2[i].day==="Monday")
                timetable2[i].periods = mon;
                else if(timetable2[i].day==="Tuesday")
                timetable2[i].periods = tue;
                else if(timetable2[i].day==="Wednesday")
                timetable2[i].periods = wed;
                else if(timetable2[i].day==="Thursday")
                timetable2[i].periods = thurs;
                else if(timetable2[i].day==="Friday")
                timetable2[i].periods = fri;
                else if(timetable2[i].day==="Saturday")
                timetable2[i].periods = sat;
                else if(timetable2[i].day==="Sunday")
                timetable2[i].periods = sun;
            }
    
            window.alert(timetable2[l].periods[j].sub + " is selected");
            }
        return(
          <View  key={i} 
          onChange={() =>
            this.setState({
            timetable: timetable2,
            mon:mon,
            tue:tue,
            wed:wed,
            thurs:thurs,
            fri:fri,
            sat:sat,
            sun:sun,
            staffArr:staffArr,
            vals:vals
            })}
          >
          <Text style={styles.day}>{`${timetable.day}:`}</Text>
          <View>
          {timetable.periods.map(function(hour,index){
             var data=[] 
              subje.map(function(subj,index){
               data.push({value:subj})
            }) 
              return(
                <View  key={index}>
                <Text style={styles.hour}>{`Hour ${index+1}:`}</Text>
                <View style={styles.group}>
                <Picker
                      selectedValue={timetable2[i].periods[index].sub} 
                     style={styles.picker}
                     onValueChange={(val1) => changeSub(i,val1,index)}
                     > 

                        
                  <Picker.Item label="Select Subject" value=" " /> 
                  
                  {subje.map(function(subj,index){
                      return(
                          <Picker.Item  value={`${subj}`} key={`${index}`} label={`${subj}`}/>
                           )
                  })}
               </Picker>
               </View>
              </View>
              )
          })} 
          </View>
        </View>
        )
      }

  render(){
    if(this.state.load!=="Yes")
  {
  return (
    <ScrollView style={styles.bg}>
        <View style={styles.header}>
          <Text style={styles.heading}>SET TIMETABLE</Text>
        </View>
      <View style={styles.container}>
      
     {this.state.timetable.map(this.renderDays)}

     <TouchableOpacity
    onPress={this.proceed}
    style={styles.button1}
    >
    <Text style={styles.proceed}>PROCEED</Text>
    </TouchableOpacity>
     </View>
    </ScrollView>
  );}
  else{
    return(
      <View style={styles.bg1}>
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
      marginTop: 30,
      marginLeft: 30,
      marginRight: 30,
      marginBottom: 50
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
        top: 27
    },
    bg: {
        backgroundColor: "#fff"
    },
    bg1: {
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
    group:{
        marginTop: 10,
        marginBottom: 10,
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
    day: {
      color: "#2A92A4",
      fontSize: 22,
      fontWeight: "bold",
      marginTop: 30,
      marginBottom: 20
    },
    hour: {
        color: "#3BABBD",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10
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
      proceed: {
        color: "rgba(255,255,255,1)",
        textAlign: "center",
        fontWeight: "bold"
      }

})