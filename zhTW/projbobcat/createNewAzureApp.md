# 配置 Azure 應用

[[toc]]

## 開始配置

在開始之前, 您首先需要一個微軟賬號. 註冊 Azure Active Directory 應用無需任何費用. 

使用您的微軟賬戶登入 [Azure 門戶](https://portal.azure.com/#home)
在完成登入後, 您看到的頁面應該是這樣的：

![Azure Portal](/img/projbobcat/installationAndConfig/configMSAuth/step_1.png)

點選 **Azure 服務** 下的 **Azure Active Directory**

![Azure AD](/img/projbobcat/installationAndConfig/configMSAuth/azure_ad.png)

您將會看到類似於下面的頁面

![Azure Portal](/img/projbobcat/installationAndConfig/configMSAuth/step_2.png)

接著點選左側功能欄的 **應用註冊**：

![Azure Portal](/img/projbobcat/installationAndConfig/configMSAuth/reg_app.png)

點選頂部工具欄的 **新註冊**, 填寫應用的名稱. 並且在 **受支援的賬戶型別** 中選擇 **僅 Microsoft 個人賬戶**. 
由於我們不使用基於 URI 回撥的認證方式. 因此, 您不需要填寫表單下方的 **重定向 URI**. 

::: warning
請仔細核對表單中的資訊, 否則可能會導致後續的步驟出現意料之外的問題. 
:::

![Azure Portal](/img/projbobcat/installationAndConfig/configMSAuth/step_3.png)

點選建立後, 等待 Azure AD 完成應用的建立. 在建立完成後, 網頁會將您重定向至該應用的詳細頁面：

![Azure Portal](/img/projbobcat/installationAndConfig/configMSAuth/step_4.png)

接著點選左側欄的 **身份驗證**：

![Azure Portal](/img/projbobcat/installationAndConfig/configMSAuth/identity_verification.png)

接著在右側找到 **高階設定** 板塊, 確保板塊中的 **高階 SDK 支援** 和 **允許公共客戶端流** 為開啟狀態. 
如果他們沒有開啟, 請手動將他們開啟. 

![Azure Portal](/img/projbobcat/installationAndConfig/configMSAuth/id_advanced_settings.png)

接著點選下方的儲存按鈕, 等待儲存完成. 

## 檢視 Client ID

恭喜！您已經完成了 Azure 的應用註冊, 接下來您只需要前往 **概述** 頁面檢視應用的 Client ID. 
點選左側欄的 **概述** 按鈕, 即可檢視應用的基礎資訊：

![Azure Portal](/img/projbobcat/installationAndConfig/configMSAuth/about.png)

在右側您會看到應用的詳細資訊, 在 **概要** 中找到 **應用程式(客戶端) ID**, 
該 ID 將是您需要在 [微軟驗證器配置](/zhTW/projbobcat/installationAndConfig) 階段需要使用到的 Client ID. 

![Azure Portal](/img/projbobcat/installationAndConfig/configMSAuth/about_block.png)
