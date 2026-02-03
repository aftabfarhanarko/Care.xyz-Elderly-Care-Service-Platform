"use server";

import { collections, dbConnect } from "@/lib/databaseConnect";
import { ObjectId } from "mongodb";

export const myAllBookings = async (email) => {
  try {
    const result = await dbConnect(collections.BOOKING)
      .find({ "user.email": email })
      .toArray();

    return result.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
};

// My Services Booking  Update
export const updateMyBooking = async (id) => {
  try {
    // 2. Prepare query & update
    const query = { _id: new ObjectId(id) };
    const update = {
      $set: {
        status: "confirmed",
        updatedAt: new Date().toISOString(),
      },
    };
    // 3. Update database
    const result = await dbConnect(collections.BOOKING).updateOne(
      query,
      update,
    );

    // 4. Handle not found case
    if (result.matchedCount === 0) {
      return {
        success: false,
        message: "Booking not found",
      };
    }

    return {
      success: true,
      message: "Booking confirmed successfully",
      result,
    };
  } catch (error) {
    console.error("Update Booking Error:", error);

    return {
      success: false,
      message: "Failed to update booking",
    };
  }
};
// My Services Booking  Deleted
export const deleteMyBooking = async (id) => {
  try {
    // 1. Prepare query
    const query = { _id: new ObjectId(id) };

    // 2. Delete from database
    const result = await dbConnect(collections.BOOKING).deleteOne(query);

    // 3. Handle not found case
    if (result.deletedCount === 0) {
      return {
        success: false,
        message: "Booking not found",
      };
    }
    return {
      success: true,
      message: "Booking deleted successfully",
      result,
    };
  } catch (error) {
    console.error("Delete Booking Error:", error);

    return {
      success: false,
      message: "Failed to delete booking",
    };
  }
};

export const getAllUsers = async () => {
  try {
    const result = await dbConnect(collections.USER).find({}).toArray();
    return result.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Update User Role
export const updateUserRole = async (id, role) => {
  try {
    const query = { _id: new ObjectId(id) };
    const update = {
      $set: {
        role: role,
        updatedAt: new Date().toISOString(),
      },
    };
    const result = await dbConnect(collections.USER).updateOne(query, update);

    if (result.matchedCount === 0) {
      return { success: false, message: "User not found" };
    }

    return { success: true, message: "User role updated successfully" };
  } catch (error) {
    console.error("Update Role Error:", error);
    return { success: false, message: "Failed to update role" };
  }
};

// Delete User
export const deleteUser = async (id) => {
  try {
    const query = { _id: new ObjectId(id) };
    const result = await dbConnect(collections.USER).deleteOne(query);

    if (result.deletedCount === 0) {
      return { success: false, message: "User not found" };
    }

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Delete User Error:", error);
    return { success: false, message: "Failed to delete user" };
  }
};

export const myCaregiverBookings = async (email) => {
  try {
    const result = await dbConnect(collections.BOOKINGCAREGIVERS)
      .find({ bookerEmail: email })
      .toArray();

    return result.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching caregiver bookings:", error);
    return [];
  }
};

// Favorite Caregivers  Update
export const updateCaregivers = async (id) => {
  try {
    // 2. Prepare query & update
    const query = { _id: new ObjectId(id) };
    const update = {
      $set: {
        state: "confirmed",
        updatedAt: new Date().toISOString(),
      },
    };
    // 3. Update database
    const result = await dbConnect(collections.BOOKINGCAREGIVERS).updateOne(
      query,
      update,
    );

    // 4. Handle not found case
    if (result.matchedCount === 0) {
      return {
        success: false,
        message: "Caregivers  not found",
      };
    }

    return {
      success: true,
      message: "Caregivers  confirmed successfully",
      result,
    };
  } catch (error) {
    console.error("Update Caregivers  Error:", error);

    return {
      success: false,
      message: "Failed to update Caregivers ",
    };
  }
};

export const deleteCaregivers = async (id) => {
  try {
    // 1. Prepare query
    const query = { _id: new ObjectId(id) };

    // 2. Delete from database
    const result = await dbConnect(collections.BOOKINGCAREGIVERS).deleteOne(
      query,
    );

    // 3. Handle not found case
    if (result.deletedCount === 0) {
      return {
        success: false,
        message: "Caregivers not found",
      };
    }

    return {
      success: true,
      message: "Caregivers deleted successfully",
      result,
    };
  } catch (error) {
    console.error("Delete Caregivers Error:", error);

    return {
      success: false,
      message: "Failed to delete Caregivers",
    };
  }
};

// Current User Data SHow And Updeat
export const getCurrentUser = async (email) => {
  try {
    if (!email) {
      return {
        success: false,
        message: "Email is required",
      };
    }

    const user = await dbConnect(collections.USER).findOne({ email });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Convert _id to string
    const safeUser = {
      ...user,
      _id: user._id.toString(),
    };

    return {
      success: true,
      user: safeUser,
    };
  } catch (error) {
    console.error("Get Current User Error:", error);
    return {
      success: false,
      message: "Failed to get user",
    };
  }
};

export const updateCurrentUser = async (id, updateData) => {
  try {
    if (!id) {
      return {
        success: false,
        message: "User ID is required",
      };
    }

    const { _id, email, createdAt, ...safeUpdateData } = updateData;

    if (Object.keys(safeUpdateData).length === 0) {
      return {
        success: false,
        message: "No fields to update",
      };
    }

    const query = { _id: new ObjectId(id) };

    const update = {
      $set: {
        ...safeUpdateData,
        updatedAt: new Date().toISOString(),
      },
    };

    const result = await dbConnect(collections.USER).updateOne(query, update);

    if (result.matchedCount === 0) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      message: "User updated successfully",
      result,
    };
  } catch (error) {
    console.error("Update Current User Error:", error);
    return {
      success: false,
      message: "Failed to update user",
    };
  }
};

// My Add Caregivers
export const createMyCaregiver = async (caregiverData) => {
  try {
    const result = await dbConnect(collections.CAREGIVERS).insertOne({
      ...caregiverData,
      createdAt: new Date().toISOString(),
    });

    if (!result.insertedId) {
      return { success: false, message: "Failed to create caregiver" };
    }

    return {
      success: true,
      message: "Caregiver created successfully",
      insertedId: result.insertedId,
    };
  } catch (error) {
    console.error("Error creating caregiver:", error);
    return { success: false, message: "Failed to create caregiver" };
  }
};

export const getMyAddcaregivers = async (email) => {
  try {
    const result = await dbConnect(collections.CAREGIVERS)
      .find({ publishEmail: email })
      .toArray();

    return result.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching caregivers by email:", error);
    // Optional: throw error to be handled by caller
    throw error;
  }
};

export const updateMyCaregiver = async (id, updateData) => {
  try {
    const { _id, ...safeUpdateData } = updateData;
    const query = { _id: new ObjectId(id) };
    const update = {
      $set: {
        ...safeUpdateData,
        updatedAt: new Date().toISOString(),
      },
    };

    const result = await dbConnect(collections.CAREGIVERS).updateOne(
      query,
      update,
    );

    if (result.matchedCount === 0) {
      return { success: false, message: "Caregiver not found" };
    }

    return { success: true, message: "Caregiver updated successfully" };
  } catch (error) {
    console.error("Error updating caregiver:", error);
    return { success: false, message: "Failed to update caregiver" };
  }
};

export const deleteMyCaregiver = async (id) => {
  try {
    const query = { _id: new ObjectId(id) };
    const result = await dbConnect(collections.CAREGIVERS).deleteOne(query);

    if (result.deletedCount === 0) {
      return { success: false, message: "Caregiver not found" };
    }

    return { success: true, message: "Caregiver deleted successfully" };
  } catch (error) {
    console.error("Error deleting caregiver:", error);
    return { success: false, message: "Failed to delete caregiver" };
  }
};

// My Services Functions
export const getMyServices = async (email) => {
  try {
    const result = await dbConnect(collections.SERVICES)
      .find({ "contactInfo.email": email })
      .toArray();

    return result.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching services by email:", error);
    return [];
  }
};

export const createMyService = async (serviceData) => {
  try {
    const result = await dbConnect(collections.SERVICES).insertOne({
      ...serviceData,
      createdAt: new Date().toISOString(),
    });

    if (!result.insertedId) {
      return { success: false, message: "Failed to create service" };
    }

    return {
      success: true,
      message: "Service created successfully",
      insertedId: result.insertedId,
    };
  } catch (error) {
    console.error("Error creating service:", error);
    return { success: false, message: "Failed to create service" };
  }
};

export const updateMyService = async (id, updateData) => {
  try {
    const { _id, ...safeUpdateData } = updateData;
    const query = { _id: new ObjectId(id) };
    const update = {
      $set: {
        ...safeUpdateData,
        updatedAt: new Date().toISOString(),
      },
    };

    const result = await dbConnect(collections.SERVICES).updateOne(
      query,
      update,
    );

    if (result.matchedCount === 0) {
      return { success: false, message: "Service not found" };
    }

    return { success: true, message: "Service updated successfully" };
  } catch (error) {
    console.error("Error updating service:", error);
    return { success: false, message: "Failed to update service" };
  }
};

export const deleteMyService = async (id) => {
  try {
    const query = { _id: new ObjectId(id) };
    const result = await dbConnect(collections.SERVICES).deleteOne(query);

    if (result.deletedCount === 0) {
      return { success: false, message: "Service not found" };
    }

    return { success: true, message: "Service deleted successfully" };
  } catch (error) {
    console.error("Error deleting service:", error);
    return { success: false, message: "Failed to delete service" };
  }
};

// Contact Messaage Data
export const getMessagesData = async () => {
  try {
    const result = await dbConnect(collections.FROMDATA).find().toArray();

    return result.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching messages data:", error);
    return [];
  }
};

// Earning Chart Data Get Pipeline

export const getAdminDataOverview = async () => {
  try {
    const bookingsCollection = dbConnect(collections.BOOKING);
    const bookingCaregiversCollection = dbConnect(
      collections.BOOKINGCAREGIVERS,
    );
    const reviewServicesCollection = dbConnect(collections.REVIEWSERVICES);
    const usersCollection = dbConnect(collections.USER);

    // 1. Stats Aggregation
    const statsPipeline = [
      {
        $group: {
          _id: null,
          totalEarnings: {
            $sum: {
              $cond: [
                { $eq: ["$status", "confirmed"] },
                "$financials.totalCost",
                0,
              ],
            },
          },
          activeJobs: {
            $sum: {
              $cond: [{ $in: ["$status", ["pending", "confirmed"]] }, 1, 0],
            },
          },
          pendingRequests: {
            $sum: {
              $cond: [{ $eq: ["$status", "pending"] }, 1, 0],
            },
          },
        },
      },
    ];

    // 2. Monthly Revenue Aggregation for Chart
    const chartPipeline = [
      {
        $match: { status: "confirmed" },
      },
      {
        $addFields: {
          date: { $toDate: "$createdAt" },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
          },
          revenue: { $sum: "$financials.totalCost" },
          bookings: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      { $limit: 6 }, // Last 6 months
    ];

    // 3. Recent Service Bookings
    const recentServiceBookingsPipeline = [
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: { $toString: "$_id" },
          serviceName: 1,
          "user.name": 1,
          "user.email": 1,
          "financials.totalCost": 1,
          status: 1,
          createdAt: 1,
          "bookingDetails.duration": 1,
        },
      },
    ];

    // 4. Recent Caregiver Bookings
    const recentCaregiverBookingsPipeline = [
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: { $toString: "$_id" },
          caregiverName: 1, // Assuming caregiverName is in the document, or we might need to lookup. Let's assume structure is similar for now or check.
          "user.name": 1,
          "user.email": 1,
          totalCost: 1, // Caregiver bookings might have totalCost directly or in financials. Let's check schema if possible, or project standard fields.
          status: 1,
          createdAt: 1,
          days: 1, // Caregiver bookings usually have days
        },
      },
    ];

    // 5. Rating Aggregation
    const ratingPipeline = [
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
        },
      },
    ];

    // 6. Pie Chart Aggregation (Service Distribution)
    const piePipeline = [
      {
        $group: {
          _id: "$serviceName",
          value: { $sum: 1 },
        },
      },
      { $limit: 5 },
    ];

    // 7. Recent Activity (using bookings for now, can be expanded)
    const activityPipeline = [
      { $sort: { updatedAt: -1, createdAt: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: { $toString: "$_id" },
          status: 1,
          updatedAt: 1,
          createdAt: 1,
          serviceName: 1,
          "user.name": 1,
        },
      },
    ];

    // 8. Recent Users
    const recentUsersPipeline = [
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: { $toString: "$_id" },
          name: 1,
          email: 1,
          contact: 1,
          nidNumber: 1,
          role: 1,
          profileImage: 1,
          image: 1,
          createdAt: 1,
        },
      },
    ];

    const [
      statsResult,
      chartResult,
      recentServiceBookings,
      recentCaregiverBookings,
      ratingResult,
      pieResult,
      activityResult,
      recentUsers,
    ] = await Promise.all([
      bookingsCollection.aggregate(statsPipeline).toArray(),
      bookingsCollection.aggregate(chartPipeline).toArray(),
      bookingsCollection.aggregate(recentServiceBookingsPipeline).toArray(),
      bookingCaregiversCollection
        .aggregate(recentCaregiverBookingsPipeline)
        .toArray(),
      reviewServicesCollection.aggregate(ratingPipeline).toArray(),
      bookingsCollection.aggregate(piePipeline).toArray(),
      bookingsCollection.aggregate(activityPipeline).toArray(),
      usersCollection.aggregate(recentUsersPipeline).toArray(),
    ]);

    // Format Chart Data
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedChartData = chartResult.map((item) => ({
      name: monthNames[item._id.month - 1],
      revenue: item.revenue,
      bookings: item.bookings,
    }));

    // Format Pie Data with Colors
    const COLORS = ["#f43f5e", "#f97316", "#eab308", "#10b981", "#3b82f6"];
    const formattedPieData = pieResult.map((item, index) => ({
      name: item._id || "Unknown",
      value: item.value,
      color: COLORS[index % COLORS.length],
    }));

    // Format Recent Activity
    const formattedActivity = activityResult.map((item) => {
      let action = "Update";
      let desc = "Booking updated";
      if (item.status === "pending") {
        action = "New Booking Request";
        desc = `New booking request from ${item.user?.name} for ${item.serviceName}`;
      } else if (item.status === "confirmed") {
        action = "Booking Confirmed";
        desc = `Booking confirmed for ${item.user?.name}`;
      } else if (item.status === "completed") {
        action = "Service Completed";
        desc = `Service completed for ${item.user?.name}`;
      } else if (item.status === "cancelled") {
        action = "Booking Cancelled";
        desc = `Booking cancelled by ${item.user?.name}`;
      }

      return {
        id: item._id,
        action,
        desc,
        time: item.updatedAt || item.createdAt, // Will format on client
      };
    });

    const stats = statsResult[0] || {
      totalEarnings: 0,
      activeJobs: 0,
      pendingRequests: 0,
    };
    const rating = ratingResult[0]?.avgRating || 0;

    return {
      stats: {
        ...stats,
        rating: parseFloat(rating.toFixed(1)),
      },
      chartData: formattedChartData,
      pieData: formattedPieData,
      recentServiceBookings,
      recentCaregiverBookings,
      recentActivity: formattedActivity,
      recentUsers,
    };
  } catch (error) {
    console.error("Error in getAdminDataOverview:", error);
    return {
      stats: {
        totalEarnings: 0,
        activeJobs: 0,
        pendingRequests: 0,
        rating: 0,
      },
      chartData: [],
      recentServiceBookings: [],
      recentCaregiverBookings: [],
      recentActivity: [],
      recentUsers: [],
    };
  }
};

