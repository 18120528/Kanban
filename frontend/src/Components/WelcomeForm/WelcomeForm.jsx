import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./WelcomeForm.module.css"
import logoUrl from "/src/assets/kanban.png"
//
const LoginForm = () => {
    document.title="Kanban"
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
        <label htmlFor="username">Enter your name</label><br />
        <input type="text" required 
        name="username" id="username" 
        placeholder="Enter Your Username" ref={usernameRef}/>
        <button type="submit">Submit</button>
        <h1>Simple kanban-style, list-making application</h1>
        <h3>Cập nhật kiến thức trồng trọt và mua hoa cúc lưới sỉ lẻ tại <a href="https://cucluoidalat.blogspot.com" rel="dofollow">Cúc Lưới Đà Lạt</a></h3>
      </form>
    </div>
  )
}

export default LoginForm
