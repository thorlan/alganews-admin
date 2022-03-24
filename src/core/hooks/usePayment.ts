import { Payment, PayrollService, Post } from 'orlandini-sdk';
import { useCallback } from 'react';
import { useState } from 'react';

export default function usePayment() {
    const [posts, setPosts] = useState<Post.WithEarnings[]>([]);
    const [payment, setPayment] = useState<Payment.Detailed>();

    const [fetchingPosts, setFetchingPosts] = useState(false);
    const [fetchingPayment, setFetchingPayment] = useState(false);

    const fetchPayment = useCallback(async (paymentId: number) => {
        try {
            setFetchingPayment(true);
            const payment = await PayrollService.getExistingPayment(paymentId);
            setPayment(payment);
        } finally {
            setFetchingPayment(false);
        }
    }, []);

    const fetchPosts = useCallback(async (paymentId: number) => {
        try {
            setFetchingPosts(true);
            const posts = await PayrollService.getExistingPaymentPosts(paymentId);
            setPosts(posts);
        } finally {
            setFetchingPosts(false);
        }
    }, []);

    return {
        fetchPayment,
        fetchPosts,
        fetchingPayment,
        fetchingPosts,
        posts,
        payment,
    };
}