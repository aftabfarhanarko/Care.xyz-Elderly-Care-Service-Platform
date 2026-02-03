import { getMyServices } from '@/actions/serverData/dashbordApi';
import MyServicesContent from '@/components/dashboard/MyServicesContent';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

const ServicesPage = async () => {
    const session = await getServerSession(authOptions);
    const services = await getMyServices(session?.user?.email);
    // console.log(services);
    

    return <MyServicesContent services={services} />;
}

export default ServicesPage;
