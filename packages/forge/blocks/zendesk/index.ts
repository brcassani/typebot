import { createBlock } from '@typebot.io/forge'
import { ZendeskLogo } from './logo'
import { auth } from './auth'
import { authenticateMessagingUser } from './actions/authenticateMessagingUser'
import { openWebWidget } from './actions/openWebWidget'

export const zendeskBlock = createBlock({
  id: 'zendesk',
  name: 'Zendesk',
  tags: ['live chat', 'crm'],
  LightLogo: ZendeskLogo,
  auth,
  actions: [authenticateMessagingUser, openWebWidget],
})
