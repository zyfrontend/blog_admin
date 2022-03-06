import { Card, Typography } from '@arco-design/web-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { ReducerState } from '../../redux';
import useLocale from '../../utils/useLocale';
import styles from './style/index.module.less';

export default function Welcome() {
  const locale = useLocale();
  const userInfo = useSelector((state: ReducerState) => state.global.userInfo) || {};
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography.Title heading={5} style={{ marginTop: 0 }}>
          {locale['welcome.title.welcome']}
        </Typography.Title>
        <Typography.Text type="secondary">
          {userInfo.name}, {userInfo.email}
        </Typography.Text>
      </div>
      <div className={styles.content}>
        <Card style={{ marginTop: 20 }} bordered={false} title={locale['welcome.usage']}>
          <h1>依赖安装</h1>
          <p>yarn</p>
          <h1>运行</h1>
          <p>yarn dev</p>
          <h1>技术栈</h1>
          <ul>
            <li>React</li>
            <li>TypeScript</li>
            <li>axios</li>
            <li>ArcoDesign</li>
          </ul>
          <h1>实现功能</h1>
          <ul>
            <li>鉴权登录</li>
            <li>markdown解析</li>
            <li>模糊搜索</li>
            <li>图片上传</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
