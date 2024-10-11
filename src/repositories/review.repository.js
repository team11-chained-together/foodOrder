export class ReviewRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

<<<<<<< HEAD
  //   findReviewByUserIdStoreId = async (userId, storeId) => {
  //     const findReviewByUserIdStoreId = await this.prisma.review.findfirst({
  //       where: {
  //         userId: +userId,
  //         storeId: +storeId,
  //       },
  //     });
  //     return findReviewByUserIdStoreId;
  //   };
  //리뷰 작성 (생성)
  creatReview = async (storeId, comment, rate) => {
=======
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
>>>>>>> dev
    const createdReview = await this.prisma.review.create({
      where:{
        storeId:+storeId,
      },
      data: {
        storeId,
        comment,
        rate,
      },
    });
    return createdReview;
  };
  findByUserId = async(userId)=>{
    const findByUserId = await this.prisma.findFirst({
      where:{userId : +userId},
    });
    return findByUserId;
  }

    updateReview = async (reviewId, comment, rate) => {
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
