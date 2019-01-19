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
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';

import styles from './Homeworks.less';

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
class Homeworks extends PureComponent {
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
      type: 'course/queryHomeworkList',
      payload: {
        courseId: this.props.match.params.courseId,
        page: 0,
        size: 10
      },
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

    //setTimeout(() => this.addBtn.blur(), 0);
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

  deleteItem = id => {
    const { dispatch } = this.props;
    /*
    dispatch({
      type: 'list/submit',
      payload: { id },
    });*/
  };

  computeStatus = (ddl,create_time) => {
    let dead_line = moment(ddl).format("X");
    create_time = moment(ddl).subtract(3, "months").format("X");
    let now = moment().format("X");

    return  (100*(dead_line - now) / (dead_line - create_time)).toFixed(2)
  }

  render() {
    const {
      course: { list },
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current = {} } = this.state;

    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'delete') {
        Modal.confirm({
          title: '删除任务',
          content: '确定删除该任务吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };

    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

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

    const ListContent = ({ data: { owner, ddl, percent, status } }) => (
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
          <Progress percent={this.computeStatus(ddl,ddl)} status={status} strokeWidth={6} style={{ width: 180 }} />
        </div>
      </div>
    );

    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, props.current)}>
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
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="学号" {...this.formLayout}>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入学号' }],
              initialValue: current.title,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="姓名" {...this.formLayout}>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入学号' }],
              initialValue: current.title,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...this.formLayout} label="备注">
            {getFieldDecorator('subDescription', {
              rules: [{ message: '请输入至少五个字符的产品描述！', min: 5 }],
              initialValue: current.subDescription,
            })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
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
              loading={loading}
              dataSource={list}
              renderItem={item => (
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
                    title={<a href={item.href}>{item.name}</a>}
                    description=""
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
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
