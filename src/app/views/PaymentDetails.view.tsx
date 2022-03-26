import { Button, Card, Divider, Space, Tag } from "antd";
import { PrinterOutlined, CheckCircleOutlined } from '@ant-design/icons';
import moment from "moment";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import usePayment from "../../core/hooks/usePayment";
import NotFoundError from "../components/NotFoundError";
import PaymentBonuses from "../features/PaymentBonuses";
import PaymentHeader from "../features/PaymentHeader";
import PaymentPosts from "../features/PaymentPosts";
import usePageTitle from "../../core/hooks/usePageTitle";
import DoubleConfirm from "../components/DoubleConfirm";

export default function PaymentDetailsView() {
    usePageTitle('Detalhes do Pagamento')
    const history = useHistory();
    const params = useParams<{ id: string }>();
    const {
        fetchPayment,
        fetchPosts,
        fetchingPayment,
        fetchingPosts,
        payment,
        posts,
        paymentNotFound,
        approvingPayment
    } = usePayment();

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

        <Space style={{ marginBottom: 16 }}>
            <Button
                className='no-print'
                disabled={!payment}
                type={'primary'}
                icon={<PrinterOutlined />}
                onClick={window.print}
            >
                Imprimir
            </Button>
            {payment?.approvedAt ? (
                <Tag>
                    Pagamento aprovado em{' '}
                    {moment(payment.approvedAt).format('DD/MM/YYYY')}
                </Tag>
            ) : (
                <DoubleConfirm
                    popConfirmTitle={'Deseja aprovar este agendamento?'}
                    modalTitle={'Ação irreversível'}
                    disabled={!payment}
                    modalContent={
                        'Aprovar um agendamento de pagamento gera uma despesa que não pode ser removida do fluxo de caixa. Essa ação não poderá ser desfeita.'
                    }
                    onConfirm={() => {
                        console.log('todo: implement payment approval');
                    }}
                >
                    <Button
                        className='no-print'
                        loading={approvingPayment}
                        disabled={!payment}
                        icon={<CheckCircleOutlined />}
                        type={'primary'}
                        danger
                    >
                        Aprovar agendamento
                    </Button>
                </DoubleConfirm>
            )}
        </Space>


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