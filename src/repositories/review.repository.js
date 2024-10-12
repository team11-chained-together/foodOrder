export class ReviewRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  //TODO: 해당하는 statement 값만 가져오기
  findOrderDataByUserId = async (userId, storeId) => {
    const orderData = await this.prisma.order.findFirst({
      where: { userId: userId, storeId: storeId },
      // select: { statement: 'DELIVERY_COMPLETE' },
    });

    return orderData;
  };

  findReviewDataByUserId = async (userId) => {
    const reviewData = await this.prisma.review.findFirst({
      where: { userId: userId },
    });

    return reviewData;
  };

  findReviewData = async (storeId) => {
    const getReviewData = await this.prisma.review.findMany({
      where: { storeId: storeId },
    });
    return getReviewData;
  };

  findMyReviewData = async (userId) => {
    const getMyReviewData = await this.prisma.review.findMany({
      where: { userId: userId },
    });
    return getMyReviewData;
  };

  createReview = async (userId, storeId, comment, rate) => {
    const createdReview = await this.prisma.review.create({
      data: {
        userId,
        storeId,
        comment,
        rate,
      },
    });
    return createdReview;
  };

  updateReview = async (reviewId, comment, rate) => {
    const updatedReview = await this.prisma.review.update({
      where: {
        reviewId: reviewId,
      },
      data: {
        comment,
        rate,
      },
    });
    return updatedReview;
  };

  deleteReview = async (userId, reviewId) => {
    const deleteReview = await this.prisma.review.delete({
      where: {
        userId: +userId,
        reviewId: +reviewId,
      },
    });
    return deleteReview;
  };
}
