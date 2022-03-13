import { Table, Tag, Button, Tooltip, Popconfirm, Row, DatePicker } from "antd";
import { Payment } from "orlandini-sdk";
import { useEffect, useState } from "react";
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';
import { Key } from 'antd/lib/table/interface';
import usePayments from "../../core/hooks/usePayments"
import moment from "moment";

export default function UserList() {

    const { payments, fetchPayments } = usePayments();
    const [yearMonth, setYearMonth] = useState<string | undefined>()
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

    useEffect(() => {
        fetchPayments({
            scheduledToYearMonth: yearMonth,
            sort: ['scheduledTo', 'desc'],
            page: 0
        });
    }, [fetchPayments, yearMonth])

    return <>
        <Row justify={'space-between'}>
            <Popconfirm
                title={
                    selectedRowKeys.length === 1
                        ? 'Deseja aprovar o pagamento selecionado?'
                        : `Deseja aprovar os ${selectedRowKeys.length} pagamentos selecionados?`}
                onConfirm={() => {
                    confirm({
                        title: 'Aprovar pagamento',
                        cancelText: 'Cancelar',
                        onOk() {
                            console.log(
                                'todo: implement payment batch approval'
                            );
                        },
                        content:
                            'Esta é uma ação irreversível. Ao um pagamento, ele não poderá ser removido!',
                    });
                }}
            >
                <Button type='primary' disabled={selectedRowKeys.length === 0}>
                    Aprovar pagamentos
                </Button>
            </Popconfirm>

            <DatePicker.MonthPicker

                style={{ width: 240 }}
                format={'MMM-YYYY'}
                onChange={(date) => {
                    setYearMonth(date ? date?.format('YYYY-MM') : undefined)
                }}
            />

        </Row>
        <Table<Payment.Summary>
            dataSource={payments?.content}
            rowKey={'id'}
            rowSelection={{
                selectedRowKeys: selectedRowKeys,
                getCheckboxProps(payment) {
                    return !payment.canBeApproved
                        ? { disabled: true }
                        : {}
                },
                onChange: setSelectedRowKeys,
                // onChange(selectedKeys) {
                //     setSelectedRowKeys(selectedKeys);
                // }
            }}
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

                {
                    dataIndex: 'id',
                    title: 'Ações',
                    render(id: number, payment) {
                        return (
                            <>
                                <Tooltip
                                    title={'Detalhar'}
                                    placement='left'
                                >
                                    <Button
                                        size='small'
                                        icon={<EyeOutlined />}
                                    />
                                </Tooltip>
                                <Popconfirm
                                    title='Remover agendamento?'
                                    onConfirm={() => {
                                        confirm({
                                            title: 'Remover agendamento',
                                            cancelText: 'Cancelar',
                                            onOk() {
                                                console.log(
                                                    'todo: implement payment deletion'
                                                );
                                            },
                                            content:
                                                'Esta é uma ação irreversível. Ao remover um agendamento, ele não poderá ser recuperado!',
                                        });
                                    }}
                                >
                                    <Tooltip
                                        title={
                                            payment.canBeDeleted
                                                ? 'Remover'
                                                : 'Pagamento já aprovado'
                                        }
                                        placement='right'
                                    >
                                        <Button
                                            size='small'
                                            disabled={!payment.canBeDeleted}
                                            icon={<DeleteOutlined />}
                                        />
                                    </Tooltip>
                                </Popconfirm>
                            </>
                        );
                    },
                },


            ]}
        />
    </>
}