(function() {
    'use strict'
    insertNavBar('tasks')
    const urlSearchParams = new URLSearchParams(window.location.search);
    
    const projectId = urlSearchParams.get('id');

}())