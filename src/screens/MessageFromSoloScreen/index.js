// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   SafeAreaView,
//   Image,
//   FlatList,
// } from 'react-native';
// import {
//   AuthHeader,
//   AuthContainer,
//   PrimaryInput,
//   PrimaryButton,
//   Loading,
// } from '../../components';

// import React, { useCallback, useState, useLayoutEffect } from 'react';
// import navigationService from '../../config/navigationService';
// import {Metrix, NavigationService, Images, Colors} from '../../config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import database from '@react-native-firebase/database';
// // import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
// import SwipeButton from 'rn-swipe-button';
// import {Header, ListItem, Avatar} from 'react-native-elements';
// import {Center} from 'native-base';
// import {TextInput} from 'react-native-gesture-handler';
// import { useEffect } from 'react';



// export const MessageFromSoloScreen = () => {

//   const [message, setMessage] = useState('');
//   const [messageTwo, setMessageTwo] = useState('');
//   const [watch, setWatch] = useState('');
//   const [fwatch, setfWatch] = useState('');


//     ////
//     const driverMessageFiuser = async () => {

//       let id = await AsyncStorage.getItem('resId');
//       database().ref(`DriverLatLng&ID-${id}`).push({ 

//         messages: message,
//         mess: messageTwo,
        
//       })
//       .then((data)=>{
//           //success callback
//           //console.log('data ' , data)
//       }).catch((error)=>{
//           //error callback
//           console.log('driver message pushing Error>>>>. ', error)
//   });
  
//   //  await database().ref(`DriverLatLng&ID-${id}`).remove()
  
//   //   .then((clear)=>{
//   //     //  console.log('clear driver LatLong>>>>>>>>>>>>>>>', clear)
//   //   })
//   //   .catch((ErrorFromClear)=>{
//   //     console.log('ErrorrrrrrFromClear>>>>>>>>>>', ErrorFromClear);
//   //   });
    
//   };

//   let clearMsg = () => {
//     setMessage('')
//   }
  

//   /////
// //   const driverMessageTwoFirebase = async () => {

// //     let id = await AsyncStorage.getItem('resId');
// //     database().ref(`DriverLatLng&ID-${id}`).push({ 

// //       messagesTwo: message,
      
// //     })
// //     .then((data)=>{
// //         //success callback
// //         //console.log('data ' , data)
// //     }).catch((error)=>{
// //         //error callback
// //         console.log('driver message pushing Error>>>>. ', error)
// // });

// //  await database().ref(`DriverLatLng&ID-${id}`).remove()

// //   .then((clear)=>{
// //     //  console.log('clear driver LatLong>>>>>>>>>>>>>>>', clear)
// //   })
// //   .catch((ErrorFromClear)=>{
// //     console.log('ErrorrrrrrFromClear>>>>>>>>>>', ErrorFromClear);
// //   });
  
// // };

//   let fetchingDriver = async () => {

//       var driverID = await AsyncStorage.getItem('resId');
//         // console.log('Driver ID>>>>>>>>>', driverID);
    
//         if (driverID != '') {
//         //const reference = database().ref(`/userLatLong&ID-${userid}`);
//          database().ref(`DriverLatLng&ID-${driverID}`).once(`value`, function (snapshot) {
//                let arr = snapshot.val();
//                let arr2 = Object.values(arr);
//                arr2.forEach(element => {
//                 // console.log('elementtttttttttttttt>>>>>>>', element);
//                 setWatch(element.messages);
//                 setfWatch(element.mess);
//                });

//         })
//           // .then(snapshot => {
//           //   var arr = snapshot.val();
//           //   var arr2 = Object.values(arr);
//           //   console.log(...arr2) 
//           // });
//       } else {
//         // Alert.alert(`failed to fetch DATA> ${driverID}`);
//         // console.log(`failed to fetch DATA>><<><><><>< ${driverID}`);
//       };

//   };

  

//   // useEffect(()=>{
//   //    fetchingDriver();
//   // },[])
  


//   return (
//     <>

//       <View
//         style={{
//           // borderColor: 'black',
//           // borderWidth: 1,
//           height: 79,
//           backgroundColor: Colors.HeaderColour,
//           // justifyContent: 'space-between',
//           flexDirection: 'row',
//           alignItems: 'center',
//           width: '100%',
//           marginTop: 0,
//         }}>
//         <TouchableOpacity>
//           <Image
//             source={Images.BackArrow}
//             style={{
//               height: 49,
//               width: 49,
//               // marginTop: 15,
//             }}></Image>
//         </TouchableOpacity>
//         <Text style={{marginLeft: 70, fontSize: 24, fontWeight: 'bold', letterSpacing: 1}}>Asim Azhar</Text>
//       </View>
//       <View>
//         <Image
//           source={Images.MassageBackground}
//           style={{
//             //   borderColor: 'black',
//             //   borderWidth: 1,
//             height: 842,
//             width: 782,
//             // marginLeft: 5,

