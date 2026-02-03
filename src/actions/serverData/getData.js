"use server";

import { collections, dbConnect } from "@/lib/databaseConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const getServerData = async (query) => {
  const page = parseInt(query?.page) || 1;
  const limit = parseInt(query?.limit) || 6;
  const search = query?.search || "";
  const sort = query?.sort || "";

  const skip = (page - 1) * limit;

  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  let sortOptions = {};
  if (sort === "price_asc") {
    sortOptions = { priceVal: 1 };
  } else if (sort === "price_desc") {
    sortOptions = { priceVal: -1 };
  }

  const collection = dbConnect(collections.SERVICES);
  const totalCount = await collection.countDocuments(filter);
  const data = await collection
    .find(filter)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .toArray();

  // Convert each item's id to string (assuming _id is ObjectId)
  const services = data.map((item) => ({
    ...item,
    id: item.id ? String(item.id) : undefined, // if you use custom id
    _id: item._id ? item._id.toString() : undefined, // if you use MongoDB ObjectId
  }));

  return { services, totalCount };
};

export const getSingleServices = async (id) => {
  try {
    const data = await dbConnect(collections.SERVICES).findOne({
      _id: new ObjectId(id),
    });
    if (data) {
      data._id = data._id.toString();
    }
    return data;
  } catch (error) {
    console.error("Error fetching single service:", error);
    return null;
  }
};

export const getAllServices = async () => {
  const collection = dbConnect(collections.SERVICES);
  const data = await collection.find({}).toArray();

  return data.map((item) => ({
    ...item,
    id: item._id ? item._id.toString() : undefined,
    _id: item._id ? item._id.toString() : undefined,
  }));
};

// caregivers Data

export const getcaregiversData = async () => {
  const data = await dbConnect(collections.CAREGIVERS).find().toArray();
  return data.map((item) => ({
    ...item,
    id: item._id ? item._id.toString() : undefined,
    _id: item._id ? item._id.toString() : undefined,
  }));
};

export const getSingleCaregiver = async (id) => {
  const query = { _id: new ObjectId(id) };
  const data = await dbConnect(collections.CAREGIVERS).findOne(query);
  if (data) {
    data._id = data._id.toString();
  }
  return data;
};

// From Data Saved DB

export const fromDataSaved = async (formData) => {
  const dataWithDate = {
    ...formData,
    createdAt: new Date().toISOString(),
  };
  const result = await dbConnect(collections.FROMDATA).insertOne(dataWithDate);
  console.log("Data", result);

  return {
    acknowledged: result.acknowledged,
    insertedId: result.insertedId.toString(),
  };
};

export const getMessagesData = async (
  page = 1,
  limit = 6,
  search = "",
  filter = "All",
) => {
  try {
    const skip = (page - 1) * limit;
    const collection = dbConnect(collections.FROMDATA);

    const query = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (filter && filter !== "All") {
      query.serviceType = filter;
    }

    const totalCount = await collection.countDocuments(query);

    const data = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const messages = data.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

    return { messages, totalCount };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { messages: [], totalCount: 0 };
  }
};

// All Bookings Data Saved One Services
export const savedServicesData = async (bookingData) => {
  const totalBooking = { ...bookingData, createdAt: new Date().toISOString() };
  const result = await dbConnect(collections.BOOKING).insertOne(totalBooking);
  return {
    acknowledged: result.acknowledged,
    insertedId: result.insertedId.toString(),
  };
};

export const singleData = async (query) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return null;
    }
    console.log("MY Session", session.user.email, "My Id", query.service_id);

    // Create a flexible query for serviceId to match either String or ObjectId
    let serviceIdCondition = { serviceId: query.service_id };
    if (query.service_id && ObjectId.isValid(query.service_id)) {
      serviceIdCondition = {
        $or: [
          { serviceId: query.service_id },
          { serviceId: new ObjectId(query.service_id) },
        ],
      };
    }

    const myQuery = {
      ...serviceIdCondition,
      "user.email": session?.user?.email,
    };

    const result = await dbConnect(collections.BOOKING).findOne(myQuery);
    if (result) {
      return {
        _id: result._id.toString(),
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching single booking data:", error);
    return null;
  }
};

// Review Services Data
export const saveServiceReview = async (data) => {
  const result = await dbConnect(collections.REVIEWSERVICES).insertOne(data);
  return { insertedId: result.insertedId.toString() };
};

export const getServiceReviews = async (serviceId) => {
  try {
    let serviceIdCondition = { serviceId: serviceId };
    if (serviceId && ObjectId.isValid(serviceId)) {
      serviceIdCondition = {
        $or: [{ serviceId: serviceId }, { serviceId: new ObjectId(serviceId) }],
      };
    }
    const result = await dbConnect(collections.REVIEWSERVICES)
      .find(serviceIdCondition)
      .sort({ createdAt: -1 })
      .toArray();
    return result.map((review) => ({ ...review, _id: review._id.toString() }));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

// Home Page Reviews API
export const getHomePageReviews = async () => {
  const serviceReviews = await dbConnect(collections.REVIEWSERVICES)
    .find()
    .toArray();

  const caregiverReviews = await dbConnect(collections.REVIEWCAREGIVERS)
    .find()
    .toArray();

  const formatData = (data) =>
    data.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

  return {
    serviceReviews: formatData(serviceReviews),
    caregiverReviews: formatData(caregiverReviews),
  };
};
