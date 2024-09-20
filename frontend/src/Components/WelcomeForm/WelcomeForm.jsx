import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./WelcomeForm.module.css"
//
const url=import.meta.env.VITE_REACT_URL
const LoginForm = () => {
    const usernameRef=useRef(null)
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        localStorage.setItem("username",usernameRef.current.value)
        usernameRef.current.value=""
        navigate("/board")
    }
  return (
    <div className={styles.form_container}>
      <img src={`${url}/src/assets/kanban.png`} width="256px" height="256px" alt="Logo"/>
      <form action="" className="" onSubmit={handleSubmit}>
        <label htmlFor="username">Nhập tên của bạn</label><br />
        <input type="text" required 
        name="username" id="username" 
        placeholder="Enter Your Username" ref={usernameRef}/>
        <button type="submit">Xác nhận</button>
        <h1>Ứng dụng quản lý đơn giản theo phương pháp Kanban</h1>
        <h3>Cần từ 1-2 phút cho lần đầu gửi request đến server, vui lòng đợi 🙏</h3>
      </form>
    </div>
  )
}

export default LoginForm
