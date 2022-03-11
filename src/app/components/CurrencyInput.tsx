import { useCallback, useState } from "react";

type CurrencyInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange'
> & {
    onChange: (
        event: React.ChangeEvent<HTMLInputElement>,
        reals: number
    ) => any;
};
export default function CurrencyInput(
    props: CurrencyInputProps
) {
    const [inputValue, setInputValue] = useState('R$ 0,00');

    const convertValueToBrl = useCallback((value: number) => {
        return value.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
        });
    }, []);

    return (
        <input
            className={'ant-input'}
            {...props}
            value={inputValue}
            onChange={(e) => {
                const { value } = e.currentTarget;
                const cents = value.replace(/[^(0-9)]/gi, '');
                const reals = Number(cents) / 100;
                setInputValue(convertValueToBrl(reals));
                props.onChange && props.onChange(e, reals);
            }}
        />
    );
}