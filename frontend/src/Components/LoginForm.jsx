import { useRef } from "react"
import { useNavigate } from "react-router-dom"
//
const LoginForm = () => {
    const usernameRef=useRef(null)
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        localStorage.setItem("username",usernameRef.current.value)
        usernameRef.current.value=""
        navigate("/tasks")
    }
  return (
    <div>
      <h2>Logo</h2>
      <form action="" className="" onSubmit={handleSubmit}>
        <label htmlFor="username">Nhập tên của bạn</label><br />
        <input type="text" required 
        name="username" id="username" 
        placeholder="Enter Your Username" ref={usernameRef}/>
        <button type="submit">Xác nhận</button>
      </form>
    </div>
  )
}

export default LoginForm
