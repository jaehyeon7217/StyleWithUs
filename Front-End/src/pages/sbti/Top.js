import Radio from './component/Radio';
import RadioGroup from './component/RadioGroup';

import classes from './SbtiPage.module.css'

const Top = (props) =>{
 
  return(
    <div className={classes.carouselItem}>
      <h1>top</h1>
      <form onSubmit={(event)=>{
        event.preventDefault();
        props.setData(event.target.top.value)
      }}>
        <RadioGroup label='상체 체형'>
          <Radio name="top" value='slim'>
            Slim
          </Radio>
          <Radio name="top" value='ordinary'>
            Ordinary
          </Radio>
          <Radio name="top" value='chubby'>
            Chubby
          </Radio>
        </RadioGroup>
        <button>저장</button>
      </form>
    </div>
  )
};

export default Top;