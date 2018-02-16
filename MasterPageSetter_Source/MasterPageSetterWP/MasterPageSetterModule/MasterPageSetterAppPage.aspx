<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=14.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c"%>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
Master Page Setter Application Page
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderPageTitleInTitleArea" runat="server">
Master Page Setter Application Page
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
<style type="text/css">
#s4-ribbonrow, .ms-cui-topBar2, .s4-notdlg, .s4-pr s4-ribbonrowhidetitle, .s4-notdlg noindex, #ms-cui-ribbonTopBars, #s4-titlerow, #s4-pr s4-notdlg s4-titlerowhidetitle, #s4-leftpanel-content {display:none !important;}
    .s4-ca{margin-left:0px !important; margin-right:0px !important;}
</style>
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderLeftNavBar" runat="server"></asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
<WebPartPages:SPUserCodeWebPart 
    runat="server" 
    Description="Master Page Setter" 
    Title="Master Page Setter" 
    AssemblyFullName="$SharePoint.Project.AssemblyFullName$" 
    SolutionId="cc37e5d6-0643-42eb-9ad5-4f5b04f885e6" 
    ID="masterPageSetterWP"   TypeFullName="MasterPageSetter.MasterPageSetterWP" >
</WebPartPages:SPUserCodeWebPart>
</asp:Content>