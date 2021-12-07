import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// components
import  Signup  from './Components/Signup';
import  Signin  from './Components/Signin';
import  { Home }  from './Components/Home';
import  { Signout }  from './Components/Signout';
import  AddTask  from './Components/AddTask';
import  EditTask  from './Components/EditTask';




import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// firebase
import { firebaseConfig } from './Config';
import {initializeApp,} from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"

import { 
  initializeFirestore, 
  getFirestore, 
  setDoc, 
  doc, 
  addDoc, 
  collection,
  query, 
  where, 
  onSnapshot 
} from 'firebase/firestore'




const FBapp = initializeApp( firebaseConfig)
const FSdb = initializeFirestore(FBapp, {useFetchStreams: false})

const Stack = createStackNavigator();
const FBauth= getAuth()




function App(props) {
  const[ auth, setAuth ] = useState()


  const[ user, setUser ] = useState()
  //errors
  const [signupError, setSignupError ] = useState()
  const [signinError, setSigninError ] = useState()
  const [ data, setData ] = useState()
  const[ userId, setUserId ] = useState()
  const[ itemList, setItemList ] = useState()

  


  useEffect(() => {
    onAuthStateChanged( FBauth, (user) => {
      if( user ) { 
        setAuth(true) 
        setUser(user)
        // console.log( 'authed')
      if( !data ) { getData() }
          }
      else {
        setAuth(false)
        setUser(null)
      }
    })
  })

  // useEffect( () => {
  //   if( !data && user ) {
  //     getData()
  //   }
  // }, [data,auth, user])

  const SignupHandler = ( email, password, username ) => {
    setSignupError(null)
    createUserWithEmailAndPassword( FBauth, email, password )
    .then( ( userCredential ) => { 
      createUser('users', {id: userCredential.user.uid, email:userCredential.user.email, displayName:username})
      //createTask('users', {id: task.id, name:task.name, dateString:task.dateString, status: false})
      setUser(userCredential)
      setUserId(userCredential.uid)
      setAuth( true )
    } )
    .catch( (error) => { setSignupError(error.code) })
  }
  
  
  
  const SigninHandler = ( email, password ) => {
    signInWithEmailAndPassword( FBauth, email, password )
    .then( (userCredential) => {
      setUser(userCredential.user)
      setAuth(true)
      console.log( userCredential.user.uid)
    })
    .catch( (error) => { 
      const message = (error.code.includes('/') ) ? error.code.split('/')[1].replace(/-/g, ' ') : error.code
      setSigninError(message) 
    })
  }
  const SignoutHandler = () => {
    signOut( FBauth ).then( () => {
      setAuth( false )
      setUser( null )
    })
    .catch( (error) => console.log(error.code) )
  }
  const createUser = async ( collection , data ) => {
    //adding data to a collection with automatic id
    //const ref = await addDoc( collection(FSdb, FScollection ), data )
    const ref = await setDoc( 
      doc(FSdb, collection, data.id) , data)
      console.log("User has added")

      .catch((err) => {
        console.log(err)
    })
      
  }

  const createTask = async ( collection , data ) => {
    //adding data to a collection with automatic id
    //const ref = await addDoc( collection(FSdb, FScollection ), data )
    const ref = await setDoc( doc( FSdb, `usertasks/${user.uid}/documents/${ new Date().getTime() } }`), data )
    //console.log( ref.id )
  }
  /*const createTask = async (collection , data) => {
    await setDoc(
      doc(firestore, collection, data.id, 'tasks', 'task'), data)
  } */
  const getData = () => {
     //console.log("que es ",user.uid)
    const FSquery = query( collection( FSdb, `usertasks/${user.uid}/documents`) )
    const unsubscribe = onSnapshot( FSquery, ( querySnapshot ) => {
      let FSdata = []
      querySnapshot.forEach( (doc) => {
        console.log("probando id", doc.id)
        console.log("probando name", doc.name)

        let item = {}
        item = doc.data()
        item.id = doc.id
        FSdata.push( item )
      })
      setData( FSdata )
      console.log(FSdata)
      transform()
    })
  }
   transform =() => {
    console.log("porfavor",(data))
let item ={}
const itemList = []
data.forEach(element => {
  item={
    [element.dateString]:{
      id : element.id,
      name : element.name,
      status : element.status

    }
  }
  itemList.push(item)
});
console.log(itemList)
setItemList(itemList)

  }


  return (
    <Stack.Navigator >
      <Stack.Screen name="Signup" options={{title: 'Sign up'}}>
          { (props) => 
          <Signup {...props} 
          handler={SignupHandler} 
          auth={auth} 
          error={signupError} 
          /> }
        </Stack.Screen>
        <Stack.Screen 
          name="Signin" 
          options={{
            title:'Sign in'
          }}
        >
          { (props) => 
          <Signin {...props} 
          auth={auth} 
          error={signinError} 
          handler={SigninHandler} 
          /> }
        </Stack.Screen>
        <Stack.Screen name="Home" options={{
          headerTitle: "Home",
          headerRight: (props) => <Signout {...props} handler={SignoutHandler} />
        }}>
          { (props) => 
          <Home {...props} auth={auth} add={createTask} user={user} itemList={itemList} /> }
        </Stack.Screen>

        <Stack.Screen name="AddTask" options={{
          headerTitle: "AddTask",
          headerRight: (props) => <Signout {...props} handler={SignoutHandler} />
        }}>
          { (props) => 
          <AddTask {...props} auth={auth} /> }
        </Stack.Screen>
        <Stack.Screen name="EditTask" options={{
          headerTitle: "EditTask",
          headerRight: (props) => <Signout {...props} handler={SignoutHandler} />
        }}>
          { (props) => 
          <EditTask {...props} auth={auth} /> }
        </Stack.Screen>
        
    </Stack.Navigator>
  );
}



export default (props) => {
  return (
    <NavigationContainer>
     
        <App {...props} />
      
    </NavigationContainer>
  )
}