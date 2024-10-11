export class ReviewService {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  createReview = async (storeId,comment, rate) => {
    // const review = await this.reviewRepository.findReviewByUserIdStoreId(userId, storeId);
    // if (review) {
    //   throw new Error('이미 리뷰를 작성하셨습니다.');
    // }

    const createdReview = await this.reviewRepository.createReview(storeId,comment, rate);
a
    return {
      reviewId: createdReview.reviewId,
      storeId : createdReview.storeId,
      comment: createdReview.comment,
      rate: createdReview.rate,
      order :createdReview.order,
      createdAt: createdReview.createdAt,
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
