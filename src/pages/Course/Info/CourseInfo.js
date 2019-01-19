import React, { PureComponent } from 'react';
import { Skeleton,List, Card, Icon, Dropdown, Menu, Avatar, Tooltip } from 'antd';
import numeral from 'numeral';
import { connect } from 'dva';
import { formatWan } from '@/utils/utils';
import stylesApplications from './CourseInfo.less';
import {  MarkdownPreview  } from 'react-marked-markdown';

@connect(({ course,list,loading }) => ({
  course,
  list,
  loading: loading.models.course,
}))
class CourseInfo extends PureComponent {
  render() {
    const {
      course: { data },
      list: { list },
      loading,
    } = this.props;
    const itemMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            3d menu item
          </a>
        </Menu.Item>
      </Menu>
    );
    const CardInfo = ({ activeUser, newUser }) => (
      <div className={stylesApplications.cardInfo}>
        <div>
          <p>活跃用户</p>
          <p>{activeUser}</p>
        </div>
        <div>
          <p>新增用户</p>
          <p>{newUser}</p>
        </div>
      </div>
    );
    return (
      <div>
      <Skeleton loading={loading} active>
        <MarkdownPreview value={ data.info }/>
      </Skeleton>
      </div>
    );
  }
}

export default CourseInfo;