const initState = {
    num: "",
    content: "",
};

//액션
export const ADD_NUM = "ADD_NUM";

const reducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_NUM:
            return {
                ...state, // 불변성 유지
                num: action.data, // 변경할 state값
            };
        //기본값
        default:
            return state;
    }
};

export default reducer;