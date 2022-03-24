import { Descriptions, Typography } from "antd";
import { Payment } from "orlandini-sdk";

interface PaymentBonusesProps {
    bonuses?: Payment.Detailed['bonuses'];
}

export default function PaymentBonuses(props: PaymentBonusesProps) {

    return (
        <>
            <Typography.Title level={2}>
                Bônus
            </Typography.Title>
            <Descriptions column={1} bordered size={'small'}>
                {props.bonuses?.map((bonus) => (
                    <Descriptions.Item label={bonus.title}>{bonus.amount.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                        maximumFractionDigits: 2
                    })}</Descriptions.Item>
                ))}
            </Descriptions>
        </>
    )
}