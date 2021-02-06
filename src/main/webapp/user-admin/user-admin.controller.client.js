var $usernameFld
var $passwordFld
var $firstNameFld
var $lastNameFld
var $roleFld
var $removeBtn
var $editBtn
var $updateBtn
var $createBtn
var $tableRows

// this is going to be treated like constructor in es5
var userService = new AdminUserServiceClient();



// var users = [
//     {username: 'alice', password: '123456', firstname: 'Alice', lastname: 'Lovelace', role: 'Faculty'},
//     {username: 'bob', password: '123456', firstname: 'Bob', lastname: 'Lee', role: 'Student'},
//     {username: 'charlie', password: '123456', firstname: 'Charlie', lastname: 'Jones', role: 'Admin'},
//     {username: 'dan', password: '123456', firstname: 'Dan', lastname: 'Gil', role: 'Faculty'},
// ]


function createUser() {

    var newUser = {
        username: $usernameFld.val(),
        password: $passwordFld.val(),
        firstname: $firstNameFld.val(),
        lastname: $lastNameFld.val(),
        role: $roleFld.val()
    }

    userService.createUser(newUser)
        .then(function (actualUser) {
            users.push(actualUser)
            renderUsers(users)
        })
}


function deleteUser(event) {
    var removeIcon = $(event.target)
    // this index is different to the below id, this attr("id") is the id of a html tag I gave in line 69
    var index = removeIcon.attr("id")
    // this below _id is the actual id of the object
    var id = users[index]._id
    userService.deleteUser(id)
        .then(function (status) {
            users.splice(index, 1)
            renderUsers(users)
        })
}


var selectedUser = null
function selectUser(event) {
    var id = $(event.target).attr("id")
    selectedUser = users.find(user => user._id === id)
    $usernameFld.val(selectedUser.username)
    $passwordFld.val(selectedUser.password)
    $firstNameFld.val(selectedUser.firstname)
    $lastNameFld.val(selectedUser.lastname)
    $roleFld.val(selectedUser.role)
}


function updateUser() {
    selectedUser.username = $usernameFld.val()
    selectedUser.password = $passwordFld.val()
    selectedUser.firstname = $firstNameFld.val()
    selectedUser.lastname = $lastNameFld.val()
    selectedUser.role = $roleFld.val()

    userService.updateUser(selectedUser._id, selectedUser)
        .then(status => {
            var index = users.findIndex(user => user._id === selectedUser._id)
            users[index] = selectedUser
            renderUsers(users)
        })
}


function renderUsers(users) {
    $tableRows.empty()
    for (var i = 0; i < users.length; i++) {
        var user = users[i]
        $tableRows.append(`
      <tr>
          <td>${user.username}</td>
<!--          <td>${user.password}</td>-->
          <td></td>
          <td>${user.firstname}</td>
          <td>${user.lastname}</td>
          <td>${user.role}</td>
          <td>
              <span class="float-right">
                  <i id="${i}" class="fa-2x fa fa-times wbdv-remove"></i>
<!--                  below using user_id because now we have object id?-->
                  <i id="${user._id}" class="fa-2x fa fa-pencil wbdv-edit"></i>
                </span>
          </td>
      </tr>
      `)
    }
    $(".wbdv-remove").click(deleteUser)
    $(".wbdv-edit").click(selectUser)
}


function findUserById() {
 // optional - might not need this
}


function main() {
    $tableRows = $('.wbdv-tbody')
    $createBtn = $(".wbdv-create")
    $updateBtn = $(".wbdv-update")

    $usernameFld = $(".wbdv-usernameFld")
    $passwordFld = $(".wbdv-passwordFld")
    $firstNameFld = $(".wbdv-firstNameFld")
    $lastNameFld = $(".wbdv-lastNameFld")
    $roleFld = $(".wbdv-roleFld")

    $updateBtn.click(updateUser)
    $createBtn.click(createUser)
    userService.findAllUsers().then(function (actualUsers) {
        users = actualUsers
        renderUsers(users)
    })

}
$(main);
