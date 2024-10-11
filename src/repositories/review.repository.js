export class ReviewRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  //리뷰 작성 (생성)
  createReview = async (userId, comment, rate) => {
    const createdReview = await this.prisma.review.create({
      data: {
        userId: +userId,
        storeId: +storeId,
        comment,
        rate,
      },
    });
    return createdReview;
  };

  //리뷰 수정
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
  //리뷰 삭제
  deleteReview = async (reviewId) => {
    const deleteReview = await this.prisma.review.delete({
      where: {
        reviewId: +reviewId,
      },
    });
    return deleteReview;
  };
}
