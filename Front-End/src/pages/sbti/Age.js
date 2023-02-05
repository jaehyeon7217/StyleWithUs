import Radio from './component/Radio';
import RadioGroup from './component/RadioGroup';
import classes from './SbtiPage.module.css'

const Age = (props) =>{
  return(
    <div className={classes.carouselItem}>
      <h1>Age</h1>
      <form onSubmit={(event) => {
        event.preventDefault();
        props.setData(event.target.age.value)
        }}
      >
      <RadioGroup label='나이'>
        <Radio name="age" value='15'>
          15~20
        </Radio>
        <Radio name="age" value='20'>
          20~25
        </Radio>
        <Radio name="age" value='25'>
          25~30
        </Radio>
        <Radio name="age" value='30'>
          30~35
        </Radio>
        <br />
        <Radio name="age" value='35'>
          35~40
        </Radio>
        <Radio name="age" value='40'>
          40~45
        </Radio>
        <Radio name="age" value='45'>
          45~50
        </Radio>
        <Radio name="age" value='50'>
          50 이상
        </Radio>
      </RadioGroup>
      <button>저장</button>
      </form>
    </div>
  )
};

export default Age;