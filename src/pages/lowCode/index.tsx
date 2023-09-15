import * as React from 'react'
import { Form, Tabs } from 'antd'
import fetch from '@/apis/request'
import { GoBack } from '@/components'
import FormConfig from './components/FormConfig'
import cs from './index.module.less'
const { TabPane } = Tabs
const Test: React.FC = () => {
  const formItems = [
    {
      type: 'input',
      label: 'input',
      name: 'input',
      rules: [{ required: true }],
      maxLength: 5,
    },
    {
      type: 'input',
      label: 'textarea',
      name: 'textarea',
      rules: [{ required: true }],
      maxLength: 5,
      childPops: {
        inputType: 'TextArea',
        autoSize: {
          minRows: 6,
        },
        showCount: true,
      },
    },
    {
      type: 'select',
      label: 'select（单选）',
      name: 'style',
      placeholder: '请选择风格',
      options: [
        {
          value: 'zr',
          label: '自然',
        },
        {
          value: 'xd',
          label: '现代',
        },
        {
          value: 'xxx',
          label: '1111',
        },
      ],
      rules: [{ required: true }],
      childPops: {
        allowClear: true,
        showSearch: true,
        optionFilterProp: 'children',
        filterOption: (input, option) =>
          (option?.children ?? '').toLowerCase().includes(input.toLowerCase()),
      },
    },
    {
      type: 'select',
      label: 'select（多选）',
      name: 'select_d',
      options: [
        {
          value: 'zr',
          label: '自然',
        },
        {
          value: 'xd',
          label: '现代',
        },
        {
          value: 'xxx',
          label: '1111',
        },
      ],
      rules: [{ required: true }],
      childPops: {
        allowClear: true,
        showSearch: true,
        mode: 'multiple',
        optionFilterProp: 'children',
        filterOption: (input, option) =>
          (option?.children ?? '').toLowerCase().includes(input.toLowerCase()),
      },
    },
    {
      type: 'autoCp',
      label: 'autoCp（输入api查询单选）',
      name: 'autoCp',
      options: [
        {
          value: 'zr',
          label: '自然',
        },
        {
          value: 'xd',
          label: '现代',
        },
        {
          value: 'xd222',
          label: '34567',
        },
      ],
    },
    {
      type: 'checkTag',
      label: '标签单选',
      name: 'checkTagone',
      placeholder: '请选择风格',
      mode: 'one',
      options: [
        {
          value: 'fg',
          label: '复古',
        },
        {
          value: 'yl',
          label: '医疗',
        },
        {
          value: 'jz',
          label: '建筑',
        },
      ],
    },
    {
      type: 'checkTag',
      label: '标签多择',
      name: 'checkTag',
      placeholder: '请选择风格',
      options: [
        {
          value: 'fg',
          label: '复古',
        },
        {
          value: 'yd',
          label: '运动',
        },
        {
          value: 'zj',
          label: '宗教',
        },
        {
          value: 'bs',
          label: '表示',
        },
        {
          value: 'kx',
          label: '科学',
        },
        {
          value: 'yl',
          label: '医疗',
        },
        {
          value: 'jz',
          label: '建筑',
        },
      ],
      maxLength: 5,
      rules: [{ required: true }],
    },
    {
      type: 'addTag',
      name: 'addTag',
      label: '标签添加',
      maxLength: 20,
      rules: [{ required: true }],
      childPops: {
        allowClear: true,
      },
    },
    {
      type: 'checkbox',
      name: 'checkbox',
      label: '复选框',
      options: [
        {
          value: 'bs',
          label: '表示',
        },
        {
          value: 'kx',
          label: '科学',
        },
        {
          value: 'yl',
          label: '医疗',
        },
        {
          value: 'jz',
          label: '建筑',
        },
      ],
    },
    {
      type: 'radio',
      name: 'radio',
      label: '单选框',
      options: [
        {
          value: 'bs',
          label: '表示',
        },
        {
          value: 'kx',
          label: '科学',
        },
        {
          value: 'yl',
          label: '医疗',
        },
        {
          value: 'jz',
          label: '建筑',
        },
      ],
      childPops: {
        optionType: 'button',
        buttonStyle: 'solid',
      },
      disabledArry: ['yl'],
    },
    {
      type: 'color',
      label: '风格',
      name: 'color',
      placeholder: '请选择颜色',
      options: [
        {
          value: 'ff0000',
          label: '红色',
        },
        {
          value: '00ff00',
          label: '黄色色',
        },
        {
          value: '0000ff',
          label: '蓝色',
        },
      ],
      maxLength: 2,
      rules: [{ required: true }],
    },
  ]

  const getData = () => {
    fetch
      .fetch({
        url: '/api/v1/access',
        method: 'get',
        params: {
          addPendingPool: {},
        },
      })
      .then((res) => {
        console.log(res)
      })
  }
  const [form] = Form.useForm(null)
  const cancelFetch = () => {
    fetch.cancelToken.removePendingPool({}, 'get$$/api/v1/string')
  }
  return (
    <div className={cs.lowCode_root}>
      <GoBack />
      <div className={cs.lowCode_title}>
        <div className={cs.title}>低代码平台</div>
        <div className={cs.desc}>
          通过配置 平台配置，动态生成平台内容，如：表单配置，表格配置
        </div>
        <div>表单支持：水平 垂直排列</div>
        <div>
          基础表单项：单行输入框,多行输入框,下拉选择(option预置),下拉查询选择（输入关键词，api查询）,单选框(支持
          button Radio)
        </div>
        <div>表单项内容支持：水平 和 垂直排列</div>
        <div>表单项内容支持：点击不可取消 和 点击可取消</div>
      </div>
      <div className={cs.lowCode_container}>
        <Tabs activeKey='form'>
          <TabPane tab={'表单'} key={'form'}>
            <div className={cs.lowCode_form}>
              <FormConfig
                className={cs.form_code}
                form={form}
                formItems={formItems}
                initialValues={{ select_d: ['xd'] }}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default Test
