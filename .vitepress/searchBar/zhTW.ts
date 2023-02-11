import {DocSearchProps} from "vitepress/types/docsearch";

export const zhTWSearchBarLocale: Partial<DocSearchProps> = {
    placeholder: '搜尋文件',
    translations: {
        button: {
            buttonText: '搜尋文件',
            buttonAriaLabel: '搜尋文件'
        },
        modal: {
            searchBox: {
                resetButtonTitle: '清除查詢條件',
                resetButtonAriaLabel: '清除查詢條件',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消'
            },
            startScreen: {
                recentSearchesTitle: '搜尋歷史',
                noRecentSearchesText: '沒有搜尋歷史',
                saveRecentSearchButtonTitle: '儲存至搜尋歷史',
                removeRecentSearchButtonTitle: '從搜尋歷史中移除',
                favoriteSearchesTitle: '收藏',
                removeFavoriteSearchButtonTitle: '從收藏中移除'
            },
            errorScreen: {
                titleText: '無法獲取結果',
                helpText: '你可能需要檢查你的網路連線'
            },
            footer: {
                selectText: '選擇',
                navigateText: '切換',
                closeText: '關閉',
                searchByText: '搜尋提供者'
            },
            noResultsScreen: {
                noResultsText: '無法找到相關結果',
                suggestedQueryText: '你可以嘗試查詢',
                reportMissingResultsText: '你認為該查詢應該有結果？',
                reportMissingResultsLinkText: '點選反饋'
            }
        }
    }
};
