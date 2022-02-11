import { Area, AreaConfig } from '@ant-design/charts';
import { MetricService } from 'orlandini-sdk';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import transformDataIntoAntdChart from '../../core/utils/transformDataIntoAntdChart';
import { ptBR } from 'date-fns/locale';

export default function CompanyMetrics() {

    const [data, setData] = useState<
        {
            yearMonth: string;
            value: number;
            category: 'totalRevenues' | 'totalExpenses';
        }[]
    >([]);

    useEffect(() => {
        MetricService
            .getMonthlyRevenuesExpenses()
            .then(transformDataIntoAntdChart)
            .then(setData);
    }, [])

    const config: AreaConfig = {
        data,
        height: 256,
        color: ['#0099ff', '#274060'],
        areaStyle: {
            fillOpacity: 1
        },
        xField: 'yearMonth',
        yField: 'value',
        seriesField: 'category',
        legend: {
            itemName: {
                formatter(legend) {
                    return legend === 'totalRevenues'
                        ? 'Receitas'
                        : 'Despesas';
                },
            },
        },
        xAxis: {
            label: {
                formatter(item) {
                    return format(new Date(item), 'MM/yyyy');
                },
            },
        },
        tooltip: {
            title(title) {
                return format(new Date(title), 'MMM yyyy', { locale: ptBR });
            },
            formatter(data) {
                return {
                    name: data.category === 'totalRevenues' ? 'Receitas' : 'Despesas',
                    value: (data.value as number).toLocaleString('pt-BR', {
                        currency: 'BRL',
                        style: 'currency',
                        maximumFractionDigits: 2
                    })
                }
            }
        },
        yAxis: false,
        point: {
            size: 5,
            shape: 'circle',
        },
    };
    return <Area {...config} />;
}