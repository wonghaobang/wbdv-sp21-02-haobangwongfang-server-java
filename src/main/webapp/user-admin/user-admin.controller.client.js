(function () {
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
    var $clearBtn

    // this is going to be treated like constructor in es5
    var userService = new AdminUserServiceClient();

    $(main);

    function main() {
        $tableRows = $('.wbdv-tbody')
        $createBtn = $(".wbdv-create")
        $updateBtn = $(".wbdv-update")
        $clearBtn = $(".btn")
        $usernameFld = $(".wbdv-usernameFld")
        $passwordFld = $(".wbdv-passwordFld")
        $firstNameFld = $(".wbdv-firstNameFld")
        $lastNameFld = $(".wbdv-lastNameFld")
        $roleFld = $(".wbdv-roleFld")

        $clearBtn.click(clearInput)
        $updateBtn.click(updateUser)
        $createBtn.click(createUser)
        // assign local variable
        userService.findAllUsers().then(function (actualUsers) {
            users = actualUsers
            renderUsers(users)
        })
    }


    function clearInput() {
        $usernameFld.val("");
        $passwordFld.val("");
        $firstNameFld.val("");
        $lastNameFld.val("");
        $roleFld.val("FACULTY")
        selectedUser = null
    }


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
                clearInput()
            })
    }


    // Alternate way of implementing deleteUser if I use index{i} instead of object id{course._id} in renderUser
    // function deleteUser(event) {
    //     var removeIcon = $(event.target)
    //     // this index is different to the below id, this attr("id") is the id of a html tag I gave in line 124
    //     var index = removeIcon.attr("id")
    //     // this below _id is the actual id of the object
    //     var id = users[index]._id
    //     userService.deleteUser(id)
    //         .then(function (status) {    // I am receiving the status, but I don't really need to use it
    //             users.splice(index, 1)
    //             renderUsers(users)
    //         })
    // }


    function deleteUser(event) {
        var id = $(event.target).attr("id")
        userService.deleteUser(id)
            .then(function (status) {
                var index = users.findIndex(user => user._id === id)
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
                clearInput()
            })
    }



    function renderUsers(users) {
        $tableRows.empty()
        for (var i = 0; i < users.length; i++) {
            var user = users[i]
            $tableRows.append(`
          <tr>
              <td>${user.username}</td>
<!--              <td>${user.password}</td>-->
              <td></td>
              <td>${user.firstname}</td>
              <td>${user.lastname}</td>
              <td>${user.role}</td>
              <td>
                  <span class="float-right">
<!--                      <i id="${i}" class="fa-2x fa fa-times wbdv-remove"></i>-->
                      <i id="${user._id}" class="fa-2x fa fa-times wbdv-remove"></i>
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


})();
