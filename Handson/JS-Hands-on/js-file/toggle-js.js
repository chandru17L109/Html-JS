var employee = [
  {'Name': 'John','Id':'123456','Skills':'ReactJS, JS','Project':'Cognizant Internal','Hcm':'Alex','Gender':'male'},
  {'Name': 'Girl','Id':'123456','Skills':'Angular, JS','Project':'Cognizant Internal','Hcm':'Alex','Gender':'female'},
  {'Name': 'Girl','Id':'123456','Skills':'ReactJs, JS','Project':'Cognizant Internal','Hcm':'Alex','Gender':'female'},
  {'Name': 'Jimmy','Id':'234659','Skills':'ReactJS, JS','Project':'Cognizant Internal','Hcm':'Alex','Gender':'male'},
  {'Name': 'Joseph','Id':'234960','Skills':'Angular, JS','Project':'Cognizant Internal','Hcm':'Alex','Gender':'male'},
  {'Name': 'Jeni','Id':'313456','Skills':'ReactJs, JS','Project':'Cognizant Internal','Hcm':'Alex','Gender':'female'},
  {'Name': 'Jessi','Id':'323456','Skills':'ReactJs, JS','Project':'Cognizant Internal','Hcm':'Alex','Gender':'female'},
  {'Name': 'Joe','Id':'414659','Skills':'ReactJS, JS','Project':'Cognizant Internal','Hcm':'Alex','Gender':'male'},
  {'Name': 'Raji','Id':'424960','Skills':'Angular, JS','Project':'Cognizant Internal','Hcm':'Alex','Gender':'female'},
  {'Name': 'Rani','Id':'513456','Skills':'ReactJs, JS','Project':'Cognizant Internal','Hcm':'Alex','Gender':'female'},
];

employee_key = ['Name','Id','Skills','Project','Hcm'];
localStorage.setItem("employee", JSON.stringify(employee));

employee = localStorage.getItem("employee");
employee = JSON.parse(employee);

var No_of_grid = document.getElementsByClassName('grid-main').length;

// Image placeholder based on gender

for(let i=0;i<No_of_grid;i++){
  if(employee[i].Gender === 'male'){
    $('.grid-img-content' + i).html("");
    $('.grid-img-content' + i).append("<img src='Images/male.JPG'/> ");
  }else if(employee[i].Gender === 'female'){
    $('.grid-img-content' + i).html("");
    $('.grid-img-content' + i).append("<img src='Images/female.JPG' />");
  }
}

$(function(){
  //Onpageloading it saves the edited contents 
  onPageLoad();
});

function onPageLoad(){
  $(document).ready(function() {
    localStorage.setItem("employee", JSON.stringify(employee));
    employee = localStorage.getItem("employee");
    employee = JSON.parse(employee);
   
  //adding data to the grid-container

  for(let i=0;i<No_of_grid;i++){
      $('#grid-content' + i).html('<p> Name : <span>' + employee[i].Name + '</span></p>');
      $('#grid-content' + i).append('<p>ID : <span>' + employee[i].Id+ '</span></p>');
      $('#grid-content' + i).append('<p> Skills : <span>' + employee[i].Skills+ '</span></p>');
      $('#grid-content' + i).append('<p> Project : <span>' + employee[i].Project+ '</span></p>');
      $('#grid-content' + i).append('<p> HCM : <span>' + employee[i].Hcm+ '</span></p>');
      }

//adding data to the list-container

  var No_of_list = document.getElementsByClassName('list-content').length - 1;
  for(let i=0;i<No_of_list;i++){
      $('#list-table-data' + i).html("");
      $('#list-table-data' + i).append('<td> ' + employee[i].Name + '</td>');
      $('#list-table-data' + i).append('<td> ' + employee[i].Id + '</td>');
      $('#list-table-data' + i).append('<td> ' + employee[i].Skills + '</td>');
      $('#list-table-data' + i).append('<td> ' + employee[i].Project + '</td>');
      $('#list-table-data' + i).append('<td> ' + employee[i].Hcm + '</td>');
      $('#list-table-data' + i).append('<td> <div class="list-cross-icon"> <button class="btn sub-list-edit-icon" id="list-edit-id'+ i+'" onclick="listEditIcon(this.id)"><i class="fas fa-edit fa-2x"></i></button> <button class="btn sub-list-cross-icon" id="list-delete-id'+ i+'" onclick="listClose(this.id)">&times;</button> </div></td>');
      }
  });
  }

