export class ReviewRepository {
  constructor(prisma, Prisma) {
    this.prisma = prisma;
    this.Prisma = Prisma;
  }

  findOrderDataByOrderId = async (orderId) => {
    const orderData = await this.prisma.order.findFirst({
      where: { orderId: orderId },
    });

    return orderData;
  };

  findReviewDataByReviewId = async (reviewId) => {
    const reviewData = await this.prisma.review.findFirst({
      where: { reviewId: reviewId },
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

  createReview = async (userId, storeId, comment, rate, orderId) => {
    const createdReview = await this.prisma.review.create({
      data: {
        userId: userId,
        storeId: storeId,
        orderId: orderId,
        comment: comment,
        rate: rate,
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

  deleteReview = async (reviewId) => {
    const deleteReview = await this.prisma.review.delete({
      where: {
        reviewId: reviewId,
      },
    });
    return deleteReview;
  };
}
