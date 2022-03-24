import { Card, Divider } from "antd";
import moment from "moment";
import { useEffect } from "react";
import usePayment from "../../core/hooks/usePayment";
import PaymentBonuses from "../features/PaymentBonuses";
import PaymentHeader from "../features/PaymentHeader";
import PaymentPosts from "../features/PaymentPosts";

export default function PaymentDetailsView() {

    const { fetchPayment, fetchPosts, fetchingPayment, fetchingPosts, payment, posts } = usePayment();

    useEffect(() => {
        fetchPosts(1);
        fetchPayment(1);
    }, [fetchPayment, fetchPosts])

    return <>
        <Card>
            <PaymentHeader
                editorId={payment?.payee.id}
                editorName={payment?.payee.name}
                periodStart={moment(payment?.accountingPeriod.startsOn).format('DD/MM/YYYY')}
                periodEnd={moment(payment?.accountingPeriod.endsOn).format('DD/MM/YYYY')}
                postsEarnings={payment?.earnings.totalAmount}
                totalEarnings={payment?.grandTotalAmount}
            />

            <Divider />
            <PaymentBonuses bonuses={payment?.bonuses} />
            <Divider />
            <PaymentPosts posts={posts} />
        </Card>
    </>
}