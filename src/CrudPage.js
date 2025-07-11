import React,{useEffect,useState} from 'react'
import Axios  from 'axios'


function CrudPage()
{

    const [productName,setproductName]=useState("")
    const [description,setDescription]=useState("")
    const [productList,setproductList]=useState([]);
    const [newproductName,setNewproductName]=useState("")

    useEffect(()=>{
        fetchData();
    },[])

    //AddFoodData

    const addproductData=()=>{
        Axios.post("http://localhost:3001/insert",{productName,description})
        .then((response)=>{
            console.log(response);
            alert("Data Added");
            })
            .catch((err)=>{
                console.log(err);
                })
            }
  //get the data
  const fetchData=()=>{
    Axios.get('http://localhost:3001/read').then((response)=>{
        console.log(response.data);
        setFoodList(response.data);
    })
  }
  //update
  const updateproduct=(id)=>{
    Axios.put('http://localhost:3001/update',{id,newproductName})
    .then(()=>fetchData())
  }

  //delete
  const deleteproduct=(id)=>{
    alert("Delete")
    Axios.delete(`http://localhost:3001/delete/${id}`).then(()=>fetchData())
  }
    return(
        <div className='container'>
            <h2>CRUD PAGE</h2>
            <div className='mb-3'>
               <input type='text' className='form-control' placeholder='productName'required
               onChange={(e)=>setproductName(e.target.value)}
               />
            </div>
            <div className='mb-3'>
                <input type='text' className='form-control' placeholder='productDescription'required
                onChange={(e)=>setDescription(e.target.value)}
                />
            </div>
            <div className='mb-3'>
                <button className='btn btn-primary' onClick={addproductData}>Addproduct</button>
            </div>
            <table className='table table-bordered table-striped'>
               <thead className='table-dark'>
               <tr>
                <th>productName</th>
                <th>productDescription</th>
                <th>Edit</th>
                <th>Delete</th>
               </tr>
               </thead>
               <tbody>
                {foodList.map((val,key)=>(
                   <tr key={key}>
                     <td>{val.foodName}</td>
                     <td>{val.description}</td>
                     <td>
                        <input type="text" placeholder='updateFoodName' onChange={(e)=>setNewproductName(e.target.value)}/>
                        <button onClick={()=>updateproduct(val._id)}>Edit</button>
                     </td>
                     <td><button onClick={()=>deleteproduct(val._id)}>Delete</button></td>
                   </tr>
                ))}
              
               </tbody>
            </table>
        </div>
        
    )
}

export default CrudPage;