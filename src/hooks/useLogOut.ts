import { useActions } from './useActions';

export const useLogOut = () => {
    const { logOutUser } = useActions();

    return () => {
        logOutUser();
    };
};
