import {useSearchParams} from "react-router-dom";
import type {SearchProductRequest} from "../types/product.ts";


export const useUrlState = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const typedWord = searchParams.get('query') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    const updateSearch = (newWord: string) => {
        setSearchParams(prev => {
            if (newWord) {
                prev.set('query', newWord);
            } else {
                prev.delete('query');
            }
            prev.set('page', '1');
            return prev;
        });
    };
    
    const updatePage = (newPage: number) => {
        setSearchParams(prev => {
            prev.set('page', newPage.toString());
            return prev;
        });
    };
    
    const updatePageSize = (newPageSize: number) => {
        setSearchParams(prev => {
            prev.set('pageSize', newPageSize.toString());
            prev.set('page', '1');
            return prev;
        });
    };
    
    const requestParams: SearchProductRequest = {
        typedWord,
        page,
        pageSize
    };
    
    return {
        requestParams,
        updateSearch,
        updatePage,
        updatePageSize,
    };
};