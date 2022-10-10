import styled from '@emotion/styled';
import { FC, useEffect, useState, useRef, useCallback, ChangeEvent } from 'react';
import { MenuItem } from './menuItem';
import { css } from '@emotion/react';

export interface ItemOptions {
    value: string;
    label: string;
}

interface MultiOptions {
    items: ItemOptions[];
    updateSelectedItems: any;
    selectedItems: ItemOptions[];
    name: string;
}

export const Multiselect: FC<MultiOptions> = ({
    items,
    updateSelectedItems,
    selectedItems,
    name,
}) => {
    const [dropDown, setDropDown] = useState(false);
    const [itemsInMenu, setItemsInMenu] = useState<ItemOptions[]>(items);
    const [itemInput, setItemInput] = useState<string>('');
    const [focus, setFocus] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    const addItemSelected = useCallback(
        (item: ItemOptions) => {
            const idx = itemsInMenu.findIndex((el) => el.value === item.value);
            const findItem = itemsInMenu[idx];

            setItemsInMenu([...itemsInMenu.slice(0, idx), ...itemsInMenu.slice(idx + 1)]);
            updateSelectedItems([...selectedItems, findItem]);
            setDropDown(false);
        },
        [itemsInMenu, selectedItems, updateSelectedItems]
    );

    useEffect(() => {
        const addNewItemByEnterPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && itemInput) {
                const newItem: ItemOptions = { label: itemInput, value: itemInput.toLowerCase() };

                itemsInMenu.findIndex((el) => el.value === newItem.value) !== -1
                    ? addItemSelected(newItem)
                    : updateSelectedItems([...selectedItems, newItem]);
                setItemInput('');
            }
        };

        const chekClickOutside = (e: Event) => {
            const target = e.target as Node;
            if (ref.current && !ref.current.contains(target) && dropDown) setDropDown(false);
        };

        document.addEventListener('mousedown', chekClickOutside);
        document.addEventListener('keydown', addNewItemByEnterPress);

        return () => {
            document.removeEventListener('mousedown', chekClickOutside);
            document.removeEventListener('keydown', addNewItemByEnterPress);
        };
    }, [dropDown, itemInput, selectedItems, addItemSelected, itemsInMenu, updateSelectedItems]);

    const toggleDropDown = () => {
        setDropDown(!dropDown);
    };

    const deleteItemSelected = useCallback(
        (item: ItemOptions) => {
            const idx = selectedItems.findIndex((el) => el.value === item.value);
            const findItem = selectedItems[idx];

            updateSelectedItems([...selectedItems.slice(0, idx), ...selectedItems.slice(idx + 1)]);
            setItemsInMenu([...itemsInMenu, findItem]);
            setDropDown(false);
            setItemInput('');
        },
        [itemsInMenu, selectedItems, updateSelectedItems]
    );

    const renderMenu = useCallback(
        (itemsInMenu: ItemOptions[]) => {
            return (
                <Menu>
                    {itemsInMenu.length > 0 ? (
                        itemsInMenu.map(({ label, value }) => (
                            <MenuItem
                                key={value}
                                value={value}
                                label={label}
                                addOption={addItemSelected}
                            />
                        ))
                    ) : (
                        <NoneItem>Нет вариантов</NoneItem>
                    )}
                </Menu>
            );
        },
        [addItemSelected]
    );

    const renderSelectedItems = useCallback(
        (itemsSelected: ItemOptions[]) => {
            return (
                <SelectedContainer>
                    {itemsSelected.map(({ label, value }) => (
                        <SelectedStyleContainer key={value}>
                            <SelectLabel>{label}</SelectLabel>
                            <SelectedDelete onClick={() => deleteItemSelected({ label, value })}>
                                <span
                                    className="material-icons-outlined"
                                    style={{ fontSize: '15px' }}
                                >
                                    close
                                </span>
                            </SelectedDelete>
                        </SelectedStyleContainer>
                    ))}
                </SelectedContainer>
            );
        },
        [deleteItemSelected]
    );

    const onSearchQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setItemInput(event.currentTarget.value);
    };

    const menu = dropDown ? renderMenu(itemsInMenu) : null;

    return (
        <Container ref={ref}>
            <MultiContainer focus={focus}>
                {renderSelectedItems(selectedItems)}
                <StyledInput
                    value={itemInput}
                    onChange={onSearchQueryChanged}
                    onBlur={() => setFocus(false)}
                    onFocus={() => {
                        setFocus(true);
                        toggleDropDown();
                    }}
                    name={name}
                    autoComplete={'off'}
                />
                <ButtonContainer onClick={() => toggleDropDown()}>
                    <span className="material-icons-outlined" style={{ fontSize: '22px' }}>
                        keyboard_arrow_down
                    </span>
                </ButtonContainer>
            </MultiContainer>

            {menu}
        </Container>
    );
};

const Container = styled.div`
    width: 76%;
`;

interface MultiContainerProps {
    focus: boolean;
}

const MultiContainer = styled.div<MultiContainerProps>`
    position: relative;
    display: flex;
    align-items: center;
    min-height: 40px;
    border: 1px solid black;
    border-radius: 3px;
    padding: 8px;
    ${({ focus }) =>
        focus
            ? css`
                  border: 2px solid black;
              `
            : css`
                  border: 1px solid black;
              `}
`;

const StyledInput = styled.input`
    border: none;
    cursor: default;
    padding: 0;
    margin: 0;
    outline: none;
    flex: 1 1 auto;
    min-width: 30%;
`;

const ButtonContainer = styled.button`
    border: none;
    outline: none;
    background-color: white;
    align-items: center;
    display: flex;
    cursor: pointer;
`;

const SelectedContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const SelectedStyleContainer = styled.div`
    background-color: #94c5ff;
    padding: 3px;
    border-radius: 10px;
    align-items: center;
    margin-right: 5px;
    display: flex;
`;
const SelectedDelete = styled.div`
    background-color: #94c5ff;
    border: none;
    cursor: pointer;
    outline: none;
`;

const SelectLabel = styled.div`
    font-size: 12px;
`;

const Menu = styled.ul`
    position: absolute;
    margin-top: 2px;
    width: 36%;
    border-radius: 2px;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.7);
    max-height: 150px;
    overflow-y: scroll;
    background: #fff;
    z-index: 999;
`;

const NoneItem = styled.div`
    padding: 5px;
    text-align: center;
`;
