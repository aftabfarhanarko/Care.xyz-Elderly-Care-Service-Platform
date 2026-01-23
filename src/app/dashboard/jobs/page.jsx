import { getMyAddcaregivers } from '@/actions/serverData/dashbordApi';
import ProviderJobsContent from '@/components/dashboard/ProviderJobsContent';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

 const JobsPage = async() => {
    const {user} = await getServerSession(authOptions)
    console.log(user);
    const caregivers = await getMyAddcaregivers(user?.email);
    console.log(caregivers);
    
    
    return <ProviderJobsContent caregivers={caregivers} />;
}

export default JobsPage;