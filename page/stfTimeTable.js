import React, { Component } from 'react';
import { StyleSheet, View,Text, BackHandler,ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import Svg, { Ellipse } from "react-native-svg";
import AsyncStorage from '@react-native-community/async-storage';

export default class ExampleTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [],
      tableTitle: [],
      tableData: [],
      year: "",
      slot: ""
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

    const {params} = this.props.navigation.state
     if (params) {
       this.setState({tableHead:params[0]}); 
       this.setState({tableTitle:params[1]});
       this.setState({tableData:params[2]});
     }  
  }

  render() {
    const state = this.state;
  return (
    <ScrollView>
    <View style={styles.header}>
          <Text style={styles.heading}>TIMETABLE</Text>
        </View>
    <View style={styles.container}>
      <View style={styles.ellipseStack}>
        <View style={styles.settingsList}>
        <Table borderStyle={{borderWidth: 1}}>
          <Row data={state.tableHead} style={styles.head} flexArr={[1, 1, 1, 1, 1]}  textStyle={styles.text1}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={state.tableTitle} style={styles.title} flexArr={[1,1,1,1]} textStyle={styles.text2}/>
            <Rows data={state.tableData} style={styles.row} flexArr={[1,1,1,1]}  textStyle={styles.text3}/>
          </TableWrapper>
        </Table>
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
    width: "100%",
    height: "100%"
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
  
  settingsList: {
    left: 161,
    height: 458,
    position: "absolute",
    right: 159,
    bottom: 158,
    padding: 10
  },
  ellipseStack: {
    height: 702,
    marginTop: -10,
    marginLeft: -159,
    marginRight: -159
  },
  timetable: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    width: 270,
    height: 28,
    textAlign: "center",
    marginTop: -756,
    marginLeft: 45,
    fontWeight: "bold"
  },
  timetable2: {
    color: "#D4EBEF",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold"
  },
  head: {  height: 30,  backgroundColor: '#378EA0'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#F0FBFF' },
  row: {  height: 80  },
  text1: { 
    textAlign: 'center',
    fontWeight: "bold",
    color: '#fff',
    fontSize: 10
  },
  text2: { 
    textAlign: 'center',
    fontWeight: "700",
    color: '#333',
    fontSize: 10
  },
  text3: { 
    textAlign: 'center' ,
    fontSize: 10
  },
});

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
//   head: {  height: 40,  backgroundColor: '#f1f8ff'  },
//   wrapper: { flexDirection: 'row' },
//   title: { flex: 1, backgroundColor: '#f6f8fa' },
//   row: {  height: 28  },
//   text: { textAlign: 'center' }
// });