import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'

export default ({ icon, label, nav, navClass }) => (
  <Menu.Item onClick={(e, data) => nav(e, data, icon)} className={navClass} name={icon}>
    <Icon name={icon} />
    {label}
  </Menu.Item>
)
