import {React, useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
    const [formData, setFormData ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/v1/signup", formData);
            if(!response.data.success){
                console.log("error fetching details");
            }
            setFormData({});
            navigate('/signin')
        } catch (error) {
            console.log("Something went wrong while signing up: ", error);
        }
    }
    
    
    
    
    
    return (
    <div>
         <form onSubmit={handleSubmit} className= 'flex flex-col gap-8 justify-center items-center' >
            <label >
                First Name: 
                <input 
                type="text" 
                placeholder= "enter your first name"
                required
                name='firstName'
                value={formData.firstName}
                onChange = {handleOnChange} 
                />
            </label>
            <label >
                Last Name: 
                <input 
                type="text" 
                placeholder= "enter your last name"
                required
                name='lastName'
                value={formData.lastName}
                onChange = {handleOnChange} 
                />
            </label>
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
            <label >
                Confirm password: 
                <input 
                type="password" 
                placeholder= "Confirm Password"
                required
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange = {handleOnChange} 
                />
            </label>
            <button type='submit' >
                Sign Up
            </button>
        </form>
    </div>
  )
}

export default SignUp