//Toggle between grid-container hide and show

function gridView() {
  var element1 = document.getElementById("grid-container");
  if(element1.style.display === 'grid'){
      element1.style.display = 'none';
  }else{
      element1.style.display = 'grid';
  }
}

//Toggle between list-container hide and show

 function listView() {
    var element = document.getElementById("list-container");
    element.classList.toggle("mystyle");
 }

//To close the selected gridcard

function gridClose(){
    var closebtns = document.getElementsByClassName("grid-cross-icon");
    var i;
    for (i = 0; i < closebtns.length; i++) {
      closebtns[i].addEventListener("click", function() {
        this.parentElement.style.display = 'none';
      });
    }
} 

//call grid edit save operations

function gridEditSave(x) {
  var current_field = document.getElementById(x.id).parentElement.previousElementSibling.previousElementSibling.id;
  if (x.innerHTML === "Edit") {
    x.innerHTML = "Save"; 
    gridEdit(current_field);
  } else {
    x.innerHTML = "Edit";
    saveGriddetails(current_field);
  }
}

//Fetch the grid to be edited

function gridEdit(current_field){
  var table = document.getElementById(current_field);
  var cells = table.getElementsByTagName('span');
  Edit(cells,cells.length);
}

//Perform EDIT operation for the selected grid or list

function Edit(cells,length){
  for(var i=0;i<length;i++){
    cells[i].onclick = function(){
      if(this.hasAttribute('data-clicked')){
        return;
      }
      this.setAttribute('data-clicked','yes');
      this.setAttribute('data-text',this.innerHTML);

      var input =  document.createElement('input');
      input.setAttribute('type','text');
      input.value= this.innerHTML;
      input.style.width = '150px';
      input.style.height = '18px';

      input.onblur = function(){
          var td = input.parentElement;
          var curr_text = this.value;

          td.removeAttribute('data-clicked');
          td.removeAttribute('data-text');
          td.innerHTML = curr_text;
      }

      this.innerHTML = '';
      this.append(input);
      this.firstElementChild.select();
    }
  }
}

//Save the griddetails after performing edit operation

function saveGriddetails(current_field){
  var curtable = document.getElementById(current_field);
  var cur_cell_data = curtable.getElementsByTagName('span');
  var find_which_data = current_field[current_field.length - 1];
  for(var i=0;i<cur_cell_data.length;i++){
    employee[find_which_data][employee_key[i]] = cur_cell_data[i].innerHTML;
  }
  onPageLoad();
}

//Switch between edit and save icon in list view

var flag = 0;
function listEditIcon(id_name) {
  var nameof_list=document.getElementById(id_name);
  var make_edit=nameof_list.parentElement.parentElement.parentElement.parentElement.parentElement;
  listEdit(make_edit.id);
  if(flag == 0){
    nameof_list.innerHTML='<i class="fas fa-save fa-2x"></i>';
    flag=1;
  }
   else if(flag == 1){
    nameof_list.innerHTML='<i class="fas fa-edit fa-2x"></i>';
    savelistdetails(make_edit.id);
    flag = 0;
  } 
}

//Fetch the particular list to be edited

function listEdit(current_field_list){
  var table = document.getElementById(current_field_list);
  var cells = table.getElementsByTagName('td');
  Edit(cells,cells.length-1);
}

//Save the listdetails after performing edit operation

function savelistdetails(current_field_list){
  var li_table = document.getElementById(current_field_list);
  var li_cell_table = li_table.getElementsByTagName('td');
  var find_which_data_ = current_field_list[current_field_list.length - 1];
  for(var i=0;i<li_cell_table.length - 1; i++){
    employee[find_which_data_ - 1][employee_key[i]] = li_cell_table[i].innerHTML ;
  }
  onPageLoad();
}

//Close the selected list 

function listClose(del_id_name){
  var nameof_del_list=document.getElementById(del_id_name);
  var make_del=nameof_del_list.parentElement.parentElement.parentElement.parentElement.parentElement;
  var close_data = make_del.classList;
  var closebtn = document.getElementsByClassName(close_data[0]);
  for (i = 0; i < closebtn.length; i++) {
    closebtn[i].addEventListener("click", function() {
      this.parentElement.style.display = 'none';
    });
  }  
} 