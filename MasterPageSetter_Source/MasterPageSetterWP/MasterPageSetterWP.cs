using System;
using System.Web.UI;
using Microsoft.SharePoint;
using System.Globalization;
using System.ComponentModel;
using System.Web.UI.WebControls.WebParts;

namespace MasterPageSetter
{
    [ToolboxItemAttribute(false)]
    public class MasterPageSetterWP : WebPart
    {
        string message;
        protected override void CreateChildControls()
        {
            SPWeb web;
            SPList list = null;
            SPListItem item = null;
            SPFile file = null;
            try
            {
                message = string.Empty;
                string listId = this.Page.Request.QueryString["ListId"];
                string itemId = this.Page.Request.QueryString["ItemId"];
                if ((!string.IsNullOrEmpty(listId)) && (!string.IsNullOrEmpty(itemId)))
                {
                    web = SPContext.Current.Web;
                    web.AllowUnsafeUpdates = true;
                    list = web.Lists.GetList(new Guid(listId), false);
                    if (list != null)
                    {
                        item = list.GetItemById(Int32.Parse(itemId, CultureInfo.CurrentCulture));
                        if (item != null)
                        {
                            file = item.File;
                            if (file != null)
                            {
                                if ((file.ServerRelativeUrl == web.MasterUrl) || (file.ServerRelativeUrl == web.CustomMasterUrl))
                                {
                                    throw new SPException("The selected master is the default. Choose a different one and try again.");
                                }
                                else
                                {
                                    web.MasterUrl = file.ServerRelativeUrl;
                                    web.CustomMasterUrl = file.ServerRelativeUrl;
                                    web.Update();
                                    web.AllowUnsafeUpdates = false;
                                    message = "Successfully set the default master page.";
                                }
                            }
                        }
                    }
                }
            }
            catch
            {
                throw;
            }
            finally
            {
                list = null;
                item = null;
                file = null;
            }
        }

        protected override void Render(HtmlTextWriter writer)
        {
            this.Controls.Clear();
            base.Render(writer);
            writer.Flush();
            writer.Write(message);            
        }

        protected override void RenderContents(HtmlTextWriter writer)
        {
            this.Controls.Clear();
            base.RenderContents(writer);            
            writer.Flush();
            writer.Write(string.Empty);            
        }
    }
}
