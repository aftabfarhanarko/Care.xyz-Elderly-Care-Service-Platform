import { getHomePageReviews } from "@/actions/serverData/getData";
import CaregiverReview from "@/components/reviews/CaregiverReview";
import ServicesReview from "@/components/reviews/ServicesReview";
import React from "react";

const Reviewspage = async () => {
  const review = await getHomePageReviews();
  console.log(review);

  return (
    <div>
      Review
      <section>
        <ServicesReview></ServicesReview>
      </section>
      <section>
        <CaregiverReview></CaregiverReview>
      </section>
    </div>
  );
};

export default Reviewspage;
// caregiverReviews
// : 
// (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
// serviceReviews
// : 
// (5) [{…}, {…}, {…}, {…}, {…}]
// [[Prototype]]
// : 
// Object
