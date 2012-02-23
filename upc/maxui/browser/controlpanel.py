# -*- coding: utf-8 -*-

from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile

from Products.statusmessages.interfaces import IStatusMessage

from plone.app.registry.browser import controlpanel

from z3c.form import button

from zope.interface import Interface
from zope import schema

from upc.maxui import UPCMAXUIMessageFactory as _

DEFAULT_OAUTH_TOKEN_ENDPOINT = 'https://oauth.upc.edu/token'
DEFAULT_OAUTH_GRANT_TYPE = 'password'
DEFAULT_MAX_SERVER = 'https://max.beta.upcnet.es'
DEFAULT_MAX_OPS_USERNAME = 'operations'
DEFAULT_MAX_OPS_PASSWORD = 'operations'
DEFAULT_MAX_APP_USERNAME = 'apppass'
DEFAULT_MAX_APP_PASSWORD = 'apppass'


class IMAXUISettings(Interface):
    """Global oAuth settings. This describes records stored in the
    configuration registry and obtainable via plone.registry.
    """

    oauth_token_endpoint = schema.ASCIILine(
        title=_(u'label_oauth_token_endpoint', default=u'OAuth token endpoint'),
        description=_(u'help_oauth_token_endpoint',
                        default=u"Please, specify the URI for the oAuth token "
                                u"endpoint."),
        required=True,
        default=DEFAULT_OAUTH_TOKEN_ENDPOINT
        )

    oauth_grant_type = schema.ASCIILine(
        title=_(u'label_oauth_grant_type', default=u'OAuth grant type'),
        description=_(u'help_oauth_grant_type',
                        default=u"Please, specify the oAuth grant type."),
        required=True,
        default=DEFAULT_OAUTH_GRANT_TYPE
        )

    max_server = schema.ASCIILine(
        title=_(u'label_max_server', default=u'MAX Server URL'),
        description=_(u'help_max_server',
                        default=u"Please, specify the MAX Server URL."),
        required=True,
        default=DEFAULT_MAX_SERVER
        )

    max_ops_username = schema.ASCIILine(
        title=_(u'label_max_ops_username', default=u'MAX operations agent username'),
        description=_(u'help_max_ops_username',
                        default=u"Please, specify the MAX operations agent url."),
        required=True,
        default=DEFAULT_MAX_OPS_USERNAME
        )

    max_ops_password = schema.ASCIILine(
        title=_(u'label_max_ops_password', default=u'MAX operations agent password'),
        description=_(u'help_max_ops_password',
                        default=u"Please, specify the MAX operations agent password."),
        required=True,
        default=DEFAULT_MAX_OPS_PASSWORD
        )

    max_app_username = schema.ASCIILine(
        title=_(u'label_max_app_username', default=u'MAX application agent username'),
        description=_(u'help_max_app_username',
                        default=u"Please, specify the MAX application agent url."),
        required=True,
        default=DEFAULT_MAX_APP_USERNAME
        )

    max_app_password = schema.ASCIILine(
        title=_(u'label_max_app_password', default=u'MAX application agent password'),
        description=_(u'help_max_app_password',
                        default=u"Please, specify the MAX application agent password."),
        required=True,
        default=DEFAULT_MAX_APP_PASSWORD
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

    @button.buttonAndHandler(_(u'Get token'), name='getToken')
    def handleGetToken(self, action, data):
        credentials = dict(login=data.max_app_username,
                           password=data.max_app_password)
        from upc.maxui.max import getToken
        oauth_token = getToken(credentials)


class MAXUISettingsControlPanel(controlpanel.ControlPanelFormWrapper):
    """MAXUI settings control panel.
    """
    form = MAXUISettingsEditForm
    index = ViewPageTemplateFile('controlpanel.pt')
