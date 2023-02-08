import Radio from '../radiocomponent/Radio';
import RadioGroup from '../radiocomponent/RadioGroup';

import classes from './SbtiPage.module.css'

const SlideComponent = ({label, name, value, size, ...etc}) => {

  return(
    <div className={classes.carouselItem}>
    <h1>{label}</h1>
    <form {...etc}>
      <RadioGroup label={label}>
        {value.map((item, idx) => {
          return(
            <Radio 
              key={idx}
              value={value[idx]}
              name={label}
            >
              {size[idx]}
            </Radio>
          )
        })}
      </RadioGroup>
    </form>
  </div>
  )
}

export default SlideComponent;