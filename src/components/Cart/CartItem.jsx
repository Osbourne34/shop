import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Typography, CardMedia, Paper } from '@mui/material';

import ItemActions from './ItemActions';

const CartItem = ({ product, amount, cartId, disabledDecrease }) => {
    return (
        <Paper
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                boxShadow: 5,
                mb: 3,
                pr: 2,
            }}
        >
            <Box
                component={RouterLink}
                to={`/product/${product.id}`}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    flexGrow: 1,
                    mr: 2,
                    p: 2,
                    color: 'text.primary',
                    textDecoration: 'none',
                }}
            >
                <CardMedia
                    component="img"
                    height="80"
                    image={product.thumbnail}
                    alt={product.title}
                    sx={{ width: '80px', borderRadius: 2 }}
                />
                <Box sx={{ ml: 3 }}>
                    <Typography fontWeight={700}>{product.title}</Typography>
                    <Typography color="primary">
                        {amount} x ${product.price}
                    </Typography>
                    <Typography>${product.price * amount}</Typography>
                </Box>
            </Box>

            <ItemActions
                amount={amount}
                cartId={cartId}
                disabledDecrease={disabledDecrease}
            />
        </Paper>
    );
};

export default CartItem;