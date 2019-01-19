import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
  DatePicker,
  Select,
  Upload,
  message,
  InputNumber,
  Divider,
  Table,
  Skeleton
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';

import styles from './Homeworks.less';
import {  MarkdownPreview  } from 'react-marked-markdown';
import Highlighter from 'react-highlight-words';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;
const Dragger = Upload.Dragger;


@connect(({ course, homework,loading }) => ({
  course,
  homework,
  loading: loading.models.homework,
}))
@Form.create()
class Homeworks extends PureComponent {
  state = { reqVisible: false ,visible: false, done: false, reqDone: false };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    /*
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });*/
    dispatch({
      type: 'course/queryHomeworkList',
      payload: {
        courseId: this.props.match.params.courseId,
        page: 0,
        size: 10
      },
    });

  }

  normFile = (e) => {
    //console.log('files Upload event:', e);
    this.setState({ file_: e.file.originFileObj });
    return e && e.fileList;
  }

  showHomeworkReqModal(){
    this.setState({
      reqVisible: true,
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleDone = () => {
    //setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    //setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    //console.log('handleSubmit')

    //setTimeout(() => this.addBtn.blur(), 0);
    this.props.form.validateFields((err, values) => {

      //console.log('handleSubmit:'+values)
      //console.log('handleSubmit:'+JSON.stringify(values))
      let submitData = new FormData();
      submitData.append('student_id', values.id);
      submitData.append('name', values.name);
      submitData.append('remark', values.remark ? values.remark:' ');
      
      submitData.append('file', this.state.file_)//new File(["First Line Text","Second Line Text"],"FileName"));


      //console.log('files:validateFields:'+JSON.stringify(this.state.file_))
      if (err) {
        console.error(err)
        return;
      }
      this.setState({
        done: true,
      });
      //console.log('dispatch: homework/postHomeworkSubmit'+submitData)
      //console.log('homeworkId = '+current.id)
      dispatch({
        type: 'homework/postHomeworkSubmit',
        payload: { 
          courseId: this.props.match.params.courseId,
          homeworkId: current.id,
          sdata:submitData
        },
      });
    });
  };

  handleReqDone = () => {
    //setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      reqDone: false,
      reqVisible: false,
    });
  };

  handleReqCancel = () => {
    //setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      reqVisible: false,
    });
  };

  handleReqSubmit = e => {    
    e.preventDefault();
    this.showModal();
  };

  submitHomework = id => {
    const { dispatch } = this.props;
    //console.log('submitHomework'+current);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    /*
    dispatch({
      type: 'list/submit',
      payload: { id },
    });*/
  };

  computePercent = (ddl,create_time) => {
    let dead_line = moment(ddl).format("X");
    let created_time = moment(create_time).format("X");
    //create_time = moment(ddl).subtract(3, "months").format("X");
    let now = moment().format("X");
    //console.log("computePercent:"+Number((100*(dead_line - now) / (dead_line - created_time)).toFixed(2)))
    //console.log(now)
    //console.log(created_time)
    //console.log(dead_line)
    return  100-Number((100*(dead_line - now) / (dead_line - created_time)).toFixed(2))
  }

  computeStatus(ddl,create_time){
    let percent = this.computePercent(ddl,create_time);
    //console.log(percent)
    if(percent < 100){
      console.log("active")
      return "active";
    }else{
      console.log("success")
      return "success";
    }
  }

  requestHomeworkDetail(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'homework/queryHomeworkDetail',
      payload: {
        courseId: this.props.match.params.courseId,
        homeworkId: id,
        page: 0,
        size: 10
      },
    })
    dispatch({
      type: 'homework/queryHomeworkSubmitList',
      payload: {
        courseId: this.props.match.params.courseId,
        homeworkId: id,
        page: 0,
        size: 10
      },
    })
    this.showHomeworkReqModal();
  }

  /*
  renderHomeworkRquirement() {
      const {
        homework: {data,submitList}
      } = this.props;
      console.log('renderHomeworkRquirement:'+data)
      console.log('renderHomeworkRquirement:'+JSON.stringify(submitList))
      return (
        <div>
        <MarkdownPreview value={data.requirement}/>
        <Divider/>
        <List 
          size="large"
          rowKey="id"
          dataSource={submitList}
          renderItem={item => (
          <List.Item>
            <List.Item.Meta
            title={<a>{item.student_id +' | ' + item.student_name}</a>}
            description={item.file_name}
          />
        </List.Item>
      )}/>
        </div>
      );
  }*/

  renderHomeworkRquirement() {
    const {
      homework: {data,submitList}
    } = this.props;
    console.log('renderHomeworkRquirement:'+data)
    console.log('renderHomeworkRquirement:'+JSON.stringify(submitList))
    const submit_columns = [{
      title: '学号',
      dataIndex: 'student_id',
      key: 'student_id',
      width: '20%',
    }, {
      title: '姓名',
      dataIndex: 'student_name',
      key: 'student_name',
      width: '20%',
    }, {
      title: '文件名',
      dataIndex: 'file_name',
      key: 'file_name',
    }, {
      title: '上次提交',
      dataIndex: 'update_time_str',
      key: 'update_time_str',
    }, {
      title: '提交次数',
      dataIndex: 'commit_count',
      key: 'commit_count',
    }];
    for (var i = 0, l = submitList.length; i < l; i++) {
      submitList[i].update_time_str = moment(submitList[i].update_time).format('YYYY-MM-DD HH:mm');
    }

    //for(submit in submitList) {  
    //  submit.update_time_str = moment(submit.update_time).format('YYYY-MM-DD HH:mm');
    //  console.log(moment(submit.update_time).format('YYYY-MM-DD HH:mm'));
    //};  
    return (
      <div>
      <MarkdownPreview value={data.requirement}/>
      <Divider/>
      <h4>提交列表</h4>
      <Table columns={submit_columns} dataSource={submitList} />
      </div>
    );
}

  render() {
    const {
      course: { list },
      homework: {submitResult},
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { reqVisible,reqDone,visible, done, current = {} ,file_} = this.state;

    const skeletonParagraphProps = {
      rows:1
    }

    const requestHomeworkReq = (id) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'homework/queryHomeworkDetail',
        payload: {
          courseId: this.props.match.params.courseId,
          homeworkId: id,
          page: 0,
          size: 10
        },
      });
    }

    const editAndSubmit = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'delete') {
        Modal.confirm({
          title: '删除任务',
          content: '确定删除该任务吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.submitHomework(currentItem.id),
        });
      }
    };

    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '提交', onOk: this.handleSubmit, cancelText: '取消', onCancel: this.handleCancel };

    const reqModalFooter = done
      ? { footer: null, onCancel: this.handleReqDone }
      : { okText: '提交', onOk: this.handleReqSubmit, cancelText: '关闭', onCancel: this.handleReqCancel };

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">进行中</RadioButton>
          <RadioButton value="waiting">已截止</RadioButton>
        </RadioGroup>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );

    const ListContent = ({ data: { owner, createdTime ,ddl, percent } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>编辑人</span>
          <p>{owner}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>截止时间</span>
          <p>{moment(ddl).format('YYYY-MM-DD HH:mm')}</p>
        </div>
        <div className={styles.listContentItem}>
          <Progress percent={this.computePercent(ddl,createdTime)} status={this.computeStatus(ddl,createdTime)} strokeWidth={6} style={{ width: 180 }} />
        </div>
      </div>
    );

    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndSubmit(key, props.current)}>
            <Menu.Item key="edit">提交</Menu.Item>
          </Menu>
        }
      >
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    const getModalContent = () => {
      if (done&&submitResult.code == 0) {
        return (
          <Result
            type="success"
            title="提交成功"
            description={submitResult.msg}
            actions={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      if (done&&submitResult.code != 0) {
        return (
          <Result
            type="error"
            title="提交失败" description={submitResult.msg}
            actions={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="学号" {...this.formLayout}>
            {getFieldDecorator('id', {
              rules: [{ required: true, message: '请输入8位学号',min:8 }],
            })(<Input placeholder="请输入学号"/>)}
          </FormItem>
          <FormItem label="姓名" {...this.formLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '姓名长度应大于2', min:2 }],
            })(<Input placeholder="请输入姓名" />)}
          </FormItem>
          <Form.Item
            {...this.formLayout}
            label="文件"
          >
            <div className="dropbox">
              {getFieldDecorator('dragger', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload.Dragger name="files" action="/upload.do">
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">点击或拖动到此处上传作业</p>
                  <p className="ant-upload-hint">补交可添加备注，说明迟交原因.</p>
                </Upload.Dragger>
              )}
            </div>
          </Form.Item>
          <FormItem {...this.formLayout} label="备注">
            {getFieldDecorator('remark', {
              rules: [{ message: '', min: 0 }],
            })(<TextArea rows={4} placeholder="额外备注" />)}
          </FormItem>
        </Form>
      );
    };
    return (
      <div>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
              //loading={loading}
              dataSource={list}
              renderItem={item => (
                <Skeleton
                  loading={loading} 
                  active
                  paragraph={skeletonParagraphProps}
                  >
                <List.Item
                  actions={[
                    <a
                      onClick={e => {
                        e.preventDefault();
                        this.showEditModal(item);
                      }}
                    >
                      提交
                    </a>
                  ]}
                >
                  <List.Item.Meta
                    title={<a onClick={() => this.requestHomeworkDetail(item.id)}>{item.name}</a>}
                    description=""
                  />
                  <ListContent data={item} />
                </List.Item>
                </Skeleton>
              )}
            />
          </Card>
        </div>
        <Modal
          title="作业要求"
          className={styles.standardListForm}
          width={900}
          bodyStyle={reqDone ? { padding: '72px 0' } : { padding: '28px 28px 28px 28px' }}
          destroyOnClose
          visible={reqVisible}
          {...reqModalFooter}
        >{this.renderHomeworkRquirement()}</Modal>
        <Modal
          title={done ? null : `作业${current ? '上传' : '补交'}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </div>
    );
  }
}

export default Homeworks;
