import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../../store/authSlice';
import { useGetUserOrderQuery } from '../../store/orderApi';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Typography, Button } from '@mui/material';

import OrderItem from './OrderItem';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';

const LIMIT = 5;

const OrderList = () => {
    const [page, setPage] = useState(1);
    const { user } = useSelector(auth);

    const { data, isFetching, error } = useGetUserOrderQuery({
        userId: user.id,
        page,
        limit: LIMIT,
    });

    if (isFetching) {
        return <Loader />;
    }

    if (error) {
        return (
            <Typography
                sx={{ color: 'text.primary', maxWidth: 500, mx: 'auto' }}
                textAlign="center"
                variant="h4"
            >
                Ошибка при загрузке данных, попробуйте ещё раз
            </Typography>
        );
    }

    return (
        <>
            {data.apiResponse?.length > 0 ? (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2,
                            px: 2,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                flex: '1 1 0',
                                color: 'text.secondary',
                            }}
                        >
                            Заказ №
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                flex: '1 1 0',
                                color: 'text.secondary',
                            }}
                        >
                            Статус
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                flex: '1 1 0',
                                color: 'text.secondary',
                            }}
                        >
                            Дата заказа
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                flex: '1 1 0',
                                color: 'text.secondary',
                            }}
                        >
                            Общая сумма
                        </Typography>
                    </Box>
                    {data.apiResponse.map((order) => (
                        <OrderItem key={order.id} {...order} />
                    ))}

                    <Pagination
                        count={Math.ceil(data?.totalCount / LIMIT)}
                        page={page}
                        handleChange={(event, value) => setPage(value)}
                    />
                </>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        variant="h4"
                        textAlign="center"
                        sx={{ color: 'text.primary', mb: 2 }}
                    >
                        У вас нету заказов
                    </Typography>
                    <Button component={RouterLink} to="/" variant="outlined">
                        На главную
                    </Button>
                </Box>
            )}
        </>
    );
};

export default OrderList;
