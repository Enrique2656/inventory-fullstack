var plus = document.getElementsByClassName("fa-plus-circle");
var minus = document.getElementsByClassName("fa-minus-circle");
var trash = document.getElementsByClassName("fa-trash");
var update = document.getElementsByClassName("update")

Array.from(plus).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.querySelector('.name').innerText
        const cat = this.parentNode.parentNode.querySelector('.cat').innerText
        const plus = parseFloat(this.parentNode.parentNode.querySelector('.plus').innerText)
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
    const name = this.parentNode.parentNode.querySelector('.name').innerText
    const cat = this.parentNode.parentNode.querySelector('.cat').innerText
    const plus = parseFloat(this.parentNode.parentNode.querySelector('.plus').innerText)
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

Array.from(update).forEach(function(element) {
  element.addEventListener('click', function(){
    const id = this.parentNode.children[0].value
    // const cat = this.parentNode.parentNode.querySelector('.cat').innerText
    const plus = parseFloat(this.parentNode.children[12].value)
    fetch('updateQty', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'id': id,
        // 'cat': cat,
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







// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.querySelector('.name').innerText
//         const cat = this.parentNode.parentNode.querySelector('.cat').innerText
//         const plus = parseFloat(this.parentNode.parentNode.querySelector('.plus').innerText)
//         fetch('delete', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'cat': cat
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });
