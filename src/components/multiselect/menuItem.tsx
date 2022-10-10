import styled from '@emotion/styled';
import { FC } from 'react';
import { ItemOptions } from './multiselect';

export interface OptionProps {
    value: string;
    label: string;
    addOption: Function;
}

export const MenuItem: FC<OptionProps> = ({ value, label, addOption }) => {
    const newItem: ItemOptions = { label: label, value: value };
    return <ListItem onClick={() => addOption(newItem)}>{label}</ListItem>;
};

const ListItem = styled.li`
    padding: 5px;
    font-size: 15px;
    cursor: pointer;
    :hover {
        background-color: #dbdbdb;
        font-weight: 600;
    }
`;
