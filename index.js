
var data = [
    {
        id: 10,
        name: "PARCEL1",
        sequence: 1,
        group: "Mumbai"
    },
    {
        id: 11,
        name: "PARCEL2",
        sequence: 2,
        group: "Mumbai"
    },
    {
        id: 13,
        name: "PARCEL3",
        sequence: 3,
        group: "Mumbai"
    },
    {
        id: 19,
        name: "PARCEL4",
        sequence: 4,
        group: "Delhi"
    },
    {
        id: 18,
        name: "PARCEL5",
        sequence: 5,
        group: "Delhi"
    },
    {
        id: 21,
        name: "PARCEL6",
        sequence: 6,
        group: "Kolkata"
    },
    {
        id: 12,
        name: "PARCEL7",
        sequence: 7,
        group: "Kolkata"
    },
    {
        id: 22,
        name: "PARCEL8",
        sequence: 8,
        group: "Kolkata"
    },
    {
        id: 23,
        name: "PARCEL9",
        sequence: 9,
        group: "Kolkata"
    },
    {
        id: 24,
        name: "PARCEL10",
        sequence: 10,
        group: "Mumbai"
    },
    {
        id: 25,
        name: "PARCEL11",
        sequence: 11,
        group: "Mumbai"
    },
    {
        id: 31,
        name: "PARCEL12",
        sequence: 12,
        group: "Mumbai"
    },
    {
        id: 34,
        name: "PARCEL13",
        sequence: 13,
        group: "Mumbai"
    },
    {
        id: 35,
        name: "PARCEL14",
        sequence: 14,
        group: "Delhi"
    },
    {
        id: 41,
        name: "PARCEL15",
        sequence: 15,
        group: "Delhi"
    },
    {
        id: 42,
        name: "PARCEL16",
        sequence: 16,
        group: "Delhi"
    },
    {
        id: 43,
        name: "PARCEL17",
        sequence: 17,
        group: "Delhi"
    },
    {
        id: 44,
        name: "PARCEL18",
        sequence: 18,
        group: "Kolkata"
    },
    {
        id: 53,
        name: "PARCEL19",
        sequence: 19,
        group: "Kolkata"
    },
    {
        id: 57,
        name: "PARCEL20",
        sequence: 20,
        group: "Kolkata"
    }
];


var mumbaiArr = [];
var delhiArr = [];
var kolkataArr = [];
var temp = [];
var globalArray = [];
var selectedParcel;


const mumbai_div = document.getElementById('mumbai_div');
const delhi_div = document.getElementById('delhi_div');
const kolkata_div = document.getElementById('kolkata_div');
const select = document.getElementById('groups');
const add_after = document.getElementById('add_after');
const add_before = document.getElementById('add_before');
const replace = document.getElementById('replace');
const deleteNode = document.getElementById('delete');
const refresh = document.getElementById('refresh');
const show_final = document.getElementById('show_final');
const nameField = document.getElementById('name');
const groups = document.getElementById('groups');

initialization();
function initialization() {
	data.map((e) => {
        if(e.group == 'Mumbai') {
        	mumbaiArr.push(e);
        }
		if(e.group == 'Delhi') {
        	delhiArr.push(e);
        }
		if(e.group == 'Kolkata') {
        	kolkataArr.push(e);
        }
	});
    temp.push(mumbaiArr);
    temp.push(delhiArr);
    temp.push(kolkataArr);
    globalArray = temp.flat();
    // console.log(globalArray);
    addDivsToDOM();

    addListeners();
}

function addDivsToDOM() {
    let mumbai_div = '';
    let delhi_div = '';
    let kolkata_div = '';
    globalArray.map((ele, index) => {
        if(ele.group == 'Mumbai') {
        	mumbai_div = mumbai_div + `<div id =${index+1} class=${ele.sequence} data-sequence=${ele.sequence} data-group=${ele.group}>${ele.name}</div>`;
        }
		if(ele.group == 'Delhi') {
        	delhi_div = delhi_div + `<div id =${index+1} class=${ele.sequence} data-sequence=${ele.sequence} data-group=${ele.group}>${ele.name}</div>`;
        }
		if(ele.group == 'Kolkata') {
        	kolkata_div = kolkata_div + `<div id =${index+1} class=${ele.sequence} data-sequence=${ele.sequence} data-group=${ele.group}>${ele.name}</div>`;
        }
    });
    document.getElementById('mumbai_div').innerHTML = mumbai_div;
    document.getElementById('delhi_div').innerHTML = delhi_div;
    document.getElementById('kolkata_div').innerHTML = kolkata_div;
}

function addListeners() {
    document.getElementById('mumbai_div').childNodes.forEach((child) => {
        child.addEventListener('click', (e) => {
            child.style.backgroundColor = "green";
            select.value = e.target.attributes[3].value;
            selectedParcel = e;
        })
    });
    document.getElementById('delhi_div').childNodes.forEach((child) => {
        child.addEventListener('click', (e) => {
            child.style.backgroundColor = "green";
            select.value = e.target.attributes[3].value;
            selectedParcel = e;
        })
    });
    document.getElementById('kolkata_div').childNodes.forEach((child) => {
        child.addEventListener('click', (e) => {
            child.style.backgroundColor = "green";
            select.value = e.target.attributes[3].value;
            selectedParcel = e;
        })
    });
}

add_after.addEventListener('click', (e) => {
    if(validation() === true) {
        const {obj, i} = computeObjectAndIndex();
    
        globalArray.splice(i+1, 0, obj);
        workAfterManipulation();
    }
});

add_before.addEventListener('click', (e) => {
    if(validation() === true) {
        const {obj, i} = computeObjectAndIndex();
        
        globalArray.splice(i, 0, obj);
        workAfterManipulation();
    }
});

replace.addEventListener('click', (e) => {
    if(validation() === true) {
        const i = computeObjectAndIndex().i;
        let obj = {id: 99, name: nameField.value, sequence: (globalArray[i]), group: select.value};
        globalArray[i] = obj;
        workAfterManipulation();
    }
});

deleteNode.addEventListener('click', (e) => {
    if(selectedParcel == undefined) {
        alert("Please select some parcel");
        return false
    }
    const i = computeObjectAndIndex().i;
    console.log(i);
    globalArray.splice(i, 1);
    workAfterManipulation();
});

show_final.addEventListener('click', (e) => {
    if(selectedParcel == undefined) {
        alert("Please select some parcel");
        return false
    }
    const i = computeObjectAndIndex().i;
    console.log(globalArray[i]);
});

function workAfterManipulation() {
    addDivsToDOM();
    addListeners();
    selectedParcel = null;
    nameField.value = '';
    select.value = 'none';
}

function computeObjectAndIndex() {
    let obj = {id: 99, name: nameField.value, sequence: (globalArray.length + 1), group: select.value};

    const i = globalArray.findIndex((val, index, arr) => {
        return val.sequence == selectedParcel.target.classList.value
    });

    return {obj, i};
}

function validation() {
    if(selectedParcel == undefined) {
        alert("Please select some parcel");
        return false
    }
    if(nameField.value === '') {
        alert('Please Enter the name');
        return false
    }
    return true;
}


