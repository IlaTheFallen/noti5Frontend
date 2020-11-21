import React, { Component} from "react";
import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { View, Text,Button, ScrollView,TextInput, BackHandler} from 'react-native';

export default class Signup extends Component{
        constructor(){
          super();
          this.state = {
            name: "", 
            college: "",
            email: "",
            password: "",
            passwordCheck: ""
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

    proceed = async(e) => {
        e.preventDefault();
        console.log(this.state);
        
      try {
        const newAdmin = { 
            name: this.state.name, 
            college: this.state.college,
            email: this.state.email,
            password: this.state.password,
            passwordCheck: this.state.passwordCheck
        };
        const sign = await Axios.post("https://noti5backend.herokuapp.com/adminSignup", newAdmin);
        console.log(this.state.email);
        AsyncStorage.setItem("email", sign.data.email);
        AsyncStorage.setItem("role", "admin");
        this.props.navigation.navigate("AdminTimetable");
      } catch (err) {
        alert(err.response.data.msg);
      }
    }
    proceed1 = async() => {
       //.preventDefault();
        console.log(this.state);
        try {
            const newAdmin = { 
                name: this.state.name, 
                college: this.state.college,
                email: this.state.email,
                password: this.state.password,
                passwordCheck: this.state.passwordCheck
            };
            const sign = await Axios.post("https://noti5backend.herokuapp.com/adminSignup", newAdmin);
            console.log(this.state);
            AsyncStorage.setItem("email", sign.data.email);
            AsyncStorage.setItem("role", "admin");
            this.props.navigation.navigate("AdminTimetable");
          } catch (err) {
            alert(err.response.data.msg);
          }
       
        
        }
    render(){
    return(
        <ScrollView  keyboardShouldPersistTaps={'always'}>
            
            <Text style={{textAlign:"left",fontSize:20}}>Name of Admin</Text>
            <TextInput style={{height: 50, width: 200}}
            placeholder="name"
            onChangeText={(value) => this.setState({name: value})}
            value={this.state.name}
    />
            <Text></Text>
            <Text style={{textAlign:"left",fontSize:20}}>College</Text>
            <TextInput style={{height: 70, width: 300}}
            placeholder="college"
            onChangeText={(value) => this.setState({college: value})}
            value={this.state.college}
    />
<Text></Text>
<Text style={{textAlign:"left",fontSize:20}}>Email</Text>
            <TextInput style={{height: 70, width: 300}}
            placeholder="mail id"
            onChangeText={(value) => this.setState({email: value})}
            value={this.state.email}
    />
<Text></Text>
<Text style={{textAlign:"left",fontSize:20}}>Password</Text>
            <TextInput style={{height: 70, width: 300}} type="password"         
            placeholder="password"
            onChangeText={(value) => this.setState({password: value})}
            value={this.state.password}
    />
<Text></Text>
<Text style={{textAlign:"left",fontSize:20}}>Retype Password</Text>
            <TextInput style={{height: 70, width: 300}} type="password"         
            placeholder="passwordCheck"
            onChangeText={(value) => this.setState({passwordCheck: value})}
            value={this.state.passwordCheck}
    />
<Text></Text>

            <Button title="proceed" onPress={this.proceed1}></Button>
        </ScrollView>
    );
    }


}