//             position: 'absolute',
//             padding: 10,
//             // marginLeft: 20,
//             // borderRadius: 20,
//           }}
//         />
//       </View>
//       <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//         <TextInput
//            placeholder="Type A Message"
//            defaultValue={message}
//            onChangeText={e => {
//              setMessage(e);
//            }}
//           style={{
//             borderColor: 'black',
//             borderWidth: 1,
//             height: 50,
//             width: 297,
//             paddingLeft: 20,
//             marginLeft: 8,
//             marginTop: 500,
//             backgroundColor: 'white',
//             borderRadius: 10,
//           }}></TextInput>

//       <TouchableOpacity
//             onPress={() => {
//             driverMessageFiuser();
//             clearMsg();
//             fetchingDriver();

//             //navigationService.navigate('');//DriverRideStart
//           }}>
//         <Image
//           source={Images.SendBtn}
//           style={{height: 52, width: 50, marginTop: 500,  marginRight: 3,}}>
//         </Image>
//       </TouchableOpacity>
//       </View>

//       <View style={{ marginTop: -480, marginHorizontal: 10, }}>
//         {watch ? <Text style={{fontSize: 20}}> {watch} </Text> : null }
//         {fwatch ? <Text style={{fontSize: 25}}> {fwatch} </Text> : null }
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     padding: 16,
//     // paddingTop: 100,
//   },
//   listItem: {
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: '#333',
//     padding: 25,
//   },
//   PrimaryButton: {
//     marginTop: 30,
//     width: '60%',
//   },
//   PrimaryButton2: {
//     marginTop: 30,
//     width: '15%',
//     left: 20,
//   },
//   PrimaryButton3: {
//     width: '60%',
//     marginLeft: 70,
//   },
// });





import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-elements';
import database from '@react-native-firebase/database';
// import { auth, db } from '../firebase';
// import { signOut } from 'firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';

import {
  PrimaryButton,

} from '../../components';



