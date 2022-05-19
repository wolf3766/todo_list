import axios from "axios"
import {useEffect, useState} from "react"
import '../styles/task.css'

function Task(){

const found=[];
const [list, setlist] = useState(found);
const [count, setCount] = useState(0);
const [checkbox,setcheckbox]=useState(); 

  const [formdata,setformdata]= useState({
      'task':'',
      'pri':1000,
      'completed':0
});

  useEffect(()=>{
    axios.get("http://localhost:8080/list")
    .then(response=>{
      setlist(response.data);
      let templist = (response.data);
      setlist(templist.slice().sort((a,b) => a.pri - b.pri));
      //console.log(templist);
      //setlist(list.slice().sort((a, b) => a.pri - b.pri));  
    }) 
  },[count]);

   

  // saving data to the list 

  const handleChange = (e)=>{
    setformdata({
      ...formdata,
      [e.target.name]:e.target.value
    });
     
  }; 
    
    // saving data to the backend.

   const handlesubmit =async (e)=>{
       e.preventDefault();
      await axios.post("http://localhost:8080/task",{
        task:formdata.task,
        pri:formdata.pri,
        completed:formdata.completed
      }) 
      .then(response => {
        console.log("post",response);
        window.location.reload();
        setCount((count)=>count+1);
      }) 
   }  

    // handling delete request

   const handleclick= async(e)=>{
    //  if(e.target.value===checkbox){
       await axios.post("http://localhost:8080/delete",{
            checkbox:e.target.value
        }) 
        .then(response=>{
          setCount((count)=>count+1);
          window.location.reload();
        });
      // }
   };

  //  identifying task to be deleted 

   const handlecheck =async (e)=>{
     if(e.target.checked){
    setcheckbox(e.target.value); 
      await axios.post("http://localhost:8080/completed",{
          _id:e.target.value,
          completed:1
      }) 
      .then((response)=>{
          console.log(response);
      })
   }else{
     setcheckbox(null);
     await axios.post("http://localhost:8080/completed",{
        _id:e.target.value,
        completed:0
     }) 
     .then((response)=>{
       console.log(response);
     })
   }  setCount((count)=>count+1);
  }

 // handling important tasks

  const handleimp=async (e)=>{
    if(e.target.checked){
        await axios.post("http://localhost:8080/update",{
              _id:e.target.value,
              pri:1
        })
        .then(response=>{
          console.log(response);
        })
  }else{
      await axios.post("http://localhost:8080/update",{
        _id:e.target.value,
        pri:1000
      })
      .then(response=>{
        console.log(response);
      })
  } setCount((count)=>count+1);
  } 

    const handleclear= async (e)=>{
        await axios.get("http://localhost:8080/clear")
        .then((response)=>{
            setCount((count)=>count+1);
        })
    }

  return(
    <div className="todo" >
    <h1>My Day ! </h1>

    <div className="form">

    <form onSubmit={handlesubmit}>

      <input type="text" required name="task" placeholder='task' onChange={handleChange} autoComplete="Off"></input>
      <button type="submit">Add</button>
      </form>

      </div>

        <div  className="todo_list">
      <ul >
       { 
         list.map(function(ele){
          return(
      <div className="item">
        <input type="checkbox" className="comp" name="checkbox" value={ele._id} checked={ele.completed===1 ? true:false} onClick={handlecheck}></input>
          <p >{ele.title}</p>
        <button className="button" onClick={handleclick} value={ele._id} type="submit">Delete</button>
        <input type="checkbox" className="star" checked={ele.pri===1 ? true: false} name="checkbox" value={ele._id} onClick={handleimp}></input>
       
      </div>
    )})} 
       </ul>
        </div>
              <button type="submit" className="button" onClick={handleclear} > Clear the list</button>
    </div>
  )
}

export default Task;