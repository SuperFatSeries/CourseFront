import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Row, Col, Card, List, Avatar,Icon,Spin} from 'antd';

import { Radar } from '@/components/Charts';
import EditableLinkGroup from '@/components/EditableLinkGroup';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './CourseDetail.less';

@connect(({ course,user, project, activities, chart, loading }) => ({
  course,
  loading: loading.models.course,
  listLoading: loading.effects['list/fetch'],
  currentUser: user.currentUser,
  project,
  activities,
  chart,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  projectLoading: loading.effects['project/fetchNotice'],
  activitiesLoading: loading.effects['activities/fetchList'],
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
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
    dispatch({
      type: 'project/fetchNotice',
    });
    dispatch({
      type: 'activities/fetchList',
    });
    dispatch({
      type: 'chart/fetch',
    });
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
    dispatch({
      type: 'chart/clear',
    });
  }

  renderActivities() {
    const {
      activities: { list },
    } = this.props;
    return list.map(item => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
        if (item[key]) {
          return (
            <a href={item[key].link} key={item[key].name}>
              {item[key].name}
            </a>
          );
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} />}
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      course: { data },
      listLoading,
      currentUser,
      currentUserLoading,
      project: { notice },
      projectLoading,
      activitiesLoading,
      chart: { radarData },
      match,
      location,
      children,
    } = this.props;

    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar size="large" src={currentUser.avatar} />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              《{data.name}》
            </div>
            <div>
            </div>
          </div>
        </div>
      ) : null;

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>项目数</p>
          <p>56</p>
        </div>
        <div className={styles.statItem}>
          <p>团队内排名</p>
          <p>
            8<span> / 24</span>
          </p>
        </div>
        <div className={styles.statItem}>
          <p>项目访问</p>
          <p>2,223</p>
        </div>
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
              extra={<Link to="/">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {notice.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo} />
                          <Link to={item.href}>{item.title}</Link>
                        </div>
                      }
                      description={item.description}
                    />
                    <div className={styles.projectItemContent}>
                      <Link to={item.memberLink}>{item.member || ''}</Link>
                      {item.updatedAt && (
                        <span className={styles.datetime} title={item.updatedAt}>
                          {moment(item.updatedAt).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="通知"
              loading={activitiesLoading}
            >
              <List loading={activitiesLoading} size="large">
                <div className={styles.activitiesList}>{this.renderActivities()}</div>
              </List>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default CourseDetail;
