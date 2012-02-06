from zope.i18n import translate
from zope.publisher.browser import BrowserView

from Products.CMFCore.utils import getToolByName
from Products.CMFPlone import PloneMessageFactory as _


TEMPLATE = """\
var username = '%(username)s';
var oauth_token = '%(oauth_token)s';
"""

FORM_MODIFIED = _(u'text_form_modified_message',
    default=u'Your form has not been saved. All changes you have made will be lost.')

FORM_RESUBMIT = _(u'text_form_resubmit_message',
    default=u'You already clicked the submit button. Do you really want to submit this form again?')

AJAX_NORESPONSE = _(u'text_ajax_noresponse_message',
    default=u'No response from server. Please try again later.')


class MAXJSVariables(BrowserView):

    def __call__(self, *args, **kwargs):
        context = self.context
        response = self.request.response
        response.setHeader('content-type', 'text/javascript;;charset=utf-8')

        pm = getToolByName(context, "portal_membership")
        if pm.isAnonymousUser():  # the user has not logged in
            username = 'Anonymous'
        else:
            member = pm.getAuthenticatedMember()
            username = member.getUserName()
        member = pm.getMemberById(username)
        oauth_token = member.getProperty('oauth_token', None)

        # Per si de cas les necessitem
        # form_modified = translate(FORM_MODIFIED, context=self.request)
        # form_resubmit = translate(FORM_RESUBMIT, context=self.request)
        # ajax_noresponse = translate(AJAX_NORESPONSE, context=self.request)

        # # escape_for_js
        # form_modified = form_modified.replace("'", "\\'")
        # form_resubmit = form_resubmit.replace("'", "\\'")
        # ajax_noresponse = ajax_noresponse.replace("'", "\\'")

        return TEMPLATE % dict(
            username=username,
            oauth_token=oauth_token,
        )
