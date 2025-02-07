# 配置 Azure 应用

[[toc]]

## 开始配置

在开始之前, 您首先需要一个微软账号. 注册 Azure Active Directory 应用无需任何费用. 

使用您的微软账户登录 [Azure 门户](https://portal.azure.com/#home)
在完成登录后, 您看到的页面应该是这样的：

![Azure Portal](/img/projbobcat/installationAndConfig/configMSAuth/step_1.png)

点击 **Azure 服务** 下的 **Azure Active Directory**

![Azure AD](/img/projbobcat/installationAndConfig/configMSAuth/azure_ad.png)

您将会看到类似于下面的页面

![Azure Portal](/img/projbobcat/installationAndConfig/configMSAuth/step_2.png)

接着点击左侧功能栏的 **应用注册**：

![Azure Portal](/img/projbobcat/installationAndConfig/configMSAuth/reg_app.png)

点击顶部工具栏的 **新注册**, 填写应用的名称. 并且在 **受支持的账户类型** 中选择 **仅 Microsoft 个人账户**. 
由于我们不使用基于 URI 回调的认证方式. 因此, 您不需要填写表单下方的 **重定向 URI**. 

::: warning
请仔细核对表单中的信息, 否则可能会导致后续的步骤出现意料之外的问题. 
:::

![Azure Portal](/img/projbobcat/installationAndConfig/configMSAuth/step_3.png)

点击创建后, 等待 Azure AD 完成应用的创建. 在创建完成后, 网页会将您重定向至该应用的详细页面：

![Azure Portal](/img/projbobcat/installationAndConfig/configMSAuth/step_4.png)

接着点击左侧栏的 **身份验证**：

![Azure Portal](/img/projbobcat/installationAndConfig/configMSAuth/identity_verification.png)

接着在右侧找到 **高级设置** 板块, 确保板块中的 **高级 SDK 支持** 和 **允许公共客户端流** 为开启状态. 
如果他们没有开启, 请手动将他们打开. 

![Azure Portal](/img/projbobcat/installationAndConfig/configMSAuth/id_advanced_settings.png)

接着点击下方的保存按钮, 等待保存完成. 

## 查看 Client ID

恭喜！您已经完成了 Azure 的应用注册, 接下来您只需要前往 **概述** 页面查看应用的 Client ID. 
点击左侧栏的 **概述** 按钮, 即可查看应用的基础信息：

![Azure Portal](/img/projbobcat/installationAndConfig/configMSAuth/about.png)

在右侧您会看到应用的详细信息, 在 **概要** 中找到 **应用程序(客户端) ID**, 
该 ID 将是您需要在 [微软验证器配置](/zhCN/projbobcat/installationAndConfig) 阶段需要使用到的 Client ID. 

![Azure Portal](/img/projbobcat/installationAndConfig/configMSAuth/about_block.png)
