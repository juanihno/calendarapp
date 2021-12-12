import React, { useEffect, useState } from 'react'
import { Keyboard, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';
import TaskInputField from './TaskInputField';


// firebase


import {
  initializeFirestore,
  getFirestore,
  setDoc,
  doc,
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
  Firestore, firestore
} from 'firebase/firestore'



//import Typography from '../components/Typography';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};



export function Home(props) {







  const navigation = useNavigation()
  const [tasks, setTasks] = useState([]);
  //const [id, setId] = useState([]);
  //const [taskName, setTaskName] = useState([]);


  const [dateString, setDateString] = useState();
  
  //const [items, setItems] = useState({});
  //setItems(props.listItems)

  const items = {

    '2021-05-21': [{ name: 'Meetin Juan' }, { name: 'any js object' }],

    '2021-05-22': [{ name: 'Ana Bday', height: 80 }, { name: 'Soccer match' }],
    '2021-05-23': [{ name: 'Dani bday' }],
    '2021-05-24': [{ name: 'Go for a run' }, { name: 'Cheescake' }, { name: 'Hala Madrid' }],

  };

  //const items= props.itemList;


  useEffect(() => {
    if (!props.auth) {
      navigation.reset({ index: 0, routes: [{ name: 'Signup' }] })
    }
  }, [props.auth])




  const addTask = (task) => {
    //setTaskName=task
    if (task == null || dateString == null) return;


    //setTask=task
    const id = new Date().getTime().toString()

    //task = { id: id, name: task, dateString: dateString, status: false }
    const data = { id: id, name: task, dateString: dateString, status: false }

    { props.add('userTasks', data) }
    //console.log("userTasks",props.itemList)
    console.log("los items son", items);
    //console.console.log("el item individual es", item.name);






    setTasks([...tasks, task]);
    //console.log(tasks)
    //console.log(tasks)
    //console.log(item)




    Keyboard.dismiss();

  }

  /*const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };*/

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}
        onPress={() => { navigation.navigate("#") }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item.name}</Text>
              <TouchableOpacity onPress={() => navigation.navigate("#")}><Avatar.Text label="x" /></TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        onDayPress={(day) => { setDateString(day.dateString); console.log(day.dateString) }}
        // Initially selected day
        selected={'2021-05-21'}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={'2021-05-10'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2022-05-30'}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={10}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={10}

        items={items}
        //loadItemsForMonth={loadItems}
        renderItem={renderItem}
      />
      <TaskInputField addTask={addTask} />
    </View>

  );


}
