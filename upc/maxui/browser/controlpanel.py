# -*- coding: utf-8 -*-

from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile

from Products.statusmessages.interfaces import IStatusMessage

from plone.app.registry.browser import controlpanel
from plone.registry.interfaces import IRegistry

from z3c.form import button

from zope.interface import Interface
from zope.component import queryUtility
from zope import schema

from upc.maxui import UPCMAXUIMessageFactory as _

from upc.maxclient import MaxClient
import logging
from Products.CMFCore.utils import getToolByName


DEFAULT_OAUTH_TOKEN_ENDPOINT = 'https://oauth.upc.edu/token'
DEFAULT_OAUTH_GRANT_TYPE = 'password'
DEFAULT_MAX_SERVER = 'https://max.beta.upcnet.es'
DEFAULT_MAX_OPS_USERNAME = 'operations'
DEFAULT_MAX_OPS_PASSWORD = 'operations'
DEFAULT_MAX_APP_USERNAME = 'appusername'
DEFAULT_MAX_APP_DISPLAYNAME = 'App Display Name'
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
                        default=u"Please, specify the MAX application agent username."),
        required=True,
        default=DEFAULT_MAX_APP_USERNAME
        )

    max_app_displayname = schema.ASCIILine(
        title=_(u'label_max_app_displayname', default=u'MAX application agent display Name'),
        description=_(u'help_max_app_displayname',
                        default=u"Please, specify the MAX application agent display Name."),
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

    max_app_token = schema.ASCIILine(
        title=_(u'label_max_app_token', default=u'MAX application token'),
        description=_(u'help_max_app_token',
                        default=u"Please, specify the MAX application token."),
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
        self.fields = self.fields.omit('max_app_token')

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
    def handleGetToken(self, action):
        data, errors = self.extractData()
        credentials = dict(login=data.get('max_app_username'),
                           password=data.get('max_app_password'))
        from upc.maxui.max import getToken
        logger = logging.getLogger('upc.maxui')

        #Authenticat to max as operations user
        maxcli = MaxClient(data.get('max_server'), auth_method="basic")
        maxcli.setBasicAuth(data.get('max_ops_username'), data.get('max_ops_password'))

        #Add App user to max
        result = maxcli.addUser(credentials['login'], displayName=data.get('max_app_displayname'))
        if not result:
            logger.info('Error creating MAX user for user: %s' % credentials['login'])
            IStatusMessage(self.request).addStatusMessage(_(u"An error occurred during creation of max user"), "info")
        else:
            logger.info('MAX Agent user %s created' % credentials['login'])
            # Request token for app user
            oauth_token = getToken(credentials, grant_type='password')
            registry = queryUtility(IRegistry)
            settings = registry.forInterface(IMAXUISettings, check=False)
            settings.max_app_token = str(oauth_token)

            #Subscribe app user to max
            club_url = getToolByName(self.context, "portal_url").getPortalObject().absolute_url()
            maxcli.setActor(credentials['login'])
            maxcli.subscribe(club_url)

            logger.info('MAX user %s subscribed to %s' % (credentials['login'], club_url))
            IStatusMessage(self.request).addStatusMessage(_(u"Token for MAX application user saved"), "info")


class MAXUISettingsControlPanel(controlpanel.ControlPanelFormWrapper):
    """MAXUI settings control panel.
    """
    form = MAXUISettingsEditForm
    index = ViewPageTemplateFile('controlpanel.pt')
