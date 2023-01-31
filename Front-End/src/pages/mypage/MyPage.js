import classes from './MyPage.module.css';
import { useSelector } from 'react-redux';
const MyPage = () =>{
  const token = useSelector((state) => state.auth.token)
  // console.log(token)
  return(
    <div className={classes.MyPage}>
      <h1>My Page</h1>
      <h1>My Page</h1>
      <h1>My Page</h1>
      <h1>My Page</h1>
      <h1>My Page</h1>
      <h1>My Page</h1>
      <h1>My Page</h1>
      <h1>My Page</h1>
      <h1>My Page</h1>
      <h1>My Page</h1>
    </div>
  )
}

export default MyPage