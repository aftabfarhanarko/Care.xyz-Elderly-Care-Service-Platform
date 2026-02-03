import { getHomePageReviews } from "@/actions/serverData/getData";
import CaregiverReview from "@/components/reviews/CaregiverReview";
import ServicesReview from "@/components/reviews/ServicesReview";
import React from "react";

const Reviewspage = async () => {
  const { serviceReviews = [], caregiverReviews = [] } =
    await getHomePageReviews();
    console.log(serviceReviews);
    

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Main Page Header */}
      <section className="bg-white pt-32 pb-16 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-rose-600 font-bold tracking-widest uppercase text-sm mb-3 block">
            Testimonials
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
            What Our Community{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600">
              Says
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Read genuine stories and experiences from families and caregivers in
            our community.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 mt-16">
        {/* Service Reviews Section */}
        <section>
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Service Experiences
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-rose-600 to-purple-600 rounded-full mx-auto md:mx-0"></div>
          </div>
          <ServicesReview reviews={serviceReviews} />
        </section>

        {/* Caregiver Reviews Section */}
        <section>
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Caregiver Feedback
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-rose-600 to-purple-600 rounded-full mx-auto md:mx-0"></div>
          </div>
          <CaregiverReview reviews={caregiverReviews} />
        </section>
      </div>
    </div>
  );
};

export default Reviewspage;
