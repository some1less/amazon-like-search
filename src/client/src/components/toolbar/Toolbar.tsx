import { type FormEvent, useEffect, useState, useRef } from "react";
import './Toolbar.css';

interface Props {
    initialQuery: string;
    onSearch: (query: string) => void;
    page: number;
    onPageChange: (page: number) => void;
    pageSize: number;
    onPageSizeChange: (size: number) => void;
}

export const Toolbar = ({ initialQuery, onSearch, page, onPageChange, pageSize, onPageSizeChange }: Props) => {
    const [inputValue, setInputValue] = useState(initialQuery);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const filterWrapperRef = useRef<HTMLDivElement>(null);
    const settingsWrapperRef = useRef<HTMLDivElement>(null);

    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

    const [localPage, setLocalPage] = useState(page.toString());
    const [localPageSize, setLocalPageSize] = useState(pageSize.toString());

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [inputValue]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (filterWrapperRef.current && !filterWrapperRef.current.contains(target)) {
                setShowFilterDropdown(false);
            }

            if (settingsWrapperRef.current && !settingsWrapperRef.current.contains(target)) {
                setShowSettingsDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setLocalPage(page.toString());
    }, [page]);

    useEffect(() => {
        setLocalPageSize(pageSize.toString());
    }, [pageSize]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSearch(inputValue);
        setShowFilterDropdown(false);
        setShowSettingsDropdown(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as FormEvent);
        }
    };

    const handlePageBlurOrEnter = (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
        if (e.type === 'blur' || (e as React.KeyboardEvent).key === 'Enter') {
            const newPage = Math.max(1, parseInt(localPage) || 1);
            setLocalPage(newPage.toString());
            if (newPage !== page) onPageChange(newPage);
        }
    };

    const handlePageSizeBlurOrEnter = (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
        if (e.type === 'blur' || (e as React.KeyboardEvent).key === 'Enter') {
            const newSize = Math.max(1, parseInt(localPageSize) || 10);
            setLocalPageSize(newSize.toString());
            if (newSize !== pageSize) onPageSizeChange(newSize);
        }
    };

    const toggleFilterDropdown = () => {
        setShowFilterDropdown(!showFilterDropdown);
        setShowSettingsDropdown(false);
    }

    const toggleSettingsDropdown = () => {
        setShowSettingsDropdown(!showSettingsDropdown);
        setShowFilterDropdown(false);
    }

    return (
        <div className="toolbar-container">
            <form onSubmit={handleSubmit} className="combined-form">
                
                <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search for snacks, drinks, or any groceries..."
                    className="search-textarea"
                    rows={1}
                />

                <div className="bottom-controls">
                    <div className="filter-dropdown-wrapper" ref={filterWrapperRef}>
                        <button type="button" className="clean-btn" onClick={toggleFilterDropdown}>
                            Filters
                            <svg
                                className={`dropdown-icon ${showFilterDropdown ? 'open' : ''}`}
                                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>

                        <div className={`filter-dropdown ${showFilterDropdown ? 'show' : ''}`}>
                            <div className="filter-options-horizontal">
                                <button type="button" className="filter-option-btn">Brands</button>
                                <button type="button" className="filter-option-btn">Categories</button>
                            </div>
                        </div>
                    </div>

                    <div className="combined-actions">
                        <div className="settings-dropdown-wrapper" ref={settingsWrapperRef}>
                            <button type="button" className="clean-btn" onClick={toggleSettingsDropdown}>
                                Settings
                                <svg
                                    className={`dropdown-icon ${showSettingsDropdown ? 'open' : ''}`}
                                    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>

                            <div className={`settings-dropdown ${showSettingsDropdown ? 'show' : ''}`}>
                                <div className="settings-options-vertical">
                                    <label className="tool-label">
                                        Page:
                                        <input
                                            type="number"
                                            min="1"
                                            value={localPage}
                                            onChange={(e) => setLocalPage(e.target.value)}
                                            onBlur={handlePageBlurOrEnter}
                                            onKeyDown={handlePageBlurOrEnter}
                                            className="tool-number-input"
                                        />
                                    </label>

                                    <label className="tool-label">
                                        Size:
                                        <input
                                            type="number"
                                            min="1"
                                            value={localPageSize}
                                            onChange={(e) => setLocalPageSize(e.target.value)}
                                            onBlur={handlePageSizeBlurOrEnter}
                                            onKeyDown={handlePageSizeBlurOrEnter}
                                            className="tool-number-input"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="search-button">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="19" x2="12" y2="5"></line>
                                <polyline points="5 12 12 5 19 12"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};