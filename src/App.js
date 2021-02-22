import logo from './logo.svg';
import './App.css';
//import './../public/data.json'
import {useEffect} from 'react';
import React, { useState } from 'react';



function App(props) {
  const [data,setData]=useState([]);
  const [cardName, setCardName] = useState();
  const [color, setcolor] = useState();
  const [index, setIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);

  
 
  const getData=()=>{
    fetch('data.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
       // console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        //console.log(myJson);
        setData(myJson)
        
        
      });
  }
  useEffect(()=>{
    getData()
    if(data.length!=0){
      setCardName(data[index].name)
      setcolor(data[index].color)
    } else {
      setCardName("loading...")
    }
    
     
  },[data.length, index])
   

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  });
  const handleUserKeyPress = (event) => {
    const { key, keyCode } = event;
    
    
    if (keyCode === 37 ) {
      
      if(index>0){
       setPreviousIndex(index);
        setIndex(index-1);
      }
    }
    if (keyCode === 39 ) {
      
      if(index<data.length-1){
       setPreviousIndex(index);
      setIndex(index+1);
      }
    }
  };
  
  const leftClick=()=>{
    if(index>0){
       
      setIndex(index-1);
    }
  }
  const rightClick=()=>{
    if(index<data.length-1){
       
      setIndex(index+1);
      }
  }
  const reset=()=>{
    setIndex(previousIndex);
  } 
  return (
    <div className="App">
     <div className="App-header">
       <div className="container">
     <h3>Discover</h3>
     <div className="card" style={{backgroundColor: color}}>
     
     
     </div>
     <div  className="caption"><b>{cardName}</b></div>
     <div className="design"></div>
     <div className="design1"></div>
     <img onClick={reset} style ={{width: "20px", height: "20px", marginBottom:"20px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrhO9osCvlejd9o0ksKltMb3zjJHTVNhC8VQ&usqp=CAU"></img>
       </div>
       <div className="flex-container">
         <img onClick={leftClick} style ={{width: "20px", height: "20px",marginTop:"10px"}} src="https://www.pngfind.com/pngs/m/316-3161853_left-arrow-png-back-icon-app-png-transparent.png"></img>
        <span style={{marginTop:"8px"}}><b>{index +1}/3</b> </span>
         <img onClick={rightClick} style ={{width: "20px", height: "20px",marginTop:"10px"}} src="https://www.clipartmax.com/png/middle/183-1831886_scroll-arrow-to-right-comments-free-next-arrow-icon.png"></img>
         
       </div>
     </div>
  
    
   
      
    </div>
  );
}

export default App;
