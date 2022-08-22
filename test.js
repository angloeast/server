const client = require('@prisma/client');
const prisma = new client.PrismaClient();
const main = async () => {
  try {
    // const res = await prisma.issue.findMany({
    //   select: {
    //     issueNumber: true,
    //   },
    //   orderBy: {
    //     createdAt: 'desc',
    //   },
    //   take: 1,
    // });
    

    const res = await prisma.issue.findAndModify({
      query: { _id: "UNIQUE COUNT DOCUMENT IDENTIFIER" },
      update: {
        $inc: { COUNT: seq_increment },
      },
      writeConcern: 'majority'
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

main();
