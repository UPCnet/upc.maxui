/*
* json2
*/
var JSON;JSON||(JSON={});
(function(){function k(a){return a<10?"0"+a:a}function o(a){p.lastIndex=0;return p.test(a)?'"'+a.replace(p,function(a){var c=r[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function l(a,j){var c,d,h,m,g=e,f,b=j[a];b&&typeof b==="object"&&typeof b.toJSON==="function"&&(b=b.toJSON(a));typeof i==="function"&&(b=i.call(j,a,b));switch(typeof b){case "string":return o(b);case "number":return isFinite(b)?String(b):"null";case "boolean":case "null":return String(b);case "object":if(!b)return"null";
e+=n;f=[];if(Object.prototype.toString.apply(b)==="[object Array]"){m=b.length;for(c=0;c<m;c+=1)f[c]=l(c,b)||"null";h=f.length===0?"[]":e?"[\n"+e+f.join(",\n"+e)+"\n"+g+"]":"["+f.join(",")+"]";e=g;return h}if(i&&typeof i==="object"){m=i.length;for(c=0;c<m;c+=1)typeof i[c]==="string"&&(d=i[c],(h=l(d,b))&&f.push(o(d)+(e?": ":":")+h))}else for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(h=l(d,b))&&f.push(o(d)+(e?": ":":")+h);h=f.length===0?"{}":e?"{\n"+e+f.join(",\n"+e)+"\n"+g+"}":"{"+f.join(",")+
"}";e=g;return h}}if(typeof Date.prototype.toJSON!=="function")Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+k(this.getUTCMonth()+1)+"-"+k(this.getUTCDate())+"T"+k(this.getUTCHours())+":"+k(this.getUTCMinutes())+":"+k(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()};var q=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
p=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,e,n,r={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},i;if(typeof JSON.stringify!=="function")JSON.stringify=function(a,j,c){var d;n=e="";if(typeof c==="number")for(d=0;d<c;d+=1)n+=" ";else typeof c==="string"&&(n=c);if((i=j)&&typeof j!=="function"&&(typeof j!=="object"||typeof j.length!=="number"))throw Error("JSON.stringify");return l("",
{"":a})};if(typeof JSON.parse!=="function")JSON.parse=function(a,e){function c(a,d){var g,f,b=a[d];if(b&&typeof b==="object")for(g in b)Object.prototype.hasOwnProperty.call(b,g)&&(f=c(b,g),f!==void 0?b[g]=f:delete b[g]);return e.call(a,d,b)}var d,a=String(a);q.lastIndex=0;q.test(a)&&(a=a.replace(q,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return d=eval("("+a+")"),typeof e==="function"?c({"":d},""):d;throw new SyntaxError("JSON.parse");}})();
/*
* jquery.iecors.js
*/
(function(b){b.ajaxSettings.xdr=function(){return window.XDomainRequest?new window.XDomainRequest:null};(function(a){b.extend(b.support,{iecors:!!a})})(b.ajaxSettings.xdr());b.support.iecors&&b.ajaxTransport(function(a){return{send:function(b,d){var c=a.xdr();c.onload=function(){d(200,"OK",{text:c.responseText},{"Content-Type":c.contentType})};if(a.xhrFields)xhr.onerror=a.xhrFields.error,xhr.ontimeout=a.xhrFields.timeout;c.open(a.type,a.url);c.send(a.hasContent&&a.data||null)},abort:function(){xdr.abort()}}})})(jQuery);
/*
* jquery.easydate.js
*/
(function(b){function e(f,b,a){!isNaN(b)&&b!=1&&(f+="s");return a.locale[f]||f}b.easydate={};b.easydate.locales={};b.easydate.locales.enUS={future_format:"%s %t",past_format:"%t %s",second:"second",seconds:"seconds",minute:"minute",minutes:"minutes",hour:"hour",hours:"hours",day:"day",days:"days",week:"week",weeks:"weeks",month:"month",months:"months",year:"year",years:"years",yesterday:"yesterday",tomorrow:"tomorrow",now:"just now",ago:"ago","in":"in"};var i={live:!0,set_title:!0,format_future:!0,
format_past:!0,units:[{name:"now",limit:5},{name:"second",limit:60,in_seconds:1},{name:"minute",limit:3600,in_seconds:60},{name:"hour",limit:86400,in_seconds:3600},{name:"yesterday",limit:172800,past_only:!0},{name:"tomorrow",limit:172800,future_only:!0},{name:"day",limit:604800,in_seconds:86400},{name:"week",limit:2629743,in_seconds:604800},{name:"month",limit:31556926,in_seconds:2629743},{name:"year",limit:Infinity,in_seconds:31556926}],uneasy_format:function(b){return b.toLocaleDateString()},locale:b.easydate.locales.enUS};
b.easydate.format_date=function(f,h){var a=b.extend({},i,h),c=((new Date).getTime()-f.getTime())/1E3,g=Math.abs(c);if(!isNaN(c)&&!(!a.format_future&&c<0||!a.format_past&&c>0)){for(var j in a.units){var d=a.units[j];if(!(d.past_only&&c<0||d.future_only&&c>0)&&g<d.limit){if(isNaN(d.in_seconds))return e(d.name,NaN,a);g/=d.in_seconds;g=Math.round(g);return(c<0?e("future_format",NaN,a).replace("%s",e("in",NaN,a)):e("past_format",NaN,a).replace("%s",e("ago",NaN,a))).replace("%t",g+" "+e(d.name,g,a))}}return a.uneasy_format(f)}}})(jQuery);
/*
* hogan.js
*/
var HoganTemplate=function(){function n(a){this.text=a}n.prototype={r:function(){return""},v:function(a){a=String(a===null?"":a);return s.test(a)?a.replace(u,"&amp;").replace(v,"&lt;").replace(w,"&gt;").replace(l,"&#39;").replace(j,"&quot;"):a},render:function(a,c,f){return this.r(a,c,f)},rp:function(a,c,f,e){a=f[a];return!a?"":a.r(c,f,e)},rs:function(a,c,f){var e="",g=a[a.length-1];if(!p(g))return f(a,c);for(var b=0;b<g.length;b++)a.push(g[b]),e+=f(a,c),a.pop();return e},s:function(a,c,f,e,g,b,i){if(p(a)&&
a.length===0)return!1;!e&&typeof a=="function"&&(a=this.ls(a,c,f,g,b,i));f=a===""||!!a;!e&&f&&c&&c.push(typeof a=="object"?a:c[c.length-1]);return f},d:function(a,c,f,e){var g=a.split("."),b=this.f(g[0],c,f,e),i=null;if(a==="."&&p(c[c.length-2]))return c[c.length-1];for(a=1;a<g.length;a++)b&&typeof b=="object"&&g[a]in b?(i=b,b=b[g[a]]):b="";if(e&&!b)return!1;!e&&typeof b=="function"&&(c.push(i),b=this.lv(b,c,f),c.pop());return b},f:function(a,c,f,e){for(var g=!1,b=null,i=!1,m=c.length-1;m>=0;m--)if((b=
c[m])&&typeof b=="object"&&a in b){g=b[a];i=!0;break}if(!i)return e?!1:"";!e&&typeof g=="function"&&(g=this.lv(g,c,f));return g},ho:function(a,c,f,e,g){a=a.call(c,e,function(b){return Hogan.compile(b,{delimiters:g}).render(c,f)});this.b=Hogan.compile(a.toString(),{delimiters:g}).render(c,f);return!1},b:"",ls:function(a,c,f,e,g,b){var c=c[c.length-1],i=a.call(c);return a.length>0?this.ho(a,c,f,this.text.substring(e,g),b):typeof i=="function"?this.ho(i,c,f,this.text.substring(e,g),b):i},lv:function(a,
c,f){c=c[c.length-1];return Hogan.compile(a.call(c).toString()).render(c,f)}};var u=/&/g,v=/</g,w=/>/g,l=/\'/g,j=/\"/g,s=/[&<>\"\']/,p=Array.isArray||function(a){return Object.prototype.toString.call(a)==="[object Array]"};return n}(),Hogan=function(){function n(b,a){function m(){o.length>0&&(k.push(new String(o)),o="")}function c(b,a){m();var d;if(d=b)a:{d=!0;for(var i=n;i<k.length;i++)if(d=k[i].tag&&g[k[i].tag]<g._v||!k[i].tag&&k[i].match(p)===null,!d){d=!1;break a}}if(d){d=n;for(var f;d<k.length;d++)if(!k[d].tag){if((f=
k[d+1])&&f.tag==">")f.indent=k[d].toString();k.splice(d,1)}}else a||k.push({tag:"\n"});j=!1;n=k.length}function d(b,a){var d="="+q,m=b.indexOf(d,a),c=u(b.substring(b.indexOf("=",a)+1,m)).split(" ");r=c[0];q=c[1];return m+d.length-1}var f=b.length,e=0,t=null,l=null,o="",k=[],j=!1,h=0,n=0,r="{{",q="}}";a&&(a=a.split(" "),r=a[0],q=a[1]);for(h=0;h<f;h++)e==0?v(r,b,h)?(--h,m(),e=1):b.charAt(h)=="\n"?c(j):o+=b.charAt(h):e==1?(h+=r.length-1,t=(l=g[b.charAt(h+1)])?b.charAt(h+1):"_v",t=="="?(h=d(b,h),e=0):
(l&&h++,e=2),j=h):v(q,b,h)?(k.push({tag:t,n:u(o),otag:r,ctag:q,i:t=="/"?j-q.length:h+r.length}),o="",h+=q.length-1,e=0,t=="{"&&h++):o+=b.charAt(h);c(j,!0);return k}function u(b){return b.trim?b.trim():b.replace(/^\s*|\s*$/g,"")}function v(b,a,m){if(a.charAt(m)!=b.charAt(0))return!1;for(var c=1,d=b.length;c<d;c++)if(a.charAt(m+c)!=b.charAt(c))return!1;return!0}function w(b,a,c,f){for(var a=[],d=null,e=null;b.length>0;){e=b.shift();if(!(d=e.tag=="#"))if(!(d=e.tag=="^"))a:{for(var d=e,g=f,j=0,l=g.length;j<
l;j++)if(g[j].o==d.n){d.tag="#";d=!0;break a}d=void 0}if(d)c.push(e),e.nodes=w(b,e.tag,c,f),a.push(e);else if(e.tag=="/"){if(c.length===0)throw Error("Closing tag without opener: /"+e.n);d=c.pop();if(b=e.n!=d.n){var o;a:{b=0;for(c=f.length;b<c;b++)if(f[b].c==e.n&&f[b].o==d.n){o=!0;break a}}b=!o}if(b)throw Error("Nesting error: "+d.n+" vs. "+e.n);d.end=e.i;return a}else a.push(e)}if(c.length>0)throw Error("missing closing tag: "+c.pop().n);return a}function l(b){return b.replace(e,"\\\\").replace(a,
'\\"').replace(c,"\\n").replace(f,"\\r")}function j(b){return~b.indexOf(".")?"d":"f"}function s(b){for(var a="",c=0,e=b.length;c<e;c++){var d=b[c].tag;if(d=="#"){var d=b[c].nodes,f=j(b[c].n),g=b[c].i,n=b[c].end,p=b[c].otag+" "+b[c].ctag,d="if(_.s(_."+f+'("'+l(b[c].n)+'",c,p,1),c,p,0,'+g+","+n+', "'+p+'")){b += _.rs(c,p,function(c,p){ var b = "";'+s(d)+'return b;});c.pop();}else{b += _.b; _.b = ""};';a+=d}else d=="^"?(d=b[c].nodes,d="if (!_.s(_."+j(b[c].n)+'("'+l(b[c].n)+'",c,p,1),c,p,1,0,0,"")){'+
s(d)+"};",a+=d):d=="<"||d==">"?a+='b += _.rp("'+l(b[c].n)+'",c[c.length - 1],p,"'+(b[c].indent||"")+'");':d=="{"||d=="&"?(d="b += (_."+j(b[c].n)+'("'+l(b[c].n)+'",c,p,0));',a+=d):d=="\n"?a+='b += "\\n"'+(b.length-1==c?"":" + i")+";":d=="_v"?(d="b += (_.v(_."+j(b[c].n)+'("'+l(b[c].n)+'",c,p,0)));',a+=d):d===void 0&&(d='"'+l(b[c])+'"',a+="b += "+d+";")}return a}var p=/\S/,a=/\"/g,c=/\n/g,f=/\r/g,e=/\\/g,g={"#":1,"^":2,"/":3,"!":4,">":5,"<":6,"=":7,_v:8,"{":9,"&":10};return{scan:n,parse:function(b,a){a=
a||{};return w(b,"",[],a.sectionTags||[])},cache:{},compile:function(b,a){var a=a||{},c=this.cache[b];if(c)return c;var e=this.parse(n(b,a.delimiters),a),c=a,e='i = i || "";var c = [cx];var b = i + "";var _ = this;'+s(e)+"return b;";c.asString?c="function(cx,p,i){"+e+";}":(c=new HoganTemplate(b),c.r=new Function("cx","p","i",e));return this.cache[b]=c}}}();
if(typeof module!=="undefined"&&module.exports)module.exports=Hogan,module.exports.Template=HoganTemplate;else if(typeof define==="function"&&define.amd)define(function(){return Hogan});else if(typeof exports!=="undefined")exports.Hogan=Hogan,exports.HoganTemplate=HoganTemplate;
/*
* max.templates.js
*/
var MSTCH_MAXUI_MAIN_UI='<div id="maxui-container">{{#username}}   <div id="maxui-newactivity">       <textarea>{{newActivityText}}</textarea>       <input type="button" class="send" value="{{newActivitySendButton}}">   </div>   <div id="maxui-timeline">      <div class="wrapper">          <div id="maxui-activities">          </div>      </div>   </div>  </div>{{/username}}{{^username}}  No s\'ha definit cap usuari{{/username}}</div>',MSTCH_MAXUI_ACTIVITIES='{{#activities}}<div class="maxui-activity" activityid="{{id}}" userid="{{actor.id}}" displayname="{{actor.displayName}}">    <div class="maxui-avatar">        <img src="{{#avatarURL}}{{actor.displayName}}{{/avatarURL}}">    </div>    <div class="maxui-activity-content">        <div>          <span class="maxui-displayname">{{actor.displayName}}</span>          <span class="maxui-username">{{actor.displayName}}</span>        </div>        <div>            <p class="maxui-body">{{object.content}}</p>        </div>        <div class="maxui-publisheddate">{{#formattedDate}}{{published}}{{/formattedDate}}</div>    </div>    <div class="maxui-footer">        <div class="maxui-actions">            <ul>                <li><span class="maxui-commentaction">Comentaris  {{#replies}}({{replies.totalItems}}){{/replies}}</span></li>            </ul>        </div>    </div>    <div class="maxui-comments" style="display: none">        <div class="maxui-commentsbox">            {{#replies.items}}            <div class="maxui-comment" commentid="{{id}}" userid="{{author.id}}" displayname="{{author.displayName}}">                <div class="maxui-avatar">                    <img src="{{#avatarURL}}{{author.displayName}}{{/avatarURL}}">                </div>                <div class="maxui-activity-content">                    <div>                      <span class="maxui-displayname">{{author.displayName}}</span>                      <span class="maxui-username">{{author.displayName}}</span>                    </div>                    <div>                        <p class="maxui-body">{{content}}</p>                    </div>                    <\!--div class="maxui-publisheddate"></div--\>                </div>            </div>            {{/replies.items}}        </div>        <div class="maxui-newcommentbox">            <div class="maxui-newcommentBoxContainer">                <textarea class="maxui-commentBox"></textarea>            </div>            <div class="maxui-newcommentbutton">                <input type="button" class="send" value="Envia comentari"/>            </div>        </div>    </div>    <div class="maxui-clear"></div></div>{{/activities}}',
MSTCH_MAXUI_COMMENTS='{{#replies.items}}<div class="maxui-comment" commentid="{{id}}" userid="{{author.id}}" displayname="{{author.displayName}}">    <div class="maxui-avatar">        <img src="{{#avatarURL}}{{author.displayName}}{{/avatarURL}}">    </div>    <div class="maxui-activity-content">        <div>          <span class="maxui-displayname">{{author.displayName}}</span>          <span class="maxui-username">{{author.displayName}}</span>        </div>        <div>            <p class="maxui-body">{{content}}</p>        </div>        <div class="maxui-publisheddate">{{#formattedDate}}{{published}}{{/formattedDate}}</div>    </div></div>{{/replies.items}}',
MAXUI_MAIN_UI=Hogan.compile(MSTCH_MAXUI_MAIN_UI),MAXUI_ACTIVITIES=Hogan.compile(MSTCH_MAXUI_ACTIVITIES),MAXUI_COMMENTS=Hogan.compile(MSTCH_MAXUI_COMMENTS);
/*
* max.client.js
*/
String.prototype.format=function(){var a=arguments;return this.replace(/\{\d+\}/g,function(b){return a[b.match(/\d+/)]})};
function MaxClient(a){this.url=a;this.mode="jquery";this.ROUTES={users:"/people",user:"/people/{0}",avatar:"/people/{0}/avatar",user_activities:"/people/{0}/activities",timeline:"/people/{0}/timeline",user_comments:"/people/{0}/comments",user_shares:"/people/{0}/shares",user_likes:"/people/{0}/likes",follows:"/people/{0}/follows",follow:"/people/{0}/follows/{1}",subscriptions:"/people/{0}/subscriptions",activities:"/activities",activity:"/activities/{0}",comments:"/activities/{0}/comments",comment:"/activities/{0}/comments/{1}",
likes:"/activities/{0}/likes",like:"/activities/{0}/likes/{1}",shares:"/activities/{0}/shares",share:"/activities/{0}/shares/{1}"}}MaxClient.prototype.setMode=function(a){this.mode=a};MaxClient.prototype.setActor=function(a){this.actor={objectType:"person",displayName:a}};
MaxClient.prototype.POST=function(a,b,c){resource_uri="{0}{1}".format(this.url,a);this.mode=="jquery"?$.ajax({url:resource_uri,success:function(a){c.call(a.data)},type:"POST",data:JSON.stringify(b),async:!0,dataType:"jsonj"}):(a={},a[gadgets.io.RequestParameters.CONTENT_TYPE]=gadgets.io.ContentType.JSON,a[gadgets.io.RequestParameters.METHOD]=gadgets.io.MethodType.POST,a[gadgets.io.RequestParameters.REFRESH_INTERVAL]=1,a[gadgets.io.RequestParameters.POST_DATA]=JSON.stringify(b),gadgets.io.makeRequest(resource_uri,
function(a){c.call(a.data)},a));return!0};
MaxClient.prototype.GET=function(a,b){resource_uri="{0}{1}".format(this.url,a);if(this.mode=="jquery")$.ajax({url:resource_uri,success:function(a){b.call(a)},type:"GET",async:!0,dataType:"json"});else{var c={};c[gadgets.io.RequestParameters.CONTENT_TYPE]=gadgets.io.ContentType.JSON;c[gadgets.io.RequestParameters.METHOD]=gadgets.io.MethodType.GET;c[gadgets.io.RequestParameters.REFRESH_INTERVAL]=1;gadgets.io.makeRequest(resource_uri,function(a){b.call(a.data)},c)}return!0};
MaxClient.prototype.getUserAvatarURL=function(a){route=this.ROUTES.avatar.format(a);return imageurl="{0}{1}".format(this.url,route)};MaxClient.prototype.getUserTimeline=function(a,b){route=this.ROUTES.timeline.format(a);this.GET(route,b)};MaxClient.prototype.addComment=function(a,b,c){query={actor:{},verb:"post",object:{objectType:"comment",content:""}};query.actor=this.actor;query.object.content=a;route=this.ROUTES.comments.format(b);this.POST(route,query,c)};
MaxClient.prototype.addActivity=function(a,b){query={verb:"post",object:{objectType:"note",content:""}};query.object.content=a;route=this.ROUTES.user_activities.format(this.actor.displayName);this.POST(route,query,b)};MaxClient.prototype.follow=function(a){query={verb:"follow",object:{objectType:"person",displayName:""}};query.object.displayName=a;route=this.ROUTES.follow.format(this.actor.displayName,a);resp=this.POST(route,query)};
/*
* max.ui.js
*/
(function(b){b.fn.maxUI=function(a){var c=this,a=jQuery.extend({maxRequestsAPI:"jquery",newActivityText:"Write something ...",newActivitySendButton:"Post activity",maxServerURL:"http://max.beta.upcnet.es"},a);c.maxClient=new MaxClient(a.maxServerURL);c.maxClient.setMode(a.maxRequestsAPI);c.maxClient.setActor(a.username);a=MAXUI_MAIN_UI.render(a);c.html(a);c.printTimeline();b("#maxui-newactivity .send").click(function(){c.sendActivity()});b("#maxui-activities").on("click",".maxui-commentaction",function(){b(this).closest(".maxui-activity").find(".maxui-comments").toggle()});
b("#maxui-activities").on("click",".maxui-comments .send",function(a){a.preventDefault();var a=b(this).closest(".maxui-comments").find("textarea").val(),e=b(this).closest(".maxui-activity").attr("activityid");c.maxClient.addComment(a,e,function(){b("#activityContainer textarea").val("")})});return c};b.fn.Settings=function(){return settings};b.fn.sendActivity=function(){this.maxClient.addActivity(b("#maxui-newactivity textarea").val(),function(){b("#maxui-newactivity textarea").val("")})};b.fn.formatDate=
function(a){var c=new Date;if(a=a.match("^([-+]?)(\\d{4,})(?:-?(\\d{2})(?:-?(\\d{2})(?:[Tt ](\\d{2})(?::?(\\d{2})(?::?(\\d{2})(?:\\.(\\d{1,3})(?:\\d+)?)?)?)?(?:[Zz]|(?:([-+])(\\d{2})(?::?(\\d{2}))?)?)?)?)?)?$")){for(var d=[2,3,4,5,6,7,8,10,11],e=d.length-1;e>=0;--e)a[d[e]]=typeof a[d[e]]!="undefined"&&a[d[e]].length>0?parseInt(a[d[e]],10):0;a[1]=="-"&&(a[2]*=-1);d=Date.UTC(a[2],a[3]-1,a[4],a[5],a[6],a[7],a[8]);typeof a[9]!="undefined"&&a[9].length>0&&(d+=(a[9]=="+"?-1:1)*(a[10]*36E5+a[11]*6E4));a[2]>=
0&&a[2]<=99&&(d-=59958144E6);c.setTime(d);return formatted=b.easydate.format_date(c)}else return null};b.fn.printTimeline=function(){var a=this;this.maxClient.getUserTimeline(settings.username,function(){var c=MAXUI_ACTIVITIES.render({activities:this.items,formattedDate:function(){return function(b){b=this.published;return a.formatDate(b)}},avatarURL:function(){return function(){var b=this.hasOwnProperty("actor")?this.actor.displayName:this.author.displayName;return a.maxClient.getUserAvatarURL(b)}}});
b("#maxui-activities").html(c)})}})(jQuery);
/*
* max.loader.js
*/
window.setTimeout(function () {
    if(window._MAXUI.onReady && !window._MAXUI.hasRun){
        window._MAXUI.hasRun = true;
        _MAXUI.onReady();
    }
  },0)
