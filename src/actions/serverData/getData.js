"use server";

import { collections, dbConnect } from "@/lib/databaseConnect";
import { ObjectId } from "mongodb";

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
  const result = await dbConnect(collections.FROMDATA).insertOne(formData);
  return {
    acknowledged: result.acknowledged,
    insertedId: result.insertedId.toString(),
  };
}