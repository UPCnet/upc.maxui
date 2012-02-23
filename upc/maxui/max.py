from Products.CMFCore.utils import getToolByName
from pas.plugins.preauth.interfaces import IPreauthTask, IPreauthHelper
from plone.registry.interfaces import IRegistry
from zope.component import queryUtility
from zope.interface import implements
from zope.component import adapts

from upc.maxui.browser.controlpanel import IMAXUISettings

import requests
import json
import logging


def getToken(credentials):
    user = credentials.get('login')
    password = credentials.get('password')
    registry = queryUtility(IRegistry)
    settings = registry.forInterface(IMAXUISettings, check=False)

    payload = {"grant_type": settings.oauth_grant_type,
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

        logger.info('oAuth token set for user: ' % user)


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

        payload = {}

        r = requests.post('%s/people/%s' % (settings.max_server, user),
                          auth=(settings.max_ops_username, settings.max_ops_password),
                          data=payload,
                          verify=False)

        if r.status_code == 200 or r.status_code == 201:
            logger.info('MAX user created for user: ' % user)
        else:
            logger.info('Error creating MAX user for user: ' % user)
