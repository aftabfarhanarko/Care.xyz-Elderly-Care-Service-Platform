"use server";

import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/databaseConnect";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

export const caregiverDataSaved = async (data) => {
  // console.log("Crakdf", data);
  const result = await dbConnect(collections.BOOKINGCAREGIVERS).insertOne(data);
  return result;
};

export const caregiverSingleData = async (query) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return null;
    }

    // Create a flexible query for caregiverId to match either String or ObjectId
    let caregiverIdCondition = { caregiverId: query.caregiverId };
    if (query.caregiverId && ObjectId.isValid(query.caregiverId)) {
      caregiverIdCondition = {
        $or: [
          { caregiverId: query.caregiverId },
          { caregiverId: new ObjectId(query.caregiverId) },
        ],
      };
    }

    const myQuery = {
      ...caregiverIdCondition,
      bookerEmail: session?.user?.email,
    };

    const result = await dbConnect(collections.BOOKINGCAREGIVERS).findOne(
      myQuery,
    );
    if (result) {
      return {
        _id: result._id.toString(),
      };
    }
    return null;
  } catch (error) {
    // console.error("Error fetching single booking data:", error);
    return error;
  }
};

export const saveCaregiverReview = async (data) => {
  const result = await dbConnect(collections.REVIEWCAREGIVERS).insertOne(data);
  return { insertedId: result.insertedId.toString() };
};

export const getCaregiverReviews = async (caregiverId) => {
  try {
    // Create a flexible query for caregiverId to match either String or ObjectId
    let caregiverIdCondition = { caregiverId: caregiverId };
    if (caregiverId && ObjectId.isValid(caregiverId)) {
      caregiverIdCondition = {
        $or: [
          { caregiverId: caregiverId },
          { caregiverId: new ObjectId(caregiverId) },
        ],
      };
    }

    const result = await dbConnect(collections.REVIEWCAREGIVERS)
      .find(caregiverIdCondition)
      .sort({ createdAt: -1 })
      .toArray();

    return result.map((review) => ({
      ...review,
      _id: review._id.toString(),
    }));
  } catch (error) {
    // console.error("Error fetching reviews:", error);
    return [];
  }
};
