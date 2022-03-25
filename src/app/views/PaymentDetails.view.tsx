import { Card, Divider } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import usePayment from "../../core/hooks/usePayment";
import NotFoundError from "../components/NotFoundError";
import PaymentBonuses from "../features/PaymentBonuses";
import PaymentHeader from "../features/PaymentHeader";
import PaymentPosts from "../features/PaymentPosts";

export default function PaymentDetailsView() {
    const history = useHistory();

    const params = useParams<{ id: string }>();
    const { fetchPayment, fetchPosts, fetchingPayment, fetchingPosts, payment, posts, paymentNotFound } = usePayment();

    useEffect(() => {
        if (!isNaN(Number(params.id))) {
            fetchPosts(Number(params.id));
            fetchPayment(Number(params.id));
        } else {
            history.push('/pagamentos');
        }
    }, [fetchPayment, fetchPosts, history, params.id])

    if (paymentNotFound) {
        return (
            <NotFoundError
                title='Pagamento não encontrado'
                actionDestination='/pagamentos'
                actionTitle={'Ir para a lista de pagamentos'}
            />
        )
    }

    return <>
        <Card>
            <PaymentHeader
                loading={fetchingPayment}
                editorId={payment?.payee.id}
                editorName={payment?.payee.name}
                periodStart={moment(payment?.accountingPeriod.startsOn).format('DD/MM/YYYY')}
                periodEnd={moment(payment?.accountingPeriod.endsOn).format('DD/MM/YYYY')}
                postsEarnings={payment?.earnings.totalAmount}
                totalEarnings={payment?.grandTotalAmount}
            />

            <Divider />
            <PaymentBonuses bonuses={payment?.bonuses} loading={fetchingPayment} />
            <Divider />
            <PaymentPosts posts={posts} loading={fetchingPosts} />
        </Card>
    </>
}