import { useAuth } from '../context/AuthContext';
import { Role } from '@/types/types';

const WithRole = ({children, role}: {children: any, role: Role}) => {
    const { authState } = useAuth();
    if (authState?.role !== role) {
        return <></>;
    }
    return children;
};

export default WithRole;