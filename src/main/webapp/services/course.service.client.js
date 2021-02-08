// The course service implements all data acces.
function CourseServiceClient() {
    /*
    bind instances to below functions.
    this is going to allow us to call these functions with the instance when instantiated
    */
    this.createCourse = createCourse;
    this.findAllCourses = findAllCourses;
    this.findCourseById = findCourseById;
    this.deleteCourse = deleteCourse;
    this.updateCourse = updateCourse;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/001034982/courses';
    var self = this;


    function createCourse(course) {
        return fetch(self.url, {
            method: 'POST',
            // the user parameter is represented in binary format in the ram/memory of cpu. Needs to be converted to
            // a format that can be streamed across the http request, so we need to convert it into string that can be
            // streamed bits by bits
            body: JSON.stringify(course),
            // below is to tell the server what I am sending
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (response) {
            return response.json()
        })
    }



    function findAllCourses() {
        return fetch(self.url).then(function (response) {
            return response.json()
        })
    }


    function findCourseById(courseId) {

    }


    // techincally we dont need really care about the response, there is no data
    // really what comes back is some status information
    function updateCourse(courseId, course) {
        return fetch(`${self.url}/${courseId}`, {
            method: 'PUT',
            body: JSON.stringify(course),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())      // this is the es6 arrow function that is same as
                                                  // above .then(function(response) that returns response.json())
    }


    // techincally we dont need really care about the response, there is no data
    // really what comes back is some status information
    function deleteCourse(courseId) {
        return fetch(`${self.url}/${courseId}`, {method: "DELETE"})
            .then(function (response) {
                return response.json()
            })
    }

}