import {React, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';

const CreateTask = () => {

    const { currentUser } = useSelector((state) => state.user);

    const [formData, setFormData ] = useState({
        title: '',
        status: '',
        priority: '',
        description: ''
    });
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();


    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }


      const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
          
          setLoading(true);
          setError(false);
          const res = await fetch('http://localhost:4000/api/v1/createTask', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...formData,
              userRef: currentUser._id,
              token: currentUser.token,
            }),
          });
          const data = await res.json();
          setLoading(false);
          if (data.success === false) {
            setError(data.message);
          }
          console.log("data of creation of task is : ", data)
          navigate(`/dashboard/${data.task.user}`);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };




  return (
    <div>
        <form onSubmit = {handleOnSubmit}>
            <div>
                <input type="text"
                 placeholder= "TITLE"
                 required
                 name='title'
                 value={formData.title}
                 onChange = {handleOnChange}
                 />
            </div>
            <div>
            <label >
                Status: 
                <input 
                type="text" 
                placeholder= "Not Selected"
                required
                name='status'
                value={formData.status}
                onChange = {handleOnChange} 
                />
            </label>
            <label >
                Priority: 
                <input 
                type="text" 
                placeholder= "Not Selected"
                required
                name='priority'
                value={formData.priority}
                onChange = {handleOnChange} 
                />
            </label>
            {/* <label >
                Deadline: 
                <input 
                type="text" 
                placeholder= "Not Selected"
                required
                name='status'
                value={formData.status}
                onChange = {handleOnChange} 
                />
            </label> */}
            <label >
                Descriptioin: 
                <input 
                type="text" 
                placeholder= "Not Selected"
                required
                name='description'
                value={formData.description}
                onChange = {handleOnChange} 
                />
            </label>
            </div>
            
                <button type='submit' >Create</button>
            
        </form>

    </div>
  )
}

export default CreateTask