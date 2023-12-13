import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom'
// import style from './index.module.less'

const iconList = {}

interface IMenu {
  routers: any
}
const LocalMenu = ({ routers }: IMenu) => {
  const location = useLocation()
  const navigate = useNavigate()

  const [isInit, setIsInit] = useState(false)

  // items 菜单内容 ItemType[]
  const [items, setitems] = useState([])
  // defaultSelectedKeys 初始选中的菜单项 key 数组
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([])
  // defaultOpenKeys 初始展开的 SubMenu 菜单项 key 数组
  const [defaultOpenKeys, setDefaultOpenKeys] = useState([])
  // submenu keys of first level
  const [rootSubmenuKeys, setrootSubmenuKeys] = useState([])
  // submenu keys of first level
  const [activeSubmenuKeys, setActiveSubmenuKeys] = useState([])
  // openKeys 当前展开的 SubMenu 菜单项 key 数组
  const [openKeys, setOpenKeys] = useState([])
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  useEffect(() => {
    async function fetchData() {
      const menusListData = routers.find((menu) => menu.menu)?.children || []
      let tempItems = [],
        rootSubmenuKeys = [] // submenu keys of first level
      menusListData.forEach((item) => {
        item.isRoot && rootSubmenuKeys.push(item.path)
        item.menu &&
          tempItems.push({
            label: item.title,
            key: item.path,
            icon: iconList[item.path],
            children:
              item.children &&
              item.children.length > 0 &&
              item.children.map((child) => {
                if (child.menu) {
                  return {
                    label: child.title,
                    key: child.path,
                    icon: iconList[item.path],
                    children:
                      child.children &&
                      child.children.length > 0 &&
                      child.children.map((sun) => {
                        if (child.menu) {
                          return {
                            label: sun.title,
                            key: sun.path,
                            icon: iconList[item.path],
                          }
                        }
                      }),
                  }
                }
              }),
          })
      })

      setitems(tempItems)
      setrootSubmenuKeys(rootSubmenuKeys)
    }

    fetchData()
  }, [routers])

  useEffect(() => {
    const routes = matchRoutes(routers, location.pathname) // 返回匹配到的路由数组对象，每一个对象都是一个路由对象
    const pathArr = []
    if (routes !== null) {
      routes.forEach((item) => {
        const path = item.pathname
        if (path) {
          pathArr.push(path)
        }
      })
    }
    setDefaultSelectedKeys(pathArr)
    setDefaultOpenKeys(pathArr)
    setActiveSubmenuKeys(pathArr)
    onOpenChange?.(pathArr || [])
    setIsInit(true)
  }, [location.pathname])

  if (!isInit) {
    return null
  }

  const onClick = (e) => {
    navigate(e.key)
  }

  return (
    <>
      <Menu
        mode='inline'
        // mode='horizontal'
        defaultSelectedKeys={defaultSelectedKeys} //  初始选中的菜单项 key 数组  string[]
        defaultOpenKeys={defaultOpenKeys} // 初始展开的 SubMenu 菜单项 key 数组
        openKeys={openKeys} // openKeys  当前展开的 SubMenu 菜单项 key 数组
        onOpenChange={onOpenChange} //onOpenChange SubMenu 展开/关闭的回调
        selectedKeys={activeSubmenuKeys}
        onClick={onClick}
        style={{
          height: '100%',
          borderRight: 0,
        }}
        items={items}></Menu>
    </>
  )
}
export default LocalMenu
