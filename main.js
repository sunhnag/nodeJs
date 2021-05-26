var http = require('http');
var fs = require('fs');
var url = require('url');   // 쿼리데이터의 시작점 url 모듈을 가져와야 한다.

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;    //쿼리데이터를 가져와서 queryData라는 변수에 담았다.
    var title = queryData.id;   //쿼리데이터에서 ?id = <--여기해 해당되는 값이 title이 된다. 이게 중요한 이유는 현재 생각으론 이값으로 나중에 페이지를 불러오고 페이지 중간에 제목들을 바꾸기 때문이다.
    if(_url == '/'){
      title = 'Welcome';    //여기서의 이 타이틀변수는 이 if문 안에서만 사용된다. 풀어서 말하자면 request.url 한게  / 와 같다면 웰컴을 타이틀 변수에 담는다. 그리고 이프문 빠져 나가서 순서대로 실행. 만약에 아니면 엘스문이 없으니 아무것도 하지말고 이프문을 빠져나가서 다음 코드 실행 이런 말이다. 이건 아직모르지만 만약에 list중에서 html을 누르면 다시 이곳에 있는 코들들이 순차적으로 실행되지 않을까 생각한다.
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    // 이 템플릿은 메인의 정적? 고정? 페이지가 된다. 앞으로 링크를 눌러 불러오게 될 페이지들은 어느한 div섹션에 뿌려지겠지..
    // template_literal에서 변수를 사용할때는 ${}하고 안에 변수 이름을 넣으면 된다.
    var template = `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <ol>
        <li><a href="/?id=HTML">HTML</a></li>
        <li><a href="/?id=CSS">CSS</a></li>
        <li><a href="/?id=JavaScript">JavaScript</a></li>
      </ol>
      <h2>${title}</h2>
      <p><a href="https://www.w3.org/TR/html5/" target="_blank" title="html5 speicification">Hypertext Markup Language (HTML)</a> is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
      <img src="coding.jpg" width="100%">
      </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets.
      </p>
    </body>
    </html>

    `;
    response.end(template);

});
app.listen(3000);
