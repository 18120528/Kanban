import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./WelcomeForm.module.css"
import logoUrl from "/src/assets/kanban.png"
//
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
      <img src={logoUrl} width="256px" height="256px" alt="Logo"/>
      <form action="" className="" onSubmit={handleSubmit}>
        <label htmlFor="username">Nhập tên của bạn</label><br />
        <input type="text" required 
        name="username" id="username" 
        placeholder="Enter Your Username" ref={usernameRef}/>
        <button type="submit">Xác nhận</button>
        <h1>Ứng dụng lập danh sách đơn giản theo phương pháp Kanban</h1>
        <h3>Cần 1-2 phút để kết nối đến server sau khi nhập tên, vui lòng đợi 🙏</h3>
      </form>
    </div>
  )
}

export default LoginForm
