import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import {
  Skeleton,
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
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';

import styles from './Coursewares.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;


@connect(({ course, loading }) => ({
  course,
  loading: loading.models.course,
}))
@Form.create()
class Coursewares extends PureComponent {
  state = { visible: false, done: false };

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
      type: 'course/queryCoursewareList',
      payload: {
        courseId: this.props.match.params.courseId,
        page: 0,
        size: 10
      },
    });
  }

  downloadCourseware = coursewareId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'course/downloadCourseware',
      payload: {
        courseId: this.props.match.params.courseId,
        coursewareId:coursewareId,
        page: 0,
        size: 10
      },
    });
  };


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
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'list/submit',
        payload: { id, ...fieldsValue },
      });
    });
  };

  render() {
    const {
      course: { list },
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current = {} } = this.state;

    const skeletonParagraphProps = {
      rows:1
    }

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    );

    const ListContent = ({ data: { owner, last_modified_time, percent, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Uploader</span>
          <p>{owner}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>更新时间</span>
          <p>{moment(last_modified_time).format('YYYY-MM-DD HH:mm')}</p>
        </div>
      </div>
    );

    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="操作成功"
            description="一系列的信息描述，很短同样也可以带标点。"
            actions={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
    };
    /*
     title={<a onClick={e => {
                                e.preventDefault();
                                this.downloadCourseware(item.id);
                              }}
    */
    return (
      <div>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            bodyStyle={{ padding: '0px 32px 0px 32px' }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
              dataSource={list}
              renderItem={item => (
                <List.Item>
                  <Skeleton 
                  loading={loading} 
                  active
                  paragraph={skeletonParagraphProps}
                  >
                    <List.Item.Meta
                      title={<a href={"http://192.168.199.110:8088/course/"+this.props.match.params.courseId+"/ware/"+item.id+"/download"}>{item.file_name}</a>}
                      description={item.remark}
                    />
                    <ListContent data={item} />
                  </Skeleton>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    );
  }
}

export default Coursewares;
