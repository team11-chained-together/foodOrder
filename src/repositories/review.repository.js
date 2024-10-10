export class ReviewRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  //리뷰 작성 (생성)
  creatReview = async (userId, comment, rate) => {
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
  updateReveiw = async (reviewId, comment, rate) => {
    const updatedReview = await this.prisma;
  };

  //리뷰 삭제
}
