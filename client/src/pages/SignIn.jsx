import {React, useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { signInSuccess } from '../redux/authSlice'

export const SignIn = () => {

    const [formData, setFormData ] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }

      const handleOnSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/v1/login", formData);
            if(!response.data.success){
                console.log("error getting response");
                throw new Error("error getting response from api");
            }
            console.log(response.data);
            // *******RESPONSE.DATA.USER YE HAI:***************************
            // user: 
            //     createdAt: "2024-07-27T13:02:49.390Z"
            //     email: "ansh@g.com"
            //     firstName: "ansh"
            //     image: "https://api.dicebear.com/6.x/initials/svg?seed=ansh%20jain "
            //     lastName: "jain"
            //     tasks: []
            //     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuc2hAZy5jb20iLCJpZCI6IjY2YTRlZmY5NmM1YzlkNDFkMGU2MGI5ZCIsImlhdCI6MTcyMjA4NTQ2NSwiZXhwIjoxNzIyMTcxODY1fQ.qULltE4wJLRImQkuU8MthnzvuzxkGoggGDbdcA_SCkY"
            //     updatedAt: "2024-07-27T13:02:49.390Z"
            //     __v: 0
            //     _id: "66a4eff96c5c9d41d0e60b9d"
            setFormData({});
            dispatch(signInSuccess(response.data.user));
            navigate(`/dashboard/${response.data.user._id}`);
            
        } catch (error) {
            console.log("error while signing in : ", error);
        }
      }

  return (
    <div>
        <form onSubmit={handleOnSubmit} >
            
            <label >
                Email: 
                <input 
                type="email" 
                placeholder= "enter your email"
                required
                name='email'
                value={formData.email}
                onChange = {handleOnChange} 
                />
            </label>
            <label >
                password: 
                <input 
                type="password" 
                placeholder= "Password"
                required
                name='password'
                value={formData.password}
                onChange = {handleOnChange} 
                />
            </label>
            <button type='submit' >
                Sign In
            </button>
        </form>
    </div>
  )
}
