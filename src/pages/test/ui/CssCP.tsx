import * as React from 'react'
import cs from './cssCP.module.less'

const ImgTs: React.FC = () => {
  return (
    <div className={cs.css_test}>
      <div className={cs.question}>
        <h2>css场景：</h2>
        <div className={cs.question_title}></div>
      </div>
      <div className={cs.title_box}>
        <div className={cs.title}>1. 两边顶宽 中间自适应</div>
        <div className={cs.title_desc}>
          原理：父级顶宽，左右浮动，中间会自适应父级宽度(默认auto)，在设置两端的margin，最好设置z-index避免覆盖
          (其他：flex布局 绝对定位 table布局)
        </div>
        <div className={cs.title_desc}>
          margin、padding不管垂直还是水平方向都相对比父元素的宽度、border-radius则是相对于元素自身
        </div>
        <div className={cs.title_desc}>知识点：1. 浮动 </div>
      </div>
      <div className={cs.test1}>
        <div className={cs.test1_l}>1</div>
        <div className={cs.test1_r}>2</div>
        <div className={cs.test1_c}>3</div>
      </div>
      <div className={cs.space} />
      <div className={cs.title}>2. css width默认auto</div>
      <div className={cs.test2}>
        <div className={cs.test1_c}>3</div>
      </div>
      <div className={cs.space} />
      <div className={cs.title}>3. 盒模型</div>
      <div className={cs.test3}>
        <div className={cs.test3_1}>怪异盒模型 </div>
        <div className={cs.test3_2}>标准盒模型</div>
      </div>

      <div className={cs.space} />
      <div className={cs.question}>
        <h2>css问题：</h2>
        <div className={cs.question_title}>
          1. width:100% (父元素的content = 子元素的content, margin padding
          border会溢出)与 width:auto （父元素的content = 子元素（content +
          padding + border + margin ）的区别:(witdh content的区别)
        </div>
        <div className={cs.question_title}>
          2. box-sizing 盒模型, 标准盒模型（context-box）：实际宽度 = width +
          padding + border ,怪异盒模型(border-box)：实际宽度 = width （padding
          border 会压缩 width的宽度）
        </div>
        <div className={cs.question_title}>3. BFC </div>
        <div className={cs.question_title}>4. 文档流 浮动 清除浮动</div>
        <div className={cs.question_title}>5. px、em、rem、vh、vw、vm</div>
        <div className={cs.question_title}>
          6. 伪类与伪元素 :before 和 ::before (:link visited hover active focus)
        </div>
        <div className={cs.question_title}>7. 隐藏元素的方法有哪些？</div>
        <div className={cs.question_title}>8. 弹性布局</div>
        <div className={cs.question_title}>
          9. 瀑布流：clumn-count/gap flex js
        </div>
        <div className={cs.question_title}>
          10. 响应式布局: @media rem 百分比% vw/vh flex弹性布局
        </div>{' '}
        <div className={cs.question_title}>11. input类型</div>
        <div className={cs.question_title}>
          12. 什么是FOUC?如何避免 Flash Of Unstyled Content
          ：用户定义样式表加载之前浏览器使用默认样式显示文档，用户样式加载渲染之后再从新显示文档，造成页面闪烁。
          解决方法 ：把样式表放到文档的 head
        </div>
        <div className={cs.question_title}>13. link 与 @import 的区别</div>
      </div>
      <div className={cs.space} />

      <div>重叠</div>
      <div className={cs.cd_box}>
        <div className={cs.cd1}></div>
        <div className={cs.cd2}></div>
      </div>
    </div>
  )
}

export default ImgTs
