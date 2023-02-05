import Radio from './component/Radio';
import RadioGroup from './component/RadioGroup';

import classes from './SbtiPage.module.css'

const Bottom = (props) =>{
    
  return(
    <div className={classes.carouselItem}>
      <h1>Bottom</h1>
      <form onSubmit={(event)=>{
        event.preventDefault();
        props.setData(event.target.bottom.value)
      }}>
        <RadioGroup label='하체 체형'>
          <Radio name="bottom" value='slim'>
            Slim
          </Radio>
          <Radio name="bottom" value='ordinary'>
            Ordinary
          </Radio>
          <Radio name="bottom" value='chubby'>
            Chubby
          </Radio>
        </RadioGroup>
        <button>저장</button>
      </form>
    </div>
  )
};

export default Bottom;