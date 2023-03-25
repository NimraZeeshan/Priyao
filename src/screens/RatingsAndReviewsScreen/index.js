import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import {
  AuthHeader,
  AuthContainer,
  PrimaryInput,
  PrimaryButton,
  Loading,
} from '../../components';

// import React from 'react';
import React, {useEffect, useState, useRef} from 'react';
import navigationService from '../../config/navigationService';
import {Metrix, NavigationService, Images, Colors} from '../../config';
import {Card} from 'react-native-shadow-cards';

export const RatingsAndReviewsScreen = () => {
  const counter = useRef(new Animated.Value(0)).current;
  const countInterval = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    countInterval.current = setInterval(() => setCount(old => old + 5), 1000);
    return () => {
      clearInterval(countInterval);
    };
  }, []);

  useEffect(() => {
    load(count);
    if (count >= 100) {
      setCount(100);
      clearInterval(countInterval);
    }
  }, [count]);

  const load = count => {
    Animated.timing(counter, {
      toValue: count,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const widthlength = counter.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <>
      <View
        style={{
          height: 120,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          backgroundColor: Colors.HeaderColour,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 29, fontWeight: 'bold', marginLeft: 20}}>
          Ratings & Reviews
        </Text>
        <Image
          source={Images.Menu}
          style={{
            //   borderColor: 'black',
            //   borderWidth: 1,
            height: 49,
            width: 49,

            marginTop: 5,
            position: 'absolute',
            alignSelf: 'flex-start',
            padding: 10,
            marginLeft: 10,
          }}
        />
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            //   borderColor: 'black',
            //   borderWidth: 1,
            marginTop: 10,
            width: '95%',
            alignSelf: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20}}>Rating</Text>
          <Text style={{color: Colors.HeaderColour, fontSize: 34}}>Normal</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            //   borderColor: 'black',
            //   borderWidth: 1,
          }}>
          <View style={styles.container}>
            <View style={styles.progressBar}>
              <Animated.View
                style={
                  ([StyleSheet.absoluteFill],
                  {backgroundColor: '#8BED4F', width: '50%'})
                }></Animated.View>
            </View>
            <Text>Reviews: Medium</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.progressBar}>
              <Animated.View
                style={
                  ([StyleSheet.absoluteFill],
                  {backgroundColor: '#F72C00', width: '35%'})
                }></Animated.View>
            </View>
            <Text>Experience: novice</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            //   borderColor: 'black',
            //   borderWidth: 1,
          }}>
          <View style={styles.container}>
            <View style={styles.progressBar}>
              <Animated.View
                style={
                  ([StyleSheet.absoluteFill],
                  {backgroundColor: '#8BED4F', width: '100%'})
                }></Animated.View>
            </View>
            <Text>Reputation: Excellent</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.progressBar}>
              <Animated.View
                style={
                  ([StyleSheet.absoluteFill],
                  {backgroundColor: '#F72C00', width: '50%'})
                }></Animated.View>
            </View>
            <Text>Frequency of operation: Low</Text>
          </View>
        </View>
        <Card style={{alignSelf: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 10,
                alignItems: 'center',
              }}>
              <Text style={{color: '#707070', fontSize: 29}}>0</Text>
              <Text style={{color: '#97ADB6'}}>rides</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 10,
                alignItems: 'center',
              }}>
              <Text style={{color: '#707070', fontSize: 29}}>0</Text>
              <Text style={{color: '#97ADB6'}}>rides</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 10,
                alignItems: 'center',
              }}>
              <Text style={{color: '#707070', fontSize: 29}}>0</Text>
              <Text style={{color: '#97ADB6'}}>rides</Text>
            </View>
          </View>
        </Card>
        <View
          style={{
            flex: 1,
            // borderColor: 'black',
            // borderWidth: 1,
            margin: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 140,
          }}>
          <Text style={{fontSize: 20, textAlign: 'center'}} numberOfLines={4}>
            At the moment you didn't receive any reviews
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     width: '100%',
  //     padding: 16,
  //     // paddingTop: 100,
  //   },
  listItem: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#333',
    padding: 25,
  },
  PrimaryButton: {
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: '#ecf0f1',
    padding: 8,
  },
  progressBar: {
    marginTop: 10,
    height: 14,
    flexDirection: 'row',
    // width: '50%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 0.8,
    // borderRadius: 10,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
});
