import React from 'react';

import { useToggleDrawer } from '../../hook/useToggleDrawer';

import { DRAWER_SIDE } from '../../constants/ui';

import { cartHOC } from '../Cart/cartHOC';

import { IconButton, Badge } from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartButton = ({ cart }) => {
    const toggleDrawer = useToggleDrawer();

    return (
        <IconButton
            onClick={toggleDrawer(DRAWER_SIDE, true)}
            color="inherit"
            sx={{ ml: 1 }}
        >
            <Badge color="error" badgeContent={cart?.totalCount || 0}>
                <ShoppingCartIcon />
            </Badge>
        </IconButton>
    );
};

export default cartHOC(CartButton);
