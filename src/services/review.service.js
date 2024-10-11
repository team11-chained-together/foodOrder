export class ReviewService {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  //리뷰 작성 (생성)
  createReview = async (storeId, comment, rate) => {
    // const review = await this.reviewRepository.findReviewByUserIdStoreId(userId, storeId);
    // if (review) {
    //   throw new Error('이미 리뷰를 작성하셨습니다.');
    // }

    const createReview = await this.reviewRepository.createReview(storeId, comment, rate);

    return {
      reviewId: createReview.reviewId,
      storeId: createReview.storeId,
      comment: createReview.comment,
      rate: createReview.rate,
      createdAt: createReview.createdAt,
    };
  };

  // //리뷰 수정
  // updateReview = async(userId,reviewId,comment,rate)=>{
  //     const review = await this.reviewRepository.findReviewById(reviewId);
  //     if(!review){
  //         throw new Error('리뷰를 수정할 수 없습니다');
  //     }
  //     await this.reviewRepository.updatedReview(userId,reviewId,comment,rate);

  //     const updateReveiw = await this.reviewRepository.findReviewById(reviewId);

  //     return{
  //         reviewId:updateReveiw.reviewId,
  //         userId:updateReveiw.userId,
  //         storeId:updateReveiw.storeId,
  //         comment:updateReveiw.comment,
  //         rate:updateReveiw.rate,
  //         createdAt:updateReveiw.createdAt,
  //         updatedAt:updateReveiw.updatedAt,
  //     };
  // };

  // //리뷰 삭제
  // deleteReview = async(userId,reviewId) =>{
  //     const review = await this.reviewRepository.findReviewById(reviewId);

  //     //리뷰가 존재하는지 + 리뷰 작성자가 본인이 맞는지 확인
  //     if(!review||review.userId!==userId){
  //         throw new Error('리뷰를 삭제할 수 없습니다');
  //     }

  //     await this.reviewRepository.deleteReview(userId,reviewId);

  //     return{
  //         reviewId:review.reviewId,
  //         storeId:review.storeId,
  //         comment:review.comment,
  //     };
  // };
}
