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



let deleteBtn = document.getElementsByClassName('fa-trash');

for(let i=0; i< deleteBtn.length; i++){
    deleteBtn[i].onclick = function() { 
        let url = '/shorten/' + this.getAttribute('data-url');
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", url, true);
        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == "204") {
                location.reload();
            } else {
                console.error("Failed to remove URL");
            }
        }
        xhr.send();
    }
}
