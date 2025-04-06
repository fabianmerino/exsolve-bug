import { createEventHandler } from '@zenstackhq/server/nuxt'
import { enhance } from '@zenstackhq/runtime'
import { prisma } from '~~/lib/prisma'

export default createEventHandler({
  getPrisma: async (event) => {
    // mock session for demo
    const session = {
      user: {
        id: 'user-id',
        name: 'User Name'
      }
    }
    return enhance(prisma, { user: session.user})
  }
})
