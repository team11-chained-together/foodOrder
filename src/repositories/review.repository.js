export class ReviewRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

    findReviewByUserIdStoreId = async (userId, storeId) => {
      const findReviewByUserIdStoreId = await this.prisma.review.findFirst({
        where: {
          userId: +userId,
          storeId: +storeId,
        },
      });
      return findReviewByUserIdStoreId;
    };

  createReview = async (storeId,comment, rate) => {
    const createdReview = await this.prisma.review.create({
      where:{
        storeId:+storeId,
      },
      data: {
        comment,
        rate,
      },
    });
    return createdReview;
  };
  findByuserId = async(userId)=>{
    const findByuserId = await this.prisma.findFirst({
      where:{userId : +userId},
    });
    return findByuserId;
  }

    updateReveiw = async (reviewId, comment, rate) => {
      const updatedReview = await this.prisma.review.update({
        where: {
          reviewId: +reviewId,
        },
        data: {
          comment,
          rate,
        },
      });
      return updatedReview;
    };
    
    findReviewById = async(reviewId)=>{
      const findReviewById = await this.prisma.review.findFirst({
        where:{
          reviewId: +reviewId,
        }
      })
      return findReviewById;
    }
    
    deleteReview = async (userId,reviewId) => {
      const deleteReview = await this.prisma.review.delete({
        where: {
          userId:+userId,
          reviewId: +reviewId,
        },
      });
      return deleteReview;
    };
}
