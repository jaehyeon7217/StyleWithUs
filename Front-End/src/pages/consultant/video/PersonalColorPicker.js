import Spring from '../../../assets/spring_warm.jpg';
import Summer from '../../../assets/summer_cool.jpg';
import Fall from '../../../assets/fall_warm.jpg';
import Winter from '../../../assets/winter_cool.jpg';

const PersonalColorPicker = (props) => {
  return (
    <div onMouseEnter={props.mouseEnter}>
      <h1>봄</h1>
      <img src={Spring} alt="spring_warm" />
      <h1>여름</h1>
      <img src={Summer} alt="summer_warm" />
      <h1>가을</h1>
      <img src={Fall} alt="fall_warm" />
      <h1>겨울</h1>
      <img src={Winter} alt="winter_warm" />
    </div>
  );
};

export default PersonalColorPicker;
