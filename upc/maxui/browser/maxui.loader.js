
/*
* Defines a global namespace var to hold maxui stuff, and a function onReady that
* will be called as a result of the maxui code being completely loaded.
* Custom settings and instantiation of maxui MUST be done in the onReady function body
* Other calculations that needs maxui to be loaded MAY be done also in the onReady function body
*/


if (!window._MAXUI) {window._MAXUI = {}; }
window._MAXUI.onReady = function() {
    // This is called when the code has loaded.
    settings = {'newActivityText' : 'Escriu alguna cosa ...',
                'username' : _MAXUI.username,
                'oAuthToken' : _MAXUI.oauth_token,
                'maxServerURL' : _MAXUI.max_server,
                'avatarURLpattern' : _MAXUI.avatar_url,
                'activitiesSource' : 'activities',
                'contextFilter' : _MAXUI.contexts,
                'activitySource': 'activities'
               }

    $('#maxui-widget-container').maxUI(settings)
};

/*
* Loads the maxui code asynchronously
* The generated script tag will be inserted after the first existing script tag
* found in the document.
* Modify `mui_location` according to yout settings
*/

(function(d){
var mui_location = '++resource++max.ui.js'
var mui = d.createElement('script'); mui.type = 'text/javascript'; mui.async = true;
mui.src = mui_location
var s = d.getElementsByTagName('script')[0]; s.parentNode.insertBefore(mui, s);

}(document));