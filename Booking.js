import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  StyleSheet
} from "react-native";
import { StatusBar } from 'expo-status-bar';
import Modal from "react-native-modal";
import moment from "moment";
import { initializeApp } from "firebase/app";
import Toast, { BaseToast } from 'react-native-toast-message';
import * as Location from 'expo-location';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getFirestore, collection, addDoc  } from "firebase/firestore";

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
        style={{ borderLeftColor: '#06c58e', backgroundColor: "#06c58e", borderRadius: 12, marginBottom: 20 }}
        text1Style={{
          fontSize: 15,
          color:"#fff",
          textAlign:"center"
        }}
      />
    ),
    info: (props) => (
        <BaseToast
          {...props}
          style={{ borderLeftColor: '#E3AB12', backgroundColor: "#E3AB12",borderRadius: 12, marginBottom: 20 }}
          text1Style={{
            fontSize: 15,
            color:"#fff",
            textAlign:"center"
          }}
        />
    )
};

export default class BookingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        fullName: "",
        currentDate: moment().format('YYYY-MM-DD'),
        loaderModal: false,
        pickupLocation: "",
        dropLocation: "",
        count: 0
    };
  }
  async componentDidMount() {
    this.getLocation();
  }
  onSubmit = async() => {
    if(this.state.pickupLocation == "" || this.state.pickupLocation == null){
        Toast.show({
            type: 'info',
            text1: 'Pickup location cannot be empty'
        });
    }
    else if(this.state.dropLocation == "" || this.state.dropLocation == null){
      Toast.show({
          type: 'info',
          text1: 'Drop location cannot be empty'
      });
    }
    else{
        this.setState({
            loaderModal: true
        })
        this.uploadData()
    }
    
  }
  uploadData = async(photoURL) => {
    const today = moment();
    let  { pickupLocation, dropLocation } = this.state;
    try {
        if(this.state.count === 0){
            const createUser = await addDoc(collection(db, "rides"), {
              date: today.format('Do MMMM, YYYY'),
              pickupLocation: pickupLocation,
              dropLocation: dropLocation,
              created_by: "Rahul DasGupta",
              isRideAccepted: false
            });
            this.setState({count: 1})
            Toast.show({
              type: 'success',
              text1: 'Event Created'
            });
            setTimeout(() => {
              this.props.navigation.goBack(null)
            },400)
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
  }
  getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if(status != 'granted') {}
    else{
        const location = await Location.getCurrentPositionAsync({});
        const { coords } = location;
        const address = await Location.reverseGeocodeAsync({
            latitude: coords.latitude,
            longitude: coords.longitude,
        });
        if (address.length > 0) {
            const { formattedAddress } = address[0];
            this.setState({
              pickupLocation: formattedAddress
            });
        }
    }

  }
  requestLocation = async() => {
    Linking.openSettings();
    await this.getLocation();
  }
  renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === this.state.value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', paddingLeft: "5.5%", paddingRight:"5.5%"}}>
        <StatusBar backgroundColor={"#000"} style="light" />
        <Modal isVisible={this.state.loaderModal} style={{justifyContent:"center", alignSelf:"center"}}  useNativeDriver={true}>
            <StatusBar backgroundColor={"#000000"} style="light" />
            <View style={{backgroundColor: 'transparent', justifyContent:"center", alignItems:"center", alignSelf:"center"}}>
                <Image
                    style={{
                        height: 200,
                        resizeMode:"contain"
                    }}
                    source={require("../assets/loader.gif")}
                />
            </View>
        </Modal>
        <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 62, paddingTop:"7%",}}>
              <Text style={{ color: "#222", fontSize: 24 }}>
                Book Ride
              </Text>
              <Text style={{ color: "#222", marginTop: 6, fontSize: 14, marginBottom: 20 }}>
                Please make sure all the required fields are properly filled.
              </Text>
            <Text style={{ color: "#222", marginTop: 20, fontSize: 15, marginLeft: 2 }}>
              Pickup Location
            </Text>
            <View style={{width:"100%", height: 45, marginTop: 8, borderWidth: 2, borderColor:"#E3E3E3", backgroundColor: "#fff", borderRadius: 7, justifyContent:"center", alignSelf:"center", paddingLeft: 13, paddingRight: 13 }}>
                <TextInput
                    style={{
                        width:"100%",
                        color: "#222",
                        fontSize: 16, 
                    }}
                    value={this.state.pickupLocation}
                    placeholder={"Enter Event Name"}
                    placeholderTextColor={"#9E9E9E"}
                    onChangeText={(text) =>  this.setState({pickupLocation: text})}
                    returnKeyType="next"
                />
            </View>
            <Text style={{ color: "#222", marginTop: 20, fontSize: 15, marginLeft: 2 }}>
              Drop Location
            </Text>
            <View style={{width:"100%", height: 50, marginTop: 8, flexDirection:"row", backgroundColor: "#fff", borderRadius: 7, alignSelf:"center", paddingLeft: 13, paddingRight: 13, borderWidth: 2, borderColor:"#E3E3E3", }}>
              <TextInput
                  style={{
                      width:"100%",
                      color: "#222",
                      fontSize: 16, 
                  }}
                  value={this.state.dropLocation}
                  placeholder={"Enter Pickup"}
                  placeholderTextColor={"#9E9E9E"}
                  onChangeText={(text) =>  this.setState({dropLocation: text})}
                  returnKeyType="next"
              />
            </View>
            <TouchableOpacity onPress={this.onSubmit} style={{borderRadius: 8, marginTop:"9%", marginBottom: "20%", height: 48, backgroundColor: "#f4c430", width: "100%", justifyContent:"center", alignItems:"center"}}>
                <Text style={{color: "#fff", fontSize: 18, marginTop: -1.5,}}>
                  Save
                </Text>
            </TouchableOpacity>
            <Toast position="bottom" visibilityTime={2000} config={toastConfig}/>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  dropdown: {
    height: 45,
    backgroundColor: 'white',
    borderRadius: 7,
    padding: 12,
    paddingLeft: 13
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 15,
  },
  placeholderStyle: {
    fontSize: 15,
  },
  selectedTextStyle: {
    fontSize: 15,
    
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
  },
});