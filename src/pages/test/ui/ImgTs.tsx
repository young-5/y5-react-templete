import * as React from 'react'
import { useRef, useEffect, useState } from 'react'
import { Tabs } from 'antd'
import cs from './index.module.less'
import { LazyList, PicList, Img, HPlic } from '@/components'
import useLazyLoad from '@/hooks/useLazyLoad'
import cl from 'classnames'
import img1 from '../assets/1.png'
import img2 from '../assets/2.png'
import img3 from '../assets/3.png'
import img5 from '../assets/5.png'
import zw from '../assets/zw.jpg'
const { TabPane } = Tabs
const ImgTs: React.FC = () => {
  const domRef = useRef<any>(null)
  const imgRef = useRef<any>([])
  const imgBoxRef = useRef<any>([])
  const [activeTab, setActiveTab] = useState('img4')
  let imgS = [
    {
      imageId: 1,
      name: '1',
      src: img1,
    },
    {
      imageId: 2,
      name: '2',
      src: img2,
    },
    {
      imageId: 3,
      name: '3',
      src: img3,
    },
  ]
  const { init } = useLazyLoad({
    srollRef: domRef.current,
    imgList: imgS,
    throttle: 200,
    domList: imgRef.current,
  })

  useEffect(() => {
    activeTab === 'img1' && init()
  }, [domRef.current, activeTab])
  return (
    <div className={cs.test}>
      <Tabs
        activeKey={activeTab}
        destroyInactiveTabPane
        onChange={(v: any) => {
          setActiveTab(v)
        }}>
        <TabPane tab={'图片显示'} key={'img5'}>
          <div className={cs.tab7}>
            <div
              className={cl(cs.tab7_box1, cs.tab7_box)}
              ref={(el) => (imgBoxRef.current[0] = el)}>
              <Img
                src={img1}
                isAdaption
                boxRef={() => {
                  return imgBoxRef?.current[0]
                }}
              />
            </div>
            <div className={cl(cs.tab7_box)}>
              <div className={cl(cs.tab7_box2)}>
                <Img src={img1} isAdaption />
              </div>
            </div>
            <div className={cl(cs.tab7_box)}>
              <div className={cs.tab7_box3}>
                <Img src={img1} isAdaption boxRate={1 / 4} />
              </div>
            </div>
            <div className={cl(cs.tab7_box)}>
              <div className={cs.tab7_box4}>
                <Img src={img1} isAdaption />
              </div>
            </div>
            <div>竖图</div>
            <div className={cl(cs.tab7_box)}>
              <div className={cs.tab7_box5}>
                <Img src={img5} isAdaption boxRate={1 / 4} />
              </div>
            </div>
            <div className={cl(cs.tab7_box)}>
              <div className={cs.tab7_box6}>
                <Img src={img5} isAdaption boxRate={4} />
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab={'图片懒加载'} key={'img1'}>
          <div
            ref={(el) => (domRef.current = el)}
            className={cl(cs.lazy_img_box)}>
            {imgS.map((v: any, i: number) => {
              return (
                <img
                  key={i}
                  ref={(el) => (imgRef.current[i] = el)}
                  data-src={v.src}
                  className={cl(cs.img_3, 'lazy_img_3')}
                  src={zw}
                />
              )
            })}
          </div>
        </TabPane>
        <TabPane tab={'图片分批加载'} key={'img2'}>
          <LazyList
            imgList={imgS}
            maxLoadindNum={1}
            render={(item: any, index: number, imgRef: any) => {
              return (
                <img
                  key={item.imageId || index}
                  ref={(el) => (imgRef[index] = el)}
                  data-src={item.src}
                  className={cs.img_4}
                  src={zw}
                />
              )
            }}
          />
        </TabPane>
        <TabPane tab={'css瀑布流'} key={'img3'}>
          <PicList
            list={[
              ...imgS,
              ...imgS,
              ...imgS,
              ...imgS,
              ...imgS,
              ...imgS,
              {
                imageId: 21,
                name: '21',
                src: zw,
              },
              {
                imageId: 211,
                name: '211',
                src: img5,
              },
            ]}
            render={() => {}}
          />
        </TabPane>
        <TabPane tab={'js瀑布流'} key={'img4'}>
          <HPlic
            render={{ isChildren: true }}
            id={'pHPlic'}
            width={300}
            imgClassName={'imglist_item_box'}>
            <div className={cs.pHPlic}>
              <div id='pHPlic' className={cs.imglist_box}>
                {[
                  ...imgS,
                  ...imgS,
                  ...imgS,
                  ...imgS,
                  ...imgS,
                  ...imgS,
                  {
                    imageId: 21,
                    name: '21',
                    src: zw,
                  },
                  {
                    imageId: 211,
                    name: '211',
                    src: img5,
                  },
                ]?.map((v: any, i: number) => {
                  return (
                    <div
                      key={i}
                      className={cl(cs.imglist_item_box, 'imglist_item_box')}>
                      <div className={cs.list_item}>
                        <img src={v.src} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </HPlic>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ImgTs
