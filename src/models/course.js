import { queryCourseList, queryCourseDetail,queryCourseInfo,downloadCourseware,queryCoursewareList,queryHomeworkList,queryHomeworkSubmitList,queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';

export default {
  namespace: 'course',

  state: {
    list: [],
    data: [],
    info: [],
  },

  effects: {
    *queryCourseList({ payload }, { call, put }){
      const response = yield call(queryCourseList,payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data.content) ? response.data.content : [],
      });
    },
    *queryCourseDetail({ payload }, { call, put }){
      const response = yield call(queryCourseDetail,payload);
      yield put({
        type: 'queryData',
        payload: response.data,
      });
    },
    *queryCourseInfo({ payload }, { call, put }){
      const response = yield call(queryCourseInfo,payload);
      yield put({
        type: 'queryInfo',
        payload: response.data,
      });
    },
    *downloadCourseware({ payload }, { call, put }){
      const response = yield call(downloadCourseware,payload);
      yield put({
        type: 'queryData',
        payload: response.data,
      });
    },
    *queryCoursewareList({ payload }, { call, put }){
      const response = yield call(queryCoursewareList,payload);
      console.log(response.data.content);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data.content) ? response.data.content : [],
      });
    },
    *queryHomeworkList({ payload }, { call, put }){
      const response = yield call(queryHomeworkList,payload);
      console.log(response.data.content);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data.content) ? response.data.content : [],
      });
    },
    *queryHomeworkSubmitList({ payload }, { call, put }){
      const response = yield call(queryHomeworkList,payload);
      console.log(response.data.content);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data.content) ? response.data.content : [],
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      console.log(action.payload);
      return {
        ...state,
        list: action.payload,
      };
    },
    queryData(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    queryInfo(state, action) {
      return {
        ...state,
        info: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
