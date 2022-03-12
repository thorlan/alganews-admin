import { Table, Tag, Switch, Button, Space, Avatar, Card, Input, Descriptions, Tooltip, Row } from "antd";
import { format } from "date-fns";
import { Payment } from "orlandini-sdk";
import { useEffect } from "react";
import { ReloadOutlined } from '@ant-design/icons';

import usePayments from "../../core/hooks/usePayments"
import moment from "moment";

export default function UserList() {

    const { payments, fetchPayments } = usePayments();

    useEffect(() => {
        fetchPayments({
            sort: ['scheduledTo', 'desc'],
            page: 0
        });
    }, [fetchPayments])



    return <>
        <Table<Payment.Summary>
            dataSource={payments?.content}
            pagination={false}
            rowKey={'id'}
            columns={[
                {
                    dataIndex: 'id',
                    title: "#",
                },

                {
                    dataIndex: 'payee',
                    title: 'Editor',
                    render(payee: Payment.Summary['payee']) {
                        return payee.name;
                    }
                },

                {
                    dataIndex: 'scheduledTo',
                    title: 'Agendamento',
                    align: 'center',
                    render(date: string) {
                        return moment(date).format('DD/MM/YYYY');
                    }
                },

                {
                    dataIndex: 'accountingPeriod',
                    title: 'Período',
                    align: 'center',
                    render(period: Payment.Summary['accountingPeriod']) {
                        const starts = moment(period.startsOn).format('DD/MM/YYYY');
                        const ends = moment(period.endsOn).format('DD/MM/YYYY');
                        return `${starts} - ${ends}`
                    }
                },

                {
                    dataIndex: 'approvedAt',
                    title: 'Status',
                    align: 'center',
                    render(approvalDate: Payment.Summary['approvedAt']) {

                        const formatedApprovalDate = moment(approvalDate).format('DD/MM/YYYY');

                        return (
                            <Tag color={approvalDate ? 'green' : 'warning'}>
                                {
                                    approvalDate
                                        ? `Aprovado em  ${formatedApprovalDate}`
                                        : 'Aguardando aprovação'
                                }
                            </Tag>
                        );
                    }
                },


                // {
                //     dataIndex: 'createdAt',
                //     title: 'Criação',
                //     align: 'center',
                //     responsive: ['sm'],
                //     width: 120,
                //     sorter(a, b) {
                //         return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
                //     },
                //     render(createdAt: string) {
                //         return format(new Date(createdAt), 'dd/MM/yyyy')
                //     }
                // },


            ]}
        />
    </>
}