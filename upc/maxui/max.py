from Products.CMFCore.utils import getToolByName
from pas.plugins.preauth.interfaces import IPreauthTask, IPreauthHelper
from plone.registry.interfaces import IRegistry
from zope.component import queryUtility
from zope.interface import implements
from zope.component import adapts

from upc.maxui.browser.controlpanel import IMAXUISettings
from upc.maxclient import MaxClient

import requests
import json
import logging


def getToken(credentials, grant_type=None):
    user = credentials.get('login')
    password = credentials.get('password')
    registry = queryUtility(IRegistry)
    settings = registry.forInterface(IMAXUISettings, check=False)
    # Pick grant type from settings unless passed as optonal argument
    effective_grant_type = grant_type != None and grant_type or settings.oauth_grant_type

    payload = {"grant_type": effective_grant_type,
               "client_id": "MAX",
               "scope": "widgetcli",
               "username": user,
               "password": password
               }

    ## TODO: Do we need to ask for a token always?
    r = requests.post(settings.oauth_token_endpoint, data=payload, verify=False)
    response = json.loads(r.text)
    return response.get("oauth_token")


class oauthTokenRetriever(object):
    implements(IPreauthTask)
    adapts(IPreauthHelper)

    def __init__(self, context):
        self.context = context

    def execute(self, credentials):
        logger = logging.getLogger('upc.maxui')
        user = credentials.get('login')

        if user == "admin":
            return

        oauth_token = getToken(credentials)

        pm = getToolByName(self.context, "portal_membership")
        member = pm.getMemberById(user)
        member.setMemberProperties({'oauth_token': oauth_token})

        logger.info('oAuth token set for user: %s ' % user)


class maxUserCreator(object):
    implements(IPreauthTask)
    adapts(IPreauthHelper)

    def __init__(self, context):
        self.context = context

    def execute(self, credentials):
        logger = logging.getLogger('upc.maxui')
        user = credentials.get('login')
        registry = queryUtility(IRegistry)
        settings = registry.forInterface(IMAXUISettings, check=False)

        if user == "admin":
            return

        # max = MaxClient(settings.max_server, auth_method="basic")
        # max.setBasicAuth(settings.max_ops_username, settings.max_ops_password)
        # result = max.addUser(user)

        # if not result:
        #     logger.info('Error creating MAX user for user: %s' % user)
        # else:
        #     logger.info('MAX user created for user: %s' % user)
        #     max.setActor(user)
        #     max.subscribe(getToolByName(self.context, "portal_url").getPortalObject().absolute_url())