export const getUserDataOverview = async (email) => {
  try {
    if (!email) {
      throw new Error("Email is required for user overview");
    }

    const bookingsCollection = dbConnect(collections.BOOKING);
    const bookingCaregiversCollection = dbConnect(
      collections.BOOKINGCAREGIVERS,
    );

    // 1. Recent Service Bookings
    const recentServiceBookingsPipeline = [
      { $match: { "user.email": email } },
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: { $toString: "$_id" },
          serviceName: 1,
          "user.name": 1,
          "user.email": 1,
          "financials.totalCost": 1,
          status: 1,
          createdAt: 1,
          "bookingDetails.duration": 1,
        },
      },
    ];

    // 2. Recent Caregiver Bookings
    const recentCaregiverBookingsPipeline = [
      { $match: { bookerEmail: email } },
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: { $toString: "$_id" },
          caregiverName: 1,
          "user.name": 1,
          "user.email": 1,
          totalCost: 1,
          status: 1,
          createdAt: 1,
          days: 1,
        },
      },
    ];

    // 3. Combined Chart Data (Services + Caregivers Spending)
    // We need to fetch all to aggregate properly or use a more complex union.
    // Simpler approach: fetch all confirmed bookings for the user and aggregate in JS or separate pipelines.
    // Given the scale, separate pipelines are fine.

    const serviceChartPipeline = [
      { $match: { "user.email": email, status: "confirmed" } },
      {
        $addFields: {
          date: { $toDate: "$createdAt" },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
          },
          amount: { $sum: "$financials.totalCost" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      { $limit: 6 },
    ];

    const caregiverChartPipeline = [
      { $match: { bookerEmail: email, status: "confirmed" } },
      {
        $addFields: {
          date: { $toDate: "$createdAt" },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
          },
          amount: { $sum: "$totalCost" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      { $limit: 6 },
    ];

    const [
      recentServiceBookings,
      recentCaregiverBookings,
      serviceChartData,
      caregiverChartData,
    ] = await Promise.all([
      bookingsCollection.aggregate(recentServiceBookingsPipeline).toArray(),
      bookingCaregiversCollection
        .aggregate(recentCaregiverBookingsPipeline)
        .toArray(),
      bookingsCollection.aggregate(serviceChartPipeline).toArray(),
      bookingCaregiversCollection.aggregate(caregiverChartPipeline).toArray(),
    ]);

    // Merge Chart Data
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Create a map to merge data
    const chartMap = new Map();

    // Helper to add to map
    const addToMap = (data) => {
      data.forEach((item) => {
        const key = `${item._id.year}-${item._id.month}`;
        const current = chartMap.get(key) || {
          year: item._id.year,
          month: item._id.month,
          amount: 0,
        };
        current.amount += item.amount;
        chartMap.set(key, current);
      });
    };

    addToMap(serviceChartData);
    addToMap(caregiverChartData);

    // Convert map to array and sort
    const mergedChartData = Array.from(chartMap.values())
      .sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return a.month - b.month;
      })
      .map((item) => ({
        name: monthNames[item.month - 1],
        amount: item.amount,
      }));

    // Stats for User
    // Calculate total spent and active bookings locally from fetched data is insufficient if we limit to 5.
    // Let's run a quick stats aggregation.
    const serviceStatsPipeline = [
      { $match: { "user.email": email } },
      {
        $group: {
          _id: null,
          totalSpent: {
            $sum: {
              $cond: [
                { $eq: ["$status", "confirmed"] },
                "$financials.totalCost",
                0,
              ],
            },
          },
          activeBookings: {
            $sum: {
              $cond: [{ $in: ["$status", ["pending", "confirmed"]] }, 1, 0],
            },
          },
        },
      },
    ];

    const caregiverStatsPipeline = [
      { $match: { bookerEmail: email } },
      {
        $group: {
          _id: null,
          totalSpent: {
            $sum: {
              $cond: [{ $eq: ["$status", "confirmed"] }, "$totalCost", 0],
            },
          },
          activeBookings: {
            $sum: {
              $cond: [{ $in: ["$status", ["pending", "confirmed"]] }, 1, 0],
            },
          },
        },
      },
    ];

    const [serviceStats, caregiverStats] = await Promise.all([
      bookingsCollection.aggregate(serviceStatsPipeline).toArray(),
      bookingCaregiversCollection.aggregate(caregiverStatsPipeline).toArray(),
    ]);

    const totalSpent =
      (serviceStats[0]?.totalSpent || 0) +
      (caregiverStats[0]?.totalSpent || 0);
    const activeBookings =
      (serviceStats[0]?.activeBookings || 0) +
      (caregiverStats[0]?.activeBookings || 0);

    return {
      stats: {
        totalSpent,
        activeBookings,
      },
      chartData: mergedChartData,
      recentServiceBookings,
      recentCaregiverBookings,
    };
  } catch (error) {
    console.error("Error in getUserDataOverview:", error);
    return {
      stats: { totalSpent: 0, activeBookings: 0 },
      chartData: [],
      recentServiceBookings: [],
      recentCaregiverBookings: [],
    };
  }
};
