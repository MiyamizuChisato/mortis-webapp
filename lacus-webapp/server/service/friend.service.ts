export type FriendList = Awaited<ReturnType<typeof friendService.getFriendList>>
export const friendService = {
  getFriendList: async () => {
    return await db.query.friendCategory.findMany({
      with: {
        friends: {
          where({ passed }, { eq }) {
            return eq(passed, true)
          },
        },
      },
    })
  },
}
