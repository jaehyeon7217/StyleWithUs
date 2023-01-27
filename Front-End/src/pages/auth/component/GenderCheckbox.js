const GenderCheckbox = ({label, ...etc}) => {
    //checkbox 하나만 선택할 수 있게하는 함수
    const checkOnlyOne = (checkThis) => {
        const checkboxes = document.getElementsByName('checkboxes')
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] !== checkThis) {
                checkboxes[i].checked = false
            }
        }
    }

    return(
        <div>
            <p>{label}</p>
            <label>
            남
            <input 
            type="checkbox" 
            name="checkboxes" 
            {...etc}
            onChange={(e) => checkOnlyOne(e.target)} />
            </label>
            <label>
            여
            <input 
            type="checkbox" 
            name="checkboxes" 
            {...etc} 
            onChange={(e) => checkOnlyOne(e.target)} />
            </label>
        </div>
    )
}

export default GenderCheckbox