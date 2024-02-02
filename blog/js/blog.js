// https://github.com/showdownjs/showdown
// https://github.com/markdown-it/markdown-it
// https://stackoverflow.com/questions/69595539/how-to-get-some-markdown-from-an-external-resource-and-render-it-to-an-html-page

function makeTitle(slug) {
    var words = slug.split('-');
  
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
  
    return words.join(' ');
  }

function reload_page(){
    
    blog_url = "https://www.generativenetworks.com/blog/";
    url = window.location.href;
    markdown_to_fetch = "";

    if(url.includes("#!")){
        // show blog post
        post_name = url.split("#!")[1];
        markdown_to_fetch = blog_url + "posts/" + post_name + ".md";

        var md = window.markdownit(); 
        fetch(markdown_to_fetch)
        .then((response) => response.text())
        .then((text) => {
            document.getElementById('content').innerHTML = md.render(text);
        })
    }
    else{
        // show blog list of posts
        url = "https://api.github.com/repos/amiune/generativenetworks/git/trees/main?recursive=1"
        fetch(url)
            .then((response) => response.text())
            .then((text) => {
                const r = JSON.parse(text);
                files_list = r.tree;
                let list = document.createElement("ul");
                for (let i = 0; i < files_list.length; i++) {
                    const element = files_list[i];
                    if(element.path.includes("posts/")){
                        let li = document.createElement('li');
                        let file_name = element.path.split("posts/")[1];
                        let post_name = file_name.replace(".md","");
                        let a = document.createElement('a');
                        a.innerText = makeTitle(post_name);
                        a.setAttribute("href", "https://www.generativenetworks.com/blog/blog.html#!" + post_name)
                        li.appendChild(a);
                        list.appendChild(li);
                    }
                }
                let div = document.createElement('div');
                let h1 = document.createElement('h1');
                h1.innerText = "Generative Networks Blog";
                div.appendChild(h1);
                div.appendChild(list);
                document.getElementById('content').innerHTML = div.innerHTML;
            });
    }
        
    
}

window.addEventListener('popstate', function (event) {
    reload_page();
});

reload_page()

