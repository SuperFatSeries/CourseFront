import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Skeleton,Card, Button, Icon, List } from 'antd';
import Link from 'umi/link';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './CourseList.less';

@connect(({ course, loading }) => ({
  course,
  loading: loading.models.course,
}))
class CourseList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    

    /*
    dispatch({
      type: 'course/fetch',
      payload: {
        count: 8,
      },
    });*/
    dispatch({
      type: 'course/queryCourseList',
      payload: {
        page: 0,
        size: 10
      },
    });
  }

  render() {
    const {
      course: { list },
      loading,
    } = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
        &nbsp;
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
            快速开始
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
            产品简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
            产品文档
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );
        //title={<a href={'course/'+item.id}>{item.name}</a>}
    return (
      <PageHeaderWrapper title="课程列表" content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item =>
              item ? (
                <List.Item key={item.id}>
                  <Skeleton loading={loading} active>
                  <Card hoverable className={styles.card} actions={[<a>课件</a>, <a>作业</a>]}>
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src="" />}
                      title={<Link to={'course/'+item.id}>{item.name}</Link>}
                      description={
                        <Ellipsis className={styles.item} lines={3}>
                        授课老师：{item.teacher_name}<br />
                        上课时间：{item.period}<br />
                        </Ellipsis>
                      }
                    />
                  </Card>
                  </Skeleton>
                </List.Item>
              ) : (
                <div>
                </div>
              )
            }
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default CourseList;
