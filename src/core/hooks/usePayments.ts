import {
    Payment,
    PayrollService,
} from 'orlandini-sdk';
import { useCallback, useState } from 'react';

export default function usePayments() {
    const [payments, setPayments] =
        useState<Payment.Paginated>();

    const fetchPayments = useCallback(
        async (query: Payment.Query) => {
            const payments = await PayrollService.getAllPayments(
                query
            );
            setPayments(payments);
        },
        []
    );

    return {
        payments,
        fetchPayments,
    };
}