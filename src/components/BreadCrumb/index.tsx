import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import style from './index.module.less'
export default function BreadCrumb({ RouterMapAuth }: any) {
  const { pathname } = useLocation()
  //   const { t } = useTranslation()
  const [breadCrumb, setBreadCrumb] = useState<any[]>([])
  const routes =
    RouterMapAuth.find((menu) => menu.menu)?.children.filter(
      (item) => !item.hidden,
    ) || []
  let routesParents: any[] = [] // 隐藏起来的路由（可以利用他们的title属性设置面包屑）

  useEffect(() => {
    routesParents = handleFlattenRoutes(
      RouterMapAuth.find((menu) => menu.menu)?.children,
    ).filter(
      (item) => item, //item.hidden
    )

    const path = pathname.slice(pathname.lastIndexOf('/') + 1)
    handleGetBreadcrumb(handleFlattenRoutes(routes), path)
  }, [pathname])

  const handleFlattenRoutes = (routes: any[]) => {
    return routes.reduce((pre, next) => {
      return pre.concat(
        Array.isArray(next.children)
          ? handleFlattenRoutes(next.children)
          : next,
      )
    }, [])
  }

  const handleGetBreadcrumb = (routes: any[], path: string) => {
    let arr = []
    let breadPath = [] // 面包屑需要跳转的地址
    routes.map((item) => {
      if (item.path === path) {
        if (item.parentpath === '/') {
          setBreadCrumb([{ title: item.title }])
        } else {
          // 当为三级及以上菜单时，需要给面包屑的第二级加上跳转功能
          const parentpath = item.parentpath.split('/').filter((item) => item)
          parentpath.map((item, index) => {
            routesParents.map((item2) => {
              if (item === item2.path) {
                if (index < parentpath.length - 1) {
                  // 除了最后一项 其他的都需要把path存进去
                  breadPath.push(item2.path)
                }
                if (parentpath.length >= 2 && index !== 0) {
                  // 说明时三级及以上的菜单层级
                  // 不给面包屑的第一个层级加跳转功能
                  arr.push({ title: item2.title, path: breadPath[index - 1] })
                } else {
                  arr.push({ title: item2.title })
                }
              }
            })
          })
          arr.push({ title: item.title })
          setBreadCrumb(arr)
        }
      }
    })
  }

  return (
    <div className={style['breadCrumb']}>
      {breadCrumb.map((item) => (
        <div className={style['breadCrumb-item']} key={item.title}>
          {item.path ? (
            <NavLink to={item.path}>{item.title}</NavLink>
          ) : (
            <div className={style['breadCrumb-item-label']}>{item.title}</div>
          )}
        </div>
      ))}
    </div>
  )
}
