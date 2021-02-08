// The user admin service implements all data acces.
function AdminUserServiceClient() {
    /*
    bind instances to below functions.
    this is going to allow us to call these functions with the instance when instantiated
    */
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/001034982/users';
    var self = this;

    // fetch returns a promise
    function createUser(user) {
        return fetch(self.url, {
            method: 'POST',
            // the user parameter is represented in binary format in the ram/memory of cpu. Needs to be converted to
            // a format that can be streamed across the http request, so we need to convert it into string that can be
            // streamed bits by bits
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (response) {
            return response.json()
        })
    }


    function findAllUsers() {
        return fetch(self.url).then(function (response) {
            return response.json()
        })
    }


    function findUserById(userId) {

    }


    function updateUser(userId, user) {
        return fetch(`${self.url}/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
    }


    // techincally we dont need really care about the response, there is no data
    // really what comes back is some status information
    function deleteUser(userId) {
        return fetch(`${self.url}/${userId}`, {method: 'DELETE'})
            .then(function (response) {
                return response.json()
            })
    }


}