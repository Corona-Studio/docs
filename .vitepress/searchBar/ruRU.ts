import {DocSearchProps} from "vitepress/types/docsearch";

export const ruSearchBarLocale: Partial<DocSearchProps> = {
    placeholder: 'искать документы',
    translations: {
        button: {
            buttonText: 'искать документы',
            buttonAriaLabel: 'искать документы'
        },
        modal: {
            searchBox: {
                resetButtonTitle: 'четкие критерии запроса',
                resetButtonAriaLabel: 'четкие критерии запроса',
                cancelButtonText: 'Отмена',
                cancelButtonAriaLabel: 'Отмена'
            },
            startScreen: {
                recentSearchesTitle: 'история поиска',
                noRecentSearchesText: 'нет истории поиска',
                saveRecentSearchButtonTitle: 'Сохранить в историю поиска',
                removeRecentSearchButtonTitle: 'удалить из истории поиска',
                favoriteSearchesTitle: 'собирать',
                removeFavoriteSearchButtonTitle: 'удалить из Избранного'
            },
            errorScreen: {
                titleText: 'Не удалось получить результаты',
                helpText: 'Возможно, вам потребуется проверить подключение к Интернету.'
            },
            footer: {
                selectText: 'выбирать',
                navigateText: 'переключать',
                closeText: 'закрытие',
                searchByText: 'поисковый провайдер'
            },
            noResultsScreen: {
                noResultsText: 'Соответствующие результаты не найдены',
                suggestedQueryText: 'можно попробовать запросить',
                reportMissingResultsText: 'Как вы думаете, этот запрос должен иметь результаты?',
                reportMissingResultsLinkText: 'нажмите обратную связь'
            }
        }
    }
};
