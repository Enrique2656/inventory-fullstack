var plus = document.getElementsByClassName("fa-plus-circle");
var minus = document.getElementsByClassName("fa-minus-circle");
var trash = document.getElementsByClassName("fa-trash");

Array.from(plus).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const cat = this.parentNode.parentNode.childNodes[3].innerText
        const plus = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('inventory', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'cat': cat,
            'plus':plus
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});
Array.from(minus).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const cat = this.parentNode.parentNode.childNodes[3].innerText
    const plus = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    fetch('minusQty', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'cat': cat,
        'plus':plus
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});



Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const cat = this.parentNode.parentNode.childNodes[3].innerText
        fetch('delete', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'cat': cat
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
