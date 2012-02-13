# -*- coding: utf-8 -*-

from Acquisition import aq_base, aq_inner

from Products.CMFCore.utils import getToolByName

from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile

from Products.statusmessages.interfaces import IStatusMessage

from plone.app.registry.browser import controlpanel

from plone.registry.interfaces import IRegistry

from zope.component import getMultiAdapter, queryUtility

from z3c.form import button
from z3c.form.browser.checkbox import SingleCheckBoxFieldWidget


from zope.interface import Interface
from zope import schema

from upc.maxui import UPCMAXUIMessageFactory as _


class IMAXUISettings(Interface):
    """Global oAuth settings. This describes records stored in the
    configuration registry and obtainable via plone.registry.
    """

    moderator_email = schema.ASCIILine(
        title=_(u'label_moderator_email', default=u'Moderator Email Address'),
        description=_(u'help_moderator_email',
                        default=u"Address to which moderator notifications "
                                u"will be sent."),
        required=False,
        )


class MAXUISettingsEditForm(controlpanel.RegistryEditForm):
    """MAXUI settings form.
    """
    schema = IMAXUISettings
    id = "MAXUISettingsEditForm"
    label = _(u"MAX UI settings")
    description = _(u"help_maxui_settings_editform",
                    default=u"Settings related to MAX, including OAuth server "
                             "endpoint and grant method.")

    def updateFields(self):
        super(MAXUISettingsEditForm, self).updateFields()

    def updateWidgets(self):
        super(MAXUISettingsEditForm, self).updateWidgets()

    @button.buttonAndHandler(_('Save'), name=None)
    def handleSave(self, action):
        data, errors = self.extractData()
        if errors:
            self.status = self.formErrorsMessage
            return
        changes = self.applyChanges(data)
        IStatusMessage(self.request).addStatusMessage(_(u"Changes saved"),
                                                      "info")
        self.context.REQUEST.RESPONSE.redirect("@@maxui-settings")

    @button.buttonAndHandler(_('Cancel'), name='cancel')
    def handleCancel(self, action):
        IStatusMessage(self.request).addStatusMessage(_(u"Edit cancelled"),
                                                      "info")
        self.request.response.redirect("%s/%s" % (self.context.absolute_url(),
                                                  self.control_panel_view))


class MAXUISettingsControlPanel(controlpanel.ControlPanelFormWrapper):
    """MAXUI settings control panel.
    """
    form = MAXUISettingsEditForm
    #index = ViewPageTemplateFile('controlpanel.pt')

    def settings(self):
        """Compose a string that contains all registry settings that are
           needed for the MAXUI control panel.
        """
        registry = queryUtility(IRegistry)
        settings = registry.forInterface(IMAXUISettings, check=False)
        wftool = getToolByName(self.context, "portal_workflow", None)
        wf = wftool.getChainForPortalType('Discussion Item')
        output = []

        # Globally enabled
        if settings.globally_enabled:
            output.append("globally_enabled")

        # Comment moderation
        if 'one_state_workflow' not in wf and \
        'comment_review_workflow' not in wf:
            output.append("moderation_custom")
        elif settings.moderation_enabled:
            output.append("moderation_enabled")

        # Anonymous comments
        if settings.anonymous_comments:
            output.append("anonymous_comments")

        # Invalid mail setting
        ctrlOverview = getMultiAdapter((self.context, self.request),
                                       name='overview-controlpanel')
        if ctrlOverview.mailhost_warning():
            output.append("invalid_mail_setup")

        # Workflow
        wftool = getToolByName(self.context, 'portal_workflow', None)
        discussion_workflow = wftool.getChainForPortalType('Discussion Item')[0]
        if discussion_workflow:
            output.append(discussion_workflow)

        # Merge all settings into one string
        return ' '.join(output)

    def mailhost_warning(self):
        """Returns true if mailhost is not configured properly.
        """
        # Copied from plone.app.controlpanel/plone/app/controlpanel/overview.py
        mailhost = getToolByName(aq_inner(self.context), 'MailHost', None)
        if mailhost is None:
            return True
        mailhost = getattr(aq_base(mailhost), 'smtp_host', None)
        email = getattr(aq_inner(self.context), 'email_from_address', None)
        if mailhost and email:
            return False
        return True

    def custom_comment_workflow_warning(self):
        """Returns a warning string if a custom comment workflow is enabled.
        """
        wftool = getToolByName(self.context, "portal_workflow", None)
        wf = wftool.getChainForPortalType('Discussion Item')
        if 'one_state_workflow' in wf or 'comment_review_workflow' in wf:
            return
        return True
