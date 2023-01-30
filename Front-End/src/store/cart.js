import { createSlice } from "@reduxjs/toolkit";

//userType => 0: user 1: consultant
const initialCartState = {
  category: {
    '상의': {
      '니트/스웨터': [],
      '셔츠/블라우스': [],
      '후드 티셔츠': [],
      '피케/카라 티셔츠': [],
      '맨투맨/스웨트셔츠': [],
      '반소매 티셔츠': [],
      '긴소매 티셔츠': [],
      '민소매 티셔츠': [],
      '기타 상의': []
    },
    '아우터': {
      '후드 집업': [],
      '환절기 코트': [],
      '블루종/MA-1': [],
      '겨울 싱글 코트': [],
      '레더/라이더스 재킷': [],
      '겨울 더블 코트': [],
      '겨울 기타 코트': [],
      '무스탕/퍼': [],
      '롱패딩/롱헤비 아우터': [],
      '트러커 재킷': [],
      '슈트/블레이저 재킷': [],
      '숏패딩/숏헤비 아우터': [],
      '카디건': [],
      '패딩 베스트': [],
      '아노락 재킷': [],
      '베스트': [],
      '폴리스/뽀글이': [],
      '사파리/헌팅 재킷': [],
      '트레이닝 재킷': [],
      '나일론/코치 재킷': [],
      '스타디움 재킷': [],
      '기타 아우터': [],
    },
    '바지': {
      '데님 팬츠': [],
      '숏 팬츠': [],
      '코트 팬츠': [],
      '레깅스': [],
      '슈트 팬츠/슬랙스': [],
      '점프 슈트/오버올': [],
      '트레이닝/조거 팬츠': [],
      '기타 바지': [],
    },
    '신발': {
      '구두': [],
      '슬리퍼': [],
      '로퍼': [],
      '기타 신발': [],
      '플랫 슈즈': [],
      '모카신/보트 슈즈': [],
      '블로퍼': [],
      '샌들': [],
      '부츠': [],
      '신발 용품': [],
      '캔버스/단화': [],
      '패션스니커즈화': [],
      '기타 스니커즈': [],
    },
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    downloadData(state, action) {
      const type = action.payload.type;
      const detail = action.payload.detail;
      const data = action.payload.data;
      state.category[type][detail].push(...data);
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;