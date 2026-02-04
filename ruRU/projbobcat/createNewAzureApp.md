# Настройка приложения Azure

[[toc]]

## Начало настройки

Прежде чем начать, вам понадобится учетная запись Microsoft. Регистрация приложения в Azure Active Directory бесплатна.

Войдите на [портал Azure](https://portal.azure.com/#home) с помощью своей учетной записи Microsoft.
После входа вы должны увидеть страницу, подобную этой:

![Портал Azure](/img/projbobcat/installationAndConfig/configMSAuth/step_1.png)

Нажмите **Azure Active Directory** в разделе **Службы Azure**.

![Azure AD](/img/projbobcat/installationAndConfig/configMSAuth/azure_ad.png)

Вы увидите страницу, похожую на следующую:

![Портал Azure](/img/projbobcat/installationAndConfig/configMSAuth/step_2.png)

Затем нажмите **Регистрация приложений** в левой панели функций:

![Портал Azure](/img/projbobcat/installationAndConfig/configMSAuth/reg_app.png)

Нажмите **Новая регистрация** на верхней панели инструментов, введите имя приложения. И выберите **Только личные учетные записи Microsoft** в разделе **Поддерживаемые типы учетных записей**.
Поскольку мы не используем аутентификацию на основе обратного вызова URI, вам не нужно заполнять **URI перенаправления** в нижней части формы.

::: warning
Пожалуйста, внимательно проверьте информацию в форме, иначе на последующих шагах могут возникнуть непредвиденные проблемы.
:::

![Портал Azure](/img/projbobcat/installationAndConfig/configMSAuth/step_3.png)

Нажмите "Создать" и дождитесь, пока Azure AD завершит создание приложения. После завершения создания веб-страница перенаправит вас на страницу сведений о приложении:

![Портал Azure](/img/projbobcat/installationAndConfig/configMSAuth/step_4.png)

Затем нажмите **Аутентификация** на левой боковой панели:

![Портал Azure](/img/projbobcat/installationAndConfig/configMSAuth/identity_verification.png)

Затем найдите раздел **Дополнительные параметры** справа и убедитесь, что **Поддержка расширенного SDK** и **Разрешить общедоступные клиентские потоки** в этом разделе включены.
Если они не включены, включите их вручную.

![Портал Azure](/img/projbobcat/installationAndConfig/configMSAuth/id_advanced_settings.png)

Затем нажмите кнопку "Сохранить" ниже и дождитесь завершения сохранения.

## Просмотр Client ID

Поздравляем! Вы завершили регистрацию приложения Azure, теперь вам просто нужно перейти на страницу **Обзор**, чтобы просмотреть Client ID приложения.
Нажмите кнопку **Обзор** на левой боковой панели, чтобы просмотреть основную информацию о приложении:

![Портал Azure](/img/projbobcat/installationAndConfig/configMSAuth/about.png)

Справа вы увидите подробную информацию о приложении, найдите **ID приложения (клиента)** в **Сводке**.
Этот ID будет Client ID, который вам нужно будет использовать на этапе [настройки аутентификатора Microsoft](/ruRU/projbobcat/installationAndConfig).

![Портал Azure](/img/projbobcat/installationAndConfig/configMSAuth/about_block.png)
