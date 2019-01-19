import { queryNotificationList} from '@/services/api';

export default {
  namespace: 'notification',

  state: {
    list: [],
    data: [],
  },

  effects: {
    *queryNotificationList({ payload }, { call, put }){
      const response = yield call(queryNotificationList,payload);
      console.log(response.data.content);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data.content) ? response.data.content : [],
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
  },
};
