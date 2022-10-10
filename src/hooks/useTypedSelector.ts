import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../service/reducers';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
