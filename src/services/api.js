import { stringify } from 'qs';
import request from '@/utils/request';
import { async } from 'q';

//-------------------------------------------------
export async function queryCourseList(params){
  return request('/server/api/course');
}
export async function queryCourseDetail(params){
  const { courseId = 1, ...restParams } = params;
  return request('/server/api/course/'+courseId);
}
export async function queryCourseInfo(params){
  const { courseId = 1, ...restParams } = params;
  return request('/server/api/course/'+courseId+'/info');
}
export async function queryCoursewareList(params){
  const { courseId = 1, ...restParams } = params;
  return request('/server/api/course/'+courseId+'/ware');
}
export async function downloadCourseware(params){
  const { courseId = 1,coursewareId = 1, ...restParams } = params;
  return request('/server/api/course/'+courseId+'/ware/'+coursewareId+'/download');
}
export async function queryHomeworkDetail(params){
  const { courseId = 1, homeworkId = 1, ...restParams } = params;
  return request('/server/api/course/'+courseId+'/homework/'+homeworkId);
}
export async function queryHomeworkList(params){
  const { courseId = 1, ...restParams } = params;
  return request('/server/api/course/'+courseId+'/homework');
}
export async function queryHomeworkSubmitList(params){
  const { courseId = 1, homeworkId = 1, ...restParams } = params;
  return request('/server/api/course/'+courseId+'/homework/'+homeworkId+'/submit');
}

export async function queryNotificationList(params){
  const { courseId = 1, ...restParams } = params;
  return request('/server/api/course/'+courseId+'/notification');
}

//-------------------------------------------------
/*
    headers: {
      "content-type": 'multipart/form-data;'
    },*/
export async function postHomeworkSubmit(params){
  const { courseId = 1, homeworkId = 1, sdata, ...restParams } = params;
  console.log('sdata = '+sdata)
  return request('/server/api/course/'+courseId+'/homework/'+homeworkId+'/submit',{
    method: 'put',
    body: sdata
  });
}


//-------------------------------------------------

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
