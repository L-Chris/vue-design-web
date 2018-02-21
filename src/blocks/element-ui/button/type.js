import {toProps} from '@/utils'

export const setting = {
  key: 'el-button',
  name: 'el-button',
  config: [
    {
      name: 'Layout',
      children: [
        {
          type: 'box-editor'
        }
      ]
    },
    {
      name: 'Style',
      children: [
        {
          key: 'text',
          label: 'text',
          type: String,
          inputType: 'input',
          default: 'button'
        },
        {
          key: 'size',
          label: 'size',
          type: String,
          inputType: 'select',
          default: 'medium',
          data: [
            { value: 'medium', label: 'medium' },
            { value: 'small', label: 'small' },
            { value: 'mini', label: 'mini' }
          ]
        },
        {
          key: 'type',
          label: 'type',
          type: String,
          inputType: 'select',
          default: '',
          data: [
            { value: 'primary', label: 'primary' },
            { value: 'success', label: 'success' },
            { value: 'warning', label: 'warning' },
            { value: 'danger', label: 'danger' },
            { value: 'info', label: 'info' },
            { value: 'text', label: 'text' }
          ]
        },
        {
          key: 'loading',
          label: 'loading',
          type: Boolean,
          inputType: 'switch',
          default: false
        }
      ]
    }
  ],
  events: [
    {
      type: 'click',
      key: 'click'
    }
  ]
}

export let props = toProps(setting)
