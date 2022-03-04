import React, { useContext, useEffect } from 'react'
import { Tooltip, Avatar, Select, Dropdown, Menu, Message, Button } from '@arco-design/web-react'
import {
  IconLanguage,
  IconSunFill,
  IconMoonFill,
  IconSettings,
} from '@arco-design/web-react/icon'
import { useSelector, useDispatch } from 'react-redux'
import { GlobalState } from '@/store'
import { GlobalContext } from '@/context'
import useLocale from '@/utils/useLocale'
import Logo from '@/assets/logo.svg'
import IconButton from './IconButton'
import Settings from '../Settings'
import styles from './style/index.module.less'
import defaultLocale from '@/locale'
import useStorage from '@/utils/useStorage'
import { generatePermission } from '@/routes'

function Navbar({ show }: { show: boolean }) {
  const t = useLocale()
  const userInfo = useSelector((state: GlobalState) => state.userInfo)
  const dispatch = useDispatch()

  const [_, setUserStatus] = useStorage('userStatus')
  const [role, setRole] = useStorage('userRole', 'admin')

  const { setLang, lang, theme, setTheme } = useContext(GlobalContext)

  function logout() {
    setUserStatus('logout')
    window.location.href = '/admin/login'
  }

  function onMenuItemClick(key) {
    if (key === 'logout') {
      logout()
    } else {
      Message.info(`You clicked ${key}`)
    }
  }

  useEffect(() => {
    dispatch({
      type: 'update-userInfo',
      payload: {
        userInfo: {
          ...userInfo,
          permissions: generatePermission(role),
        },
      },
    })
  }, [role])

  if (!show) {
    return (
      <div className={styles['fixed-settings']}>
        <Settings trigger={<Button icon={<IconSettings />} type="primary" size="large" />} />
      </div>
    )
  }

  const droplist = (
    <Menu onClickMenuItem={onMenuItemClick}>
      <Menu.Item key="switch role">发布文章</Menu.Item>
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  )

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Logo />
          <div className={styles['logo-name']}>博客后台管理系统</div>
        </div>
      </div>
      <ul className={styles.right}>
        <li>
          <Select
            triggerElement={<IconButton icon={<IconLanguage />} />}
            options={[
              { label: '中文', value: 'zh-CN' },
              { label: 'English', value: 'en-US' },
            ]}
            value={lang}
            triggerProps={{
              autoAlignPopupWidth: false,
              autoAlignPopupMinWidth: true,
              position: 'br',
            }}
            trigger="hover"
            onChange={value => {
              setLang(value)
              const nextLang = defaultLocale[value]
              Message.info(`${nextLang['message.lang.tips']}${value}`)
            }}
          />
        </li>
        <li>
          <Tooltip content={theme === 'light' ? t['settings.navbar.theme.toDark'] : t['settings.navbar.theme.toLight']}>
            <IconButton
              icon={theme !== 'dark' ? <IconMoonFill /> : <IconSunFill />}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
          </Tooltip>
        </li>
        <Settings />
        {userInfo && (
          <li>
            <Dropdown droplist={droplist} position="br">
              <Avatar size={32} style={{ cursor: 'pointer' }}>
                <img alt="avatar" src={userInfo.avatar} />
              </Avatar>
            </Dropdown>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Navbar
