// https://github.com/showdownjs/showdown
// https://github.com/markdown-it/markdown-it
// https://stackoverflow.com/questions/69595539/how-to-get-some-markdown-from-an-external-resource-and-render-it-to-an-html-page

blog_url = "https://www.generativenetworks.com/blog/";
url = window.location.href;
markdown_to_fetch = "";

if(url.includes("#!")){
    // show blog post
    post_name = url.split("#!")[1];
    markdown_to_fetch = blog_url + post_name + ".md";
}
else{
    // show blog list of posts
    markdown_to_fetch = blog_url + "postlist.md";
}

var md = window.markdownit(); 

fetch(markdown_to_fetch)
.then((response) => response.text())
.then((text) => {
    document.getElementById('post').innerHTML = md.render(text);
})