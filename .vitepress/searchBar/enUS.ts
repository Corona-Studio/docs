import {DocSearchProps} from "vitepress/types/docsearch";

export const zhSearchBarLocale: Partial<DocSearchProps> = {
    placeholder: 'Search Documents',
    translations: {
        button: {
            buttonText: 'Search Documents',
            buttonAriaLabel: 'Search Documents'
        },
        modal: {
            searchBox: {
                resetButtonTitle: 'Clear Search Conditions',
                resetButtonAriaLabel: 'Clear Search Conditions',
                cancelButtonText: 'Cancel',
                cancelButtonAriaLabel: 'Cancel'
            },
            startScreen: {
                recentSearchesTitle: 'Search history',
                noRecentSearchesText: 'No histroy',
                saveRecentSearchButtonTitle: 'Save to search history',
                removeRecentSearchButtonTitle: 'Remove from search history',
                favoriteSearchesTitle: 'Favorites',
                removeFavoriteSearchButtonTitle: 'Delete favorite'
            },
            errorScreen: {
                titleText: 'Unable to get results',
                helpText: 'You might need to check your network connection'
            },
            footer: {
                selectText: 'Select',
                navigateText: 'Change',
                closeText: 'Close',
                searchByText: 'Search provider'
            },
            noResultsScreen: {
                noResultsText: 'Oops, No results found!',
                suggestedQueryText: 'You can try to search',
                reportMissingResultsText: 'Do you think this search should give you results?',
                reportMissingResultsLinkText: 'Click for feedback'
            }
        }
    }
};
