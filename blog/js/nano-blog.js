/*!
 * Nano Blog
 * Minimal javascript ajax blog for github pages
 * using markdown for posts
 *
 * Developer: Hernan Amiune
 * Copyright - Licensed under MIT
 */

const BLOG_URL = "https://www.generativenetworks.com/blog/";
const REPO_ADDRESS = "amiune/generativenetworks";

function make_title(slug) {
    var words = slug.split('-');
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
    return words.join(' ');
  }

function reload_page(){
    
    url = window.location.href;
    markdown_to_fetch = "";

    if(url.includes("#!")){
        // show blog post
        post_name = url.split("#!")[1];
        markdown_to_fetch = BLOG_URL + "posts/" + post_name + ".md";

        var md = window.markdownit(); 

        fetch(markdown_to_fetch)
            .then(async (response) => {
                if (response.ok) {
                    text = await response.text()
                    document.getElementById('content').innerHTML = md.render(text);
                }
                else{
                    document.getElementById('content').innerHTML = md.render("# 404: Page not found");
                }
            })

        // fetch(markdown_to_fetch)
        // .then((response) => response.text())
        // .then((text) => {
        //     document.getElementById('content').innerHTML = md.render(text);
        // })
    }
    else{
        // show blog list of posts
        url = "https://api.github.com/repos/" + REPO_ADDRESS + "/git/trees/main?recursive=1";
        fetch(url)
            .then((response) => response.json())
            .then((json_response) => {
                files_list = json_response.tree;
                let list = document.createElement("ul");
                // show posts from oldest to newest
                for (let i = files_list.length - 1; i >= 0; i--) {
                    const element = files_list[i];
                    if(element.path.includes("posts/")){
                        let li = document.createElement('li');
                        let file_name = element.path.split("posts/")[1];
                        let post_name = file_name.replace(".md","");
                        let a = document.createElement('a');
                        a.innerText = make_title(post_name);
                        a.setAttribute("href", BLOG_URL + "#!" + post_name)
                        li.appendChild(a);
                        list.appendChild(li);
                    }
                }
                let div = document.createElement('div');
                let h1 = document.createElement('h1');
                h1.innerText = document.title;
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

