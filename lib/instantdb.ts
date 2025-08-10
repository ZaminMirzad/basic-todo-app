import { init, i } from '@instantdb/react'

// Schema definition for our todo app
const schema = i.schema({
  entities: {
    todos: i.entity({
      title: i.string(),
      category: i.string(),
      priority: i.string(),
      dueDate: i.string(),
      completed: i.boolean(),
      createdAt: i.number(),
      userId: i.string().indexed(),
    })
  }
})

// Initialize InstantDB
export const db = init({
  appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID!,
  schema,
})


