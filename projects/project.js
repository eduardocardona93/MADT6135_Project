(function() {
    'use strict'

    var members = [
        'Clara Water','Angel Mala','Dyvia Sri','Jose Jose','Mangarret'];

    function makeUL(array) {
        var list = document.createElement('ul');
        members.forEach(member => {
            var item = document.createElement('li');

            item.innerText = member;

            list.appendChild(item);
        });
    console.log(list);
        document.getElementById('teams').appendChild(list);
    }

    makeUL(members);
}())