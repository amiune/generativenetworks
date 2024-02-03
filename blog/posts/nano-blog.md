# Nano Blog

Minimal javascript ajax blog for github pages using markdown for posts.

The goals of nano blog are:
- Easy to deploy (no installation or builds)
- Work with Github pages (free to host)
- Create the posts using markdown
- Can edit the posts using github web or app or your fav markdown editor

It consists of one html page and the following js script:

```javascript

const BLOG_URL = "YOUR_BLOG_URL"; 
const REPO_ADDRESS = "YOUR_GITHUB_REPOSITORY_ADDRESS"; // example: "amiune/nano-blog";

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
        .then((response) => response.text())
        .then((text) => {
            document.getElementById('content').innerHTML = md.render(text);
        })
    }
    else{
        // show blog list of posts
        url = REPO_URL + "git/trees/main?recursive=1";
        fetch(url)
            .then((response) => response.text())
            .then((text) => {
                const r = JSON.parse(text);
                files_list = r.tree;
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
                        a.setAttribute("href", BLOG_URL + "index.html#!" + post_name)
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

```