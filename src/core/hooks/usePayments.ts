import {
    Payment,
    PayrollService,
} from 'orlandini-sdk';
import { useCallback, useState } from 'react';

export default function usePayments() {
    const [fetchingPayments, setFetchPayments] = useState(false);
    const [payments, setPayments] = useState<Payment.Paginated>();

    const fetchPayments = useCallback(
        async (query: Payment.Query) => {
            setFetchPayments(true);
            try {
                const payments = await PayrollService.getAllPayments(
                    query
                );
                setPayments(payments);
            } finally {
                setFetchPayments(false);
            }
        },
        []
    );

    return {
        payments,
        fetchPayments,
        fetchingPayments
    };
}