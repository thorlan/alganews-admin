import { CashFlow } from 'orlandini-sdk';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import * as CategoryActions from '../store/EntriesCategory.slice';

export default function useEntriesCategories() {
    const dispatch = useDispatch<AppDispatch>();
    const expenses = useSelector((s: RootState) => s.cashFlow.category.expenses);
    const revenues = useSelector((s: RootState) => s.cashFlow.category.revenues);

    const fetchCategories = useCallback(
        () => dispatch(CategoryActions.getCategories()),
        [dispatch]
    );

    const createCategory = useCallback(
        (category: CashFlow.CategoryInput) =>
            dispatch(CategoryActions.createCategory(category)).unwrap(),
        [dispatch]
    );

    return {
        expenses,
        revenues,
        fetchCategories,
        createCategory,
    };
}