import {React, useState, useEffect} from 'react'
import {useNavigate, useParams, useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios'


const UpdateTask = () => {

    const { currentUser } = useSelector((state) => state.user);
    const location = useLocation();
    // console.log("taskid from params: ", location)

    const getIdFromUrl = () => {
        const path = location.pathname;
        const parts = path.split('/');
        return parts[parts.length - 1]; // Get the last part of the path
      };
      const taskId = getIdFromUrl();
    //   console.log("taskid: ", taskId)

    const [formData, setFormData ] = useState({
        title: '',
        status: 'Under Review',
        priority: 'Low',
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
          const res = await fetch(`http://localhost:4000/api/v1/updateTask/${taskId}`, {
            method: 'PUT',
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
          navigate(`/dashboard/${data.user}`);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

      useEffect(() => {
        if (taskId) {
          const fetchTask = async () => {
            try {
              const response = await axios.get(`http://localhost:4000/api/v1/getTaskInfo/${taskId}`);
              setFormData(response.data);
            } catch (error) {
              console.error("Error fetching task:", error);
            }
          };
    
          fetchTask();
        }
      }, [taskId]);


  return (
    <div className=' mt-0  h-screen' >
      <div className='mx-auto text-center font-bold uppercase text-5xl pt-5 font-serif'>
        <h1>Update Task</h1>
      </div>
        

<form class="max-w-md mx-auto mt-24" onSubmit = {handleOnSubmit}>
  <div class="relative z-0 w-full mb-5 group">
      <input 
      name='title'
      value={formData.title}
      onChange = {handleOnChange}
      type="text"  class="block py-2.5 px-0 w-full text-3xl text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
  </div>
  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 ">Status</label>
  <select 
  name='status'
  value={formData.status}
  onChange = {handleOnChange} 
  id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">

    <option>To-Do</option>
    <option>In Progress</option>
    <option>Under Review</option>
    <option>Completed</option>
  </select>
  <label for="countries" class="block mb-2 mt-2 text-sm font-medium text-gray-900 ">Priority</label>
  <select 
  required
   name='priority'
   value={formData.priority}
   onChange = {handleOnChange}
  id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">

    <option className='text-green-500 font-semibold' >Low</option>
    <option className='text-orange-400 font-semibold' >Medium</option>
    <option className='text-red-600 font-semibold' >Urgent</option>
    
  </select>
  
  <label for="message" class="block mb-2 mt-2 text-sm font-medium text-gray-900 ">Description</label>
  <textarea
   name='description'
   value={formData.description}
   onChange = {handleOnChange} 
   id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write here..."></textarea>

  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">Submit</button>
</form>


    </div>
  )
}

export default UpdateTask
