import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Row, Col, Card, List, Avatar,Icon,Spin} from 'antd';

//import { Radar } from '@/components/Charts';
import EditableLinkGroup from '@/components/EditableLinkGroup';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './CourseDetail.less';
import { returnAtIndex } from '_lodash-decorators@6.0.1@lodash-decorators/utils';

@connect(({ course, homework, notification, loading }) => ({
  course,
  loading: loading.models.course,
  listLoading: loading.effects['list/fetch'],
  homework,
  notification,
  //chart,
  notificationLoading: loading.effects['notification/fetchList'],
}))
class CourseDetail extends PureComponent {
  state = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
    tabKey: 'info',
  };
  componentDidMount() {
    const { dispatch } = this.props;
    //console.log(this.props.match.params.courseId);
    dispatch({
      type: 'course/queryCourseDetail',
      payload: {
        courseId: this.props.match.params.courseId,
        page: 0,
        size: 10
      },
    });

    
    dispatch({
      type: 'course/queryCourseInfo',
      payload: {
        courseId: this.props.match.params.courseId,
        page: 0,
        size: 10
      },
    });
    
    dispatch({
      type: 'homework/queryHomeworkList',
      payload: {
        courseId: this.props.match.params.courseId,
        page: 0,
        size: 10
      },
    });
    
    dispatch({
      type: 'notification/queryNotificationList',
      payload: {
        courseId: this.props.match.params.courseId,
        page: 0,
        size: 10
      },
    });
    
    //dispatch({
    //  type: 'user/fetchCurrent',
    //});
    //dispatch({
    //  type: 'list/fetch',
    //  payload: {
    //    count: 8,
    //  },
    //});
    //dispatch({
    //  type: 'project/fetchNotice',
    //});
    //dispatch({
    //  type: 'notification/fetchList',
    //});
    //dispatch({
    //  type: 'chart/fetch',
    //});
    const { match } = this.props;
    console.log(location.pathname.replace(location.pathname.substring(0,location.pathname.lastIndexOf("\/")+1),''));
    console.log(location.pathname.replace(`${match.path}/`, ''));
  }

  onTabChange = (key,type) => {
    const { match } = this.props;
    //console.log(key, type);
    this.setState({ [type]: key });
    switch (key) {
      case 'info':
        router.push(`${match.url}/info`);
        break;
      case 'ware':
        router.push(`${match.url}/ware`);
        break;
      case 'homework':
        router.push(`${match.url}/homework`);
        break;
      default:
        break;
    }
  };

  componentWillUnmount() {
    const { dispatch } = this.props;
    //dispatch({
    //  type: 'chart/clear',
    //});
  }

  renderHomeworkNotDLLList() {
    const {
      homework: { list },
    } = this.props;
    console.log('renderHomeworkNotDLLList:'+list)
    return list ? list.map(item => {
      return (
        <Card.Grid className={styles.projectGrid} key={item.id}>
          <Card bodyStyle={{ padding: 0 }} bordered={false}>
            <Card.Meta
              title={
                <div className={styles.cardTitle}>
                  <Link to={"/course/"+this.props.match.params.courseId+"/homework"} >{item.name}</Link>
                </div>
              }
              description={item.requirement}
            />
            <div className={styles.projectItemContent}>
              <Link to={"/course/"+this.props.match.params.courseId+"/homework"} >{item.member || ''}</Link>
              {item.last_modified_time && (
                <span className={styles.datetime} title={item.last_modified_time}>
                  {moment(item.last_modified_time).fromNow()}
                </span>
              )}
            </div>
          </Card>
        </Card.Grid>
      )
    } ) : null;
  }

  renderNotification() {
    const {
      notification: { list },
    } = this.props;
    return list.map(item => {
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            title={
              <span>
                <a className={styles.username}>{item.title}</a>
                &nbsp;
                <span className={styles.event}>{item.content}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.last_modified_time}>
                {moment(item.last_modified_time).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  renderHeaderExtra() {
    const{course: { info }
    } = this.props;
    
    return (
    <div>
      <div className={styles.statItem}>
        <p>课件</p>
        <p>{info.courseware_count}</p>
      </div>
      <div className={styles.statItem}>
        <p>作业</p>
        <p>
         {info.dated_count} <span> / {info.homework_count}</span>
        </p>
      </div>
      <div className={styles.statItem}>
        <p>提交次数</p>
        <p>{info.submit_count}</p>
      </div>
    </div>);
  }

  render() {
    const {
      course: { data },
      listLoading,
      currentUser,
      currentUserLoading,
      notificationLoading,
      //chart: { radarData },
      match,
      location,
      children,
    } = this.props;

    const pageHeaderContent = (
        <div className={styles.pageHeaderContent}>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              《{data.name}》
            </div>
            <div>
            </div>
          </div>
        </div>
      );

    const extraContent = (
      <div className={styles.extraContent}>
        {this.renderHeaderExtra()}
      </div>
    );

    const operationTabList = [
      {
        key: 'info',
        tab: (
          <span>
            介绍
          </span>
        ),
      },
      {
        key: 'ware',
        tab: (
          <span>
            课件
          </span>
        ),
      },
      {
        key: 'homework',
        tab: (
          <span>
            作业
          </span>
        ),
      },
    ];
      //activeTabKey={location.pathname.replace(`${match.path}/`, '')}
      //activeTabKey={this.state.tabKey}
       //onTabChange={(key) => { this.onTabChange(key, 'tabKey'); }}
    return (
      <PageHeaderWrapper
        loading={currentUserLoading}
        content={pageHeaderContent}
        extraContent={extraContent}
      >
        <Row gutter={24}>
          <Col lg={16} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={location.pathname.replace(location.pathname.substring(0,location.pathname.lastIndexOf("\/")+1),'')}
              onTabChange={(key) => { this.onTabChange(key, 'tabKey'); }}
              loading={listLoading}
            >
              {children}
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="进行中的作业"
              bordered={false}
              extra={<Link to="/">全部作业</Link>}
              loading={notificationLoading}
              bodyStyle={{ padding: 0 }}
            >
            {this.renderHomeworkNotDLLList()}
            </Card>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="通知"
              loading={notificationLoading}
            >
              <List loading={notificationLoading} size="large">
                <div className={styles.activitiesList}>{this.renderNotification()}</div>
              </List>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default CourseDetail;
