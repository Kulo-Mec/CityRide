import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Linking } from "react-native";
import { StatusBar } from 'expo-status-bar';
import {initializeApp} from 'firebase/app';
import { collection, query, where, getDocs, getFirestore  } from "firebase/firestore";
import { AntDesign } from '@expo/vector-icons';
import Toast, { BaseToast } from 'react-native-toast-message';
import { ScrollView } from "react-native-gesture-handler";

const firebaseConfig = {
  apiKey: "AIzaSyDwdWH1qBjkcCaDpyX7ws6KMzwEQJJkL6c",
  authDomain: "cityride-nielit.firebaseapp.com",
  projectId: "cityride-nielit",
  storageBucket: "cityride-nielit.appspot.com",
  messagingSenderId: "321185798040",
  appId: "1:321185798040:web:02b19032b7301eb1debded"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#06c58e', backgroundColor: "#06c58e", borderRadius: 12, marginBottom: 65, width:"90%" }}
      text1Style={{
        fontSize: 15,
        color:"#fff",
        textAlign:"center"
      }}
    />
  )
};

export default class DriverScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rides: []
    };
  }
  getRidesData = async() => {
    Toast.show({
      type: 'success',
      text1: 'Please wait, refreshing data'
    });
    let data = {};
    let firebaseData = [];
    const q = query(collection(db, "rides"), where("isRideAccepted", "==", false),);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data=doc.data()
        firebaseData.push(data)
    })
    this.setState({rides: firebaseData})
  }
  async componentDidMount(){
    this.getRidesData();
  }
  render() {
    let {rides} = this.state;
    return (
      <View style={{backgroundColor:"#fff", padding:"4%", flex: 1, paddingTop: "6%"}}>
        <StatusBar backgroundColor={"#000"} style="light" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: 15, marginBottom: 25}}>
            <Text style={{color:"#222", fontSize: 22}}>Active Ride Requests</Text>
          </View>
          {
            rides.length > 0 ?
              <View style={{ marginTop: "2%", marginBottom: 75, paddingLeft: 10, paddingRight: 10 }}>
                {
                  rides.map((item, key) => (
                    <TouchableOpacity style={{borderWidth: 1, borderColor: "#f4c430", backgroundColor:"#FFF5D5", padding: 15, marginBottom: 7, borderRadius: 7, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}} key={key}>
                        <View style={{width: "85%"}}>
                            <Text style={{fontSize: 15, color:"#222", }}>{item.pickupLocation} to {item.dropLocation}</Text>
                            <Text style={{fontSize: 12, color:"#222", marginTop: 3,}}>{item.date}</Text>
                        </View>
                        <AntDesign name="rightcircle" size={27} color="green" />
                    </TouchableOpacity>
                  ))
                }
              </View>
              :
              <></>
          }
        </ScrollView>
        <Toast position="bottom" visibilityTime={2000} config={toastConfig}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    contentBox:{
        borderRadius: 12, backgroundColor: "red",
        height: 170,
        width: "100%",
        marginBottom: 15,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      borderRadius: 12, // Add borderRadius
      overflow: 'hidden', // Ensure border-radius is applied
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust opacity as needed
      justifyContent: 'flex-end',
      padding: 20,
      paddingBottom: 15
    },
    overlayText: {
      color: '#fff', // Text color
      fontSize: 17, // Text size
      fontWeight: 'bold', // Text weight
    },
})