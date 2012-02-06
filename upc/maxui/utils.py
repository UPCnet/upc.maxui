from Products.CMFCore.utils import getToolByName
from pas.plugins.preauth.interfaces import IPreauthTask, IPreauthHelper
from zope.interface import implements
from zope.component import adapts

import requests
import json


class maxUserCreator(object):
    implements(IPreauthTask)
    adapts(IPreauthHelper)

    def __init__(self, context):
        self.context = context

    def execute(self, credentials):
        user = credentials.get('login')

        if user == "admin":
            return

        payload = {}

        r = requests.post('https://max.beta.upcnet.es/people/%s' % user, data=payload, verify=False)
        response = json.loads(r.text)
