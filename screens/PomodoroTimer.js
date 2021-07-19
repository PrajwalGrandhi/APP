import React from 'react'
import {View,Text,StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import { Header, } from 'react-native-elements'
import { SafeAreaView, SafeAreaProvider, SafeAreaInsetsContext, useSafeAreaInsets, initialWindowMetrics} from "react-native-safe-area-context";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {Vibration} from 'react-native'

var time1=null;

export default class PomodoroTimer extends React.Component{
  constructor(){
    super();
    this.state={
workTime:25,
breakTime:5,
interval : "Working",
running: false,
time: time1*60,

    }
    console.log(this.state.interval)
  }

  handleTimerCompleted = () => {
    if(this.state.interval === "Working")
    {
      this.setState({
        interval: "Break",
        time:this.state.breakTime*60,

      })
      console.log(this.state.time)
    }
    else if (this.state.interval==="Break"){
      this.setState({
        interval:"Working",
        time:this.state.workTime*60
      })
    }

    
if(this.state.time===0){
  this.handlePlay()
}
  }

  handleTime = (a) => {
    // (this.state.interval == "Working")?
    // (
    //   //time1=this.state.workTime
    // ):
    // (
    //  // time1=this.state.breakTime
    // )
    console.log(a)
    time1=a

    // this.setState({
    //   time:time1*60
    // })
  }
  
  
  componentDidMount(){
    this.setState({ running: false, time: time1 * 60 });
      if(this.state.running === true && this.state.time == 0)
      {
        this.handlePlay()
      }
  }
  
  componentDidUpdate() {
    if(this.state.running === true && this.state.time == 0)
    {
      clearInterval(this.timerId)
      Vibration.vibrate([500, 500, 500])
      this.handleTimerCompleted()
  
    }
    else if(this.state.running === false)
    {
      clearInterval(this.timerId)
    }
  }
  
  
  handlePlay = () => {
    this.setState({
      interval:"Working",
      running: true
    })
    this.timerId = setInterval(() =>{
      this.setState({
        time: this.state.time - 1
      })
    }, 1000)

  }
  
  handlePause = () => {
    clearInterval(this.timerId)
    this.setState({
      running: false
    })
  }
  
  handleReset = () => {	
    clearInterval(this.timerId)
    this.setState({
      running: false,
      time: time1 * 60
    })
  }

  render(){
    //this.handleTime()
    if(this.state.interval=="Working"){
      this.handleTime(this.state.workTime)
    }
    else if (this.state.interval=="Break"){
      this.handleTime(this.state.breakTime)
    }
    
    return (
      <View style={styles.container}>
<SafeAreaProvider>
  <Header
     backgroundColor={['red']}
     centerComponent={{ text: 'Pomodoro Timer', style: { color: '#fff',fontSize:20 } }}
  />

<TextInput
           style={styles.inputBox}
           placeholder={"WorkTime: "}
           keyboardType={'numeric'}
           defaultValue={this.state.workTime}
          //  onChangeText={ this.handleWorkTime()}
          onChangeText={
            (text)=>{
              if(text>0){
                this.setState({workTime:text})
              }
              else{
                
                alert("Time invalid(Worktime). Setting value to default. Please enter valid time")
                this.setState({
                  workTime: 25
                })
              }
            }
          }
           />

<TextInput
           style={styles.inputBox}
           placeholder={"BreakTime: "}
           keyboardType={'numeric'}
           defaultValue={this.state.breakTime}
           //onChangeText={this.handleBreakTime()}
           onChangeText={
            (text)=>{
              if(text>0){
                this.setState({breakTime:text})
              }
              else{
                
                alert("Time invalid(breaktime). Setting value to default. Please enter valid time")
                this.setState({
                  breakTime: 25
                })
              }
            }
          }
           />
    
    <View style={styles.container}>
				<Text style={styles.textStyle}> 
					{Math.floor(this.state.time/60).toString().padStart(2,"0") + ":" + 
					(this.state.time % 60).toString().padStart(2,"0")}
				</Text>
			</View>

      {
        (this.state.running === true)?(
          <View style={styles.container}>
            <TouchableOpacity style={styles.buttonStyle} onPress={this.handlePause}>
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress={this.handleReset}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        ):(
          <View  style={styles.container}>
        <TouchableOpacity style={styles.buttonStyle} onPress={this.handlePlay}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
      </View>
        )
      }
</SafeAreaProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282626',
    justifyContent: 'center',
  },
  inputBox:{
    marginTop:RFValue(10),
    width:RFValue(200),
    height:RFValue(20),
    color:'white',
    alignSelf:'center',
    fontSize:20,
    
  },
  textStyle: {
		color: "white",
	    fontSize: 50,
	    fontWeight: "400",
	},
  buttonStyle:{
		alignItems: "center",
		backgroundColor: "#C2362B",
	    padding: 30,
	    flexDirection: "row" ,
	    borderRadius: 80,
	}, 
	 buttonText: {
	    color: "white",
	    fontSize: 25,
	    fontWeight: "300",
  	}
});
