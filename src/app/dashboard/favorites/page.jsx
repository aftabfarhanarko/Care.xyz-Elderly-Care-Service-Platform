import React from 'react';
import FavoritesContent from '@/components/dashboard/FavoritesContent';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { myCaregiverBookings } from '@/actions/serverData/dashbordApi';

const FavoritesPage = async () => {
  const session = await getServerSession(authOptions);
  // console.log("My Session", session?.user?.email);
  const email = session?.user?.email
  const data = await myCaregiverBookings(email);
  // console.log(data);
  
  
  return (
    <FavoritesContent data={data}/>
  );
};

export default FavoritesPage;
