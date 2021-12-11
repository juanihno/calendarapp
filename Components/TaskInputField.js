import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'


const TaskInputField = (props) => {
  const [task, setTask] = useState()
  const [validInput, setValidInput] = useState(false)
  const onTextChange = (text) => {
    setTask(text)
    if (text.length >= 3) {
      setValidInput(true)
    }
    else {
      setValidInput(false)
    }
  }


  const handleAddTask = (value) => {
    props.addTask(value)
    setTask('')
    setValidInput(false)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TextInput
        style={styles.inputField}
        value={task}
        onChangeText={(text) => onTextChange(text)}
        placeholder={'Write a task (minimun 3 characters)'}
        placeholderTextColor={'#fff'}
      />
      <TouchableOpacity
        style={(validInput) ? styles.button : styles.buttonDisabled}
        disabled={(validInput) ? false : true}
        onPress={() => handleAddTask(task)}>
        <View>
          <MaterialIcons name="add" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default TaskInputField

const styles = StyleSheet.create({
  container: {
    borderColor: '#fff',
    backgroundColor: '#3E3364',
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    position: 'relative',
    bottom: 20,
  },
  inputField: {
    color: '#fff',
    height: 50,
    flex: 1,

  },
  button: {
    height: 30,
    width: 30,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    height: 30,
    width: 30,
    borderRadius: 5,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
})