export const MessageFromSoloScreen = ({ navigation }) => {

    const [messages, setMessages] = useState([]);
    const [watchMsgOne, setWatchMsgOne] = useState('');
    const [watchMsgTwo, setWatchMsgTwo] = useState('');
    const [watchMsgThree, setWatchMsgThree] = useState('');
    const [watchMsgFour, setWatchMsgFour] = useState('');
    const [watchMsgFive, setWatchMsgFive] = useState('');


    // const signOutNow = () => {
    //     signOut(auth).then(() => {
    //         // Sign-out successful.
    //         navigation.replace('Login');
    //     }).catch((error) => {
    //         // An error happened.
    //     });
    // }
    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerLeft: () => (
    //             <View style={{ marginLeft: 20 }}>
    //                 <Avatar
    //                     rounded
    //                     source={{
    //                         // uri: auth?.currentUser?.photoURL,
    //                     }}
    //                 />
    //             </View>
    //         ),
    //         headerRight: () => (
    //             <TouchableOpacity style={{
    //                 marginRight: 10
    //             }}
    //                 onPress={signOutNow}
    //             >
    //                 <Text>logout</Text>
    //             </TouchableOpacity>
    //         )
    //     })
    // }, [navigation]);

  
  
    const onSend = useCallback((messages) => {
        setMessages(previousMessages => GiftedChat.prepend(previousMessages, messages))
    }, []);


  //   useEffect(() => {
  //     setMessages(messages.text)
  // }, []);


    //////
    const UserMessageToDriverFirebase = async () => {

      let userID = await AsyncStorage.getItem('UserId');
     await database().ref(`UserMsg-${userID}`).set({

      UserMessages: messages,
        
     })
      .then((data)=>{
          //success callback
          //console.log('data ' , data)
      }).catch((error)=>{
          //error callback
          console.log('user message pushing Error>>>>. ', error)
  });
  
  //  await database().ref(`DriverLatLng&ID-${id}`).remove()
  
  //   .then((clear)=>{
  //     //  console.log('clear driver LatLong>>>>>>>>>>>>>>>', clear)
  //   })
  //   .catch((ErrorFromClear)=>{
  //     console.log('ErrorrrrrrFromClear>>>>>>>>>>', ErrorFromClear);
  //   });
    
};

    
          let fetchingDriverMsg = async () => {

            let driverID = await AsyncStorage.getItem('resId');
          // console.log('Driver ID>>>>>>>>>', driverID);

          if (driverID != '') {
          //const reference = database().ref(`/userLatLong&ID-${userid}`);
            database().ref(`DriverMsg-${driverID}`).on(`value`, function (snapshot) {

            var arr = snapshot.val();
          //  var arr2 = '' 
            console.log('elementtttttttttttttt arr >>>>>>>', arr);

          if (arr!=null) {
            var arr2 = Object.values(arr);

            let  text = arr2[0][0].text;
            //let  texttwo = arr2[0][1].text;
            // let  texttwo = arr2[0][1].text;
            // let  textthree = arr2[0][2].text;
            // let  textfour = arr2[0][3].text;
      
             //console.log('result text>>>>>>>>>, ', text)
            //  console.log('result text>>>>>>>>>, ', texttwo)
            //  console.log('result text>>>>>>>>>, ', textthree)
            // console.log('result text>>>>>>>>>, ', textfour)
              //console.log('>>>>>>>>>>>>>DriverMessages arr2[0]', arr2[0].driverMessages[0].text)
              
              // console.log('>>>>>>>>>>>>>DriverMessages[1]', arr2[0].driverMessages)
              // console.log('>>>>>>>>>>>>>DriverMessages[2]', arr2[2].DriverMessages[2].text)
          // console.log('>>>>>>>>>>>>>DriverMessages[3]', arr2[3].DriverMessages[3].text)
          // console.log('>>>>>>>>>>>>>DriverMessages[4]', arr2[2].DriverMessages[4].text)
          // let  text = arr2[0].driverMessages[0].text;
        //  let result = text.match(text)
          // console.log('result>>>>>>>>>, ', text)

          // let  textTwo = arr2[1].driverMessages[0].text;
        //  let resultTwo = text.match(textTwo)
          // console.log('result>>>>>>>>>, ', textTwo)

          // if (text.length!=textTwo.length) {
          //   arr2[0] === undefined ? setWatchMsgOne('') : undefined
          //   arr2[0] != undefined ? setWatchMsgOne(text) : undefined
          //   console.log('resultTwo>>>>>>>>>, ', text)
          // }

          // if (text.length!=textTwo.length) {
          //   arr2[1] === undefined ? setWatchMsgTwo('') : undefined
          //   arr2[1] != undefined ? setWatchMsgTwo(textTwo) : undefined
          //   console.log('resultTwo>>>>>>>>>, ', textTwo)
          // }
         

         // console.log('arr2>>>>>>>>>, ', arr2[1].driverMessages[0].text)


        arr2[0] === undefined ? setWatchMsgOne('') : undefined
        arr2[0] != undefined ? setWatchMsgOne(text) : undefined

        // arr2[0] === undefined ? setWatchMsgTwo('') : undefined
        // arr2[0] != undefined ? setWatchMsgTwo(texttwo) : undefined

        // arr2[0] === undefined ? setWatchMsgThree('') : undefined
        // arr2[0] != undefined ? setWatchMsgThree(textthree) : undefined

        // arr2[3] === undefined ? setWatchMsgFour('') : undefined
        // arr2[3] != undefined ? setWatchMsgFour(arr2[3].DriverMessages[3].text) : undefined

        // arr2[4] === undefined ? setWatchMsgFive('') : undefined
        // arr2[4] != undefined ? setWatchMsgFive(arr2[2].DriverMessages[4].text) : undefined
        
         }
         else {
          console.log('msg not found')
         }
  })
   
} else {
  // Alert.alert(`failed to fetch DATA> ${driverID}`);
  // console.log(`failed to fetch DATA>><<><><><>< ${driverID}`);
};

};

useEffect(()=>{
  fetchingDriverMsg();
},[])
 

    return (
      <>
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            alwaysShowSend={true}
            onPress={ UserMessageToDriverFirebase() }
           // isTyping={true}
            // user={{
            //     _id: auth?.currentUser?.email,
            //     name: auth?.currentUser?.displayName,
            //     avatar: auth?.currentUser?.photoURL
            // }}
        /> 

        <View>
          {watchMsgOne? <Text style={{
            //color: 'green',
            margin: 10,
            marginTop: -600,
            alignSelf: 'flex-start'}}>
          {watchMsgOne} </Text> : null }
        </View>

        <View>
          {watchMsgTwo? <Text style={{
           // color: 'green',
            margin: 10,
            marginTop: -560,
            alignSelf: 'flex-start'}}>
          {watchMsgTwo} </Text> : null }
        </View>

        <View>
          {watchMsgThree? <Text style={{
            color: 'green',
            margin: 10,
            marginTop: -520,
            alignSelf: 'flex-start'}}>
          {watchMsgThree} </Text> : null }
        </View>

        <View>
          {watchMsgFour? <Text style={{
            color: 'green',
            margin: 10,
            marginTop: -480,
            alignSelf: 'flex-start'}}>
          {watchMsgFour} </Text> : null }
        </View>

        <View>
          {watchMsgFive? <Text style={{
            color: 'green',
            margin: 10,
            marginTop: -440,
            alignSelf: 'flex-start'}}>
          {watchMsgFive} </Text> : null }
        </View>

      </>         
    );
}