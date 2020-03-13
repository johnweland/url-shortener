let clipboard = document.getElementsByClassName('fa-clipboard');

for(let i=0; i< clipboard.length; i++){
    clipboard[i].onclick = function() { 
        let url = this.getAttribute('data-url');
        let textarea = document.createElement("textarea");
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
        } catch (err) {
            console.log('Oops, unable to copy');
        }
        document.body.removeChild(textarea);
    }
}



