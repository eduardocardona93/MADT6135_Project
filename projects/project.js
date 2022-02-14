(function() {
    'use strict'

    insertNavBar('projects');
    const urlSearchParams = new URLSearchParams(window.location.search);
    
    const projectId = urlSearchParams.get('id');
    
    var data = [];
    getAllUsers().forEach(user => {
        const currentUserLabel = (user.id === currentUser.id) ? "(Me)" : "";
        data.push( { name: user.name + currentUserLabel, id: user.id});
    });

    console.log(data);

    // var data = [
    //     { name: 'Chocolate', id: '#75523C' },
    //     { name: 'CadetBlue', id: '#3B8289' },
    //     { name: 'DarkOrange', id: '#FF843D' },
    //     { name: 'DarkRed', id: '#CA3832' },
    //     { name: 'Fuchsia', id: '#D44FA3' },
    //     { name: 'HotPink', id: '#F23F82' },
    //     { name: 'Indigo', id: '#2F5D81' },
    //     { name: 'LimeGreen', id: '#4CD242' },
    //     { name: 'OrangeRed', id: '#FE2A00' },
    //     { name: 'Tomato', id: '#FF745C' }
	// 	];

    // initialize MultiSelect component
    var amember = new ej.dropdowns.MultiSelect({
        // set the members data to dataSource property
        dataSource: data,
        // map the appropriate columns to fields property
        fields: { text: 'name', value: 'id' },

        // adding a default selected value to add the user who is creating the project
        value: [currentUser.id],
        
        // set the placeholder to MultiSelect input element
        placeholder: 'Click to see list of members',
        // set the type of mode for how to visualized the selected items in input element.
        mode: 'Box',
        // bind the tagging event
        tagging: function (e) {
            // set the current selected item text as class to chip element.
            e.setClass(e.itemData[amember.fields.text].toLowerCase());
        }
    });
	// render initialized multiSelect
    amember.appendTo('#select');

}